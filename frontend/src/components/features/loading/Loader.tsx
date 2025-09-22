import { Zoomies } from "ldrs/react";
import "ldrs/react/Zoomies.css";

function Loader() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/60 z-[9999]">
      <Zoomies size="80" stroke="5" bgOpacity="0.1" speed="1.4" color="white" />
    </div>
  );
}

export default Loader;
