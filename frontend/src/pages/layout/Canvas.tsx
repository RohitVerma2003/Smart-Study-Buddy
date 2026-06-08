import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

const Canvas = () => {
    return (
        <div className="h-[calc(100vh-4rem)]">
            <Excalidraw />
        </div>
    )
}

export default Canvas