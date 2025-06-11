import { saveAs } from "file-saver";

export async function downloadM3U8(props: { url: string }) {
  const { url } = props;
  debugger
  const urls = await getM3U8PieceURLs(url);
  debugger
  const data = await getBlobPieces(urls)
  saveAs(data, `video.ts`);
}

const getM3U8PieceURLs = async (url: string) => {
  const mapString = await fetch(url).then((res) => res.text());
  debugger
  const files = mapString
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => !s.startsWith("#"))
    .filter(Boolean);
  const baseUrl = url.split("/").slice(0, -1).join("/") + "/";
  return files.map((f) => baseUrl + f);
};

const getBlobPieces = async (urls: string[]) => {
  const chunk = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.blob()))
  );
  const data = new Blob(chunk)
  return data
}
