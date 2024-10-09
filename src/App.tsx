import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {ENDPOINTS} from "@/endpoints.ts";
import {ThemeProvider} from "@/components/shadcn/theme-provider.tsx";
import {DataTable} from "@/issues/data-table.tsx";
import {columns} from "@/issues/columns.tsx";

export interface IIssuePreview {
    id: number
    name: string
    type: string //TODO: make enum for type
}
export interface IIssue extends IIssuePreview{
    description: string
}

function App() {
    const [issues, setIssues] = useState<IIssuePreview[]>([]);
    useEffect(() => {
        axios.get<IIssuePreview[]>(ENDPOINTS.ISSUES)
            .then(res => setIssues(res.data))
    })
    return (
        <>
            <ThemeProvider defaultTheme={"dark"}>
                <DataTable columns={columns} data={issues} />
            </ThemeProvider>
        </>
    )
}

export default App
