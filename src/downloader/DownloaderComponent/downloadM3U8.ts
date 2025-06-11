import { saveAs } from "file-saver";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export async function downloadM3U8(props: { name: string; url: string }) {
  const { name, url } = props;
  const urls = await getM3U8PieceURLs(url);
  const data = await getUnit8ArrayPieces(urls)
  const video: Blob = await convertData(data);
  saveAs(video, `${name}.mp4`);
}

const getM3U8PieceURLs = async (url: string) => {
  const mapString = await fetch(url).then((res) => res.text());
  const files = mapString
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => !s.startsWith("#"))
    .filter(Boolean);
  const baseUrl = url.split("/").slice(0, -1).join("/") + "/";
  return files.map((f) => baseUrl + f);
};

const getUnit8ArrayPieces = async (urls: string[]) => {
  const chunk = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.blob()))
  );
  const blob = new Blob(chunk)
  const data = new Uint8Array(await blob.arrayBuffer())
  return data
}

const ffmpeg = new FFmpeg();
const loadFFmpeg = async () => {
  ffmpeg.load({
    coreURL: "./ffmpeg/ffmpeg-core.js",
    wasmURL: "./ffmpeg/ffmpeg-core.wasm",
    workerURL: await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd/ffmpeg-core.worker.js', 'text/javascript')
  })
}
loadFFmpeg()

const convertData = async function (data: Uint8Array): Promise<Blob> {
  if (!ffmpeg.loaded) {
    return new Promise<Blob>((resolve) =>
      setTimeout(async () => {
        const res = await convertData(data)
        resolve(res)
      }, 1000)
    );
  }
  await ffmpeg.writeFile('input.ts', data);
  await ffmpeg.exec(['-i', 'input.ts', '-c', 'copy', 'output.mp4']);
  const output = await ffmpeg.readFile('output.mp4') as Uint8Array;
  return new Blob([output.buffer as any], { type: 'video/mp4' })
};
