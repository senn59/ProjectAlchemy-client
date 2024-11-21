import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@/components/shadcn/theme-provider.tsx";
import Board from "@/routes/board";
import Layout from "@/routes/layout";
import Login from "@/routes/login";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/board",
                    element: <Board />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
            ],
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
