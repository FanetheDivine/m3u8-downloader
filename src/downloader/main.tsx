import ReactDOM from "react-dom/client";
import DownloaderComponent from "./DownloaderComponent";

setTimeout(() => {
  const container = document.createElement("div");
  const html = document.querySelector("html")!;
  html.append(container);
  ReactDOM.createRoot(container).render(<DownloaderComponent />);
}, 2000);
