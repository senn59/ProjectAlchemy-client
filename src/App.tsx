import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@/components/shadcn/theme-provider.tsx";
import Board from "./routes/board";
import Root from "./routes/root";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
        },
        {
            path: "/board",
            element: <Board />,
        },
    ]);
    return (
        <>
            <ThemeProvider defaultTheme={"dark"}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    );
}

export default App;
