import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@/components/shadcn/theme-provider.tsx";
import Board from "@/routes/board";
import Layout from "@/routes/layout";
import Signin from "@/routes/signin";
import Index from "./routes";
import Protected from "@/routes/protected.tsx";

function App() {
    return (
        <>
            <ThemeProvider defaultTheme={"dark"}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="auth">
                            <Route path="signin" element={<Signin />} />
                        </Route>
                        <Route element={<Protected />}>
                            <Route element={<Layout />}>
                                <Route path="board" element={<Board />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
