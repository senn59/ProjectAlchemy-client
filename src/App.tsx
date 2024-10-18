import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {ENDPOINTS} from "@/endpoints.ts";
import {ThemeProvider} from "@/components/shadcn/theme-provider.tsx";
import {DataTable} from "@/issues/data-table.tsx";
import {columns} from "@/issues/columns.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {IssuePreview} from "@/issues/types.ts";

function App() {
    const [issues, setIssues] = useState<IssuePreview[]>([]);
    useEffect(() => { axios.get<IssuePreview[]>(ENDPOINTS.ISSUES)
            .then(res => setIssues(res.data))
    }, [])
    return (
        <>
            <ThemeProvider defaultTheme={"light"}>
                <Toaster />
                <DataTable columns={columns} data={issues} />
            </ThemeProvider>
        </>
    )
}

export default App
