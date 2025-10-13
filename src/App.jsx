import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import { AuthProvider } from "./context/AuthContext";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "./stores/slices/appSlice.js";
import { ensureMsalInitialized } from "./stores/msalInstance.js";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        ensureMsalInitialized().then(() => {
            dispatch(restoreSession());
        });
    }, [dispatch]);

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
