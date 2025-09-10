import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";

function App() {
  return (
    <RecoilRoot>
      <div className="app-wrapper">
        <BrowserRouter>
          <Router />
          <ScrollToTop />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}



export default App;
