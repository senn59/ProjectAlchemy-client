import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/shadcn/theme-provider.tsx";
import { DataTable } from "@/issues/data-table.tsx";
import { columns } from "@/issues/columns.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useIssueListStore } from "@/issues/store.ts";

function App() {
	const fetch = useIssueListStore((state) => state.fetchData);
	const issues = useIssueListStore((state) => state.issues);
	useEffect(() => {
		fetch();
	}, []);

	return (
		<>
			<ThemeProvider defaultTheme={"dark"}>
				<Toaster />
				<DataTable columns={columns} data={issues} />
			</ThemeProvider>
		</>
	);
}

export default App;
