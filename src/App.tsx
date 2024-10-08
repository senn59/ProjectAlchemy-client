import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {IssueList} from "@/components/issues/IssueList.tsx";
import {ENDPOINTS} from "@/endpoints.ts";
import {ThemeProvider} from "@/components/shadcn/theme-provider.tsx";

export interface IIssue {
    name: string
    description?: string
}

function App() {
    const [issues, setIssues] = useState<IIssue[]>([]);
    useEffect(() => {
        axios.get<IIssue[]>(ENDPOINTS.ISSUES)
            .then(res => setIssues(res.data))
    })
    return (
        <>
            <ThemeProvider defaultTheme={"dark"}>
                <div className={"issues-container"}>
                    <IssueList issues={issues}/>
                </div>
            </ThemeProvider>
        </>
    )
}

export default App
