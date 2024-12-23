import { useEffect } from "react";
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
        <div className="flex-grow flex items-center justify-center">
            <Toaster />
            <DataTable
                // key={JSON.stringify(issues)}
                columns={columns}
                data={issues}
            />
        </div>
    );
}

export default Board;
