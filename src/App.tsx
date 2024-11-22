import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@/components/shadcn/theme-provider.tsx";
import Board from "@/routes/board";
import Layout from "@/routes/layout";
import Login from "@/routes/login";
import Index from "./routes";

function App() {
    return (
        <>
            <ThemeProvider defaultTheme={"dark"}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="auth">
                            <Route path="login" element={<Login />} />
                        </Route>
                        <Route element={<Layout />}>
                            <Route path="board" element={<Board />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
