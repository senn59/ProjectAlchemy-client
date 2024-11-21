import { useEffect } from "react";
import { ThemeProvider } from "@/components/shadcn/theme-provider.tsx";
import { DataTable } from "@/issues/data-table.tsx";
import { columns } from "@/issues/columns.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useIssueListStore } from "@/issues/store.ts";

function Board() {
    const fetch = useIssueListStore((s) => s.fetchData);
    const issues = useIssueListStore((s) => s.issues);

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            <Toaster />
            <div className="flex justify-center items-center h-screen">
                <DataTable
                    // key={JSON.stringify(issues)}
                    columns={columns}
                    data={issues}
                />
            </div>
        </>
    );
}

export default Board;
