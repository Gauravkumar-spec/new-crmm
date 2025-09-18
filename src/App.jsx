import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <RecoilRoot>
            <div className="app-wrapper">
                <AuthProvider>
                    <BrowserRouter>
                        <Router />
                        <ScrollToTop />
                    </BrowserRouter>
                </AuthProvider>
            </div>
        </RecoilRoot>
    );
}

export default App;
