import ReactDOM from "react-dom/client";
import DownloaderComponent from "./DownloaderComponent";
import "./index.css";

const container = document.createElement("div");
const body = document.querySelector("body")!;
body.append(container);

ReactDOM.createRoot(container).render(<DownloaderComponent />);
