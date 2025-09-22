import { BrowserRouter } from "react-router-dom";
import Routers from "./router/Routers";
import Loader from "./components/features/loading/Loader";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

function App() {
  const loadingStatus = useSelector((state: RootState) => state.loader.status);

  return (
    <BrowserRouter>
      {loadingStatus && <Loader />}
      <Routers />
    </BrowserRouter>
  );
}

export default App;
