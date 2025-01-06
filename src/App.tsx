import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@/components/shadcn/theme-provider.tsx";
import Layout from "@/routes/layout";
import Signin from "@/routes/signin";
import Index from "./routes";
import Protected from "@/routes/protected.tsx";
import Signup from "@/routes/signup.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import Projects from "@/routes/projects.tsx";
import Project from "@/routes/project.tsx";
import { ProjectSettings } from "@/projects/project-settings.tsx";
import { ProjectProvider } from "@/projects/project-provider.tsx";

function App() {
    return (
        <>
            <ThemeProvider defaultTheme={"dark"}>
                <Toaster />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="auth">
                            <Route path="signin" element={<Signin />} />
                            <Route path="signup" element={<Signup />} />
                        </Route>
                        <Route element={<Protected />}>
                            <Route element={<Layout />}>
                                <Route path="projects" element={<Projects />} />
                                <Route
                                    path="projects/:id"
                                    element={<ProjectProvider />}
                                >
                                    <Route index element={<Project />} />
                                    <Route
                                        path="settings"
                                        element={<ProjectSettings />}
                                    />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
