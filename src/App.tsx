import "./App.css";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/shadcn/theme-provider.tsx";
import { DataTable } from "@/issues/data-table.tsx";
import { columns } from "@/issues/columns.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useIssueListStore } from "@/issues/store.ts";

function App() {
	const fetch = useIssueListStore((s) => s.fetchData);
	const issues = useIssueListStore((s) => s.issues);

	useEffect(() => {
		fetch();
	}, []);

	return (
		<>
			<ThemeProvider defaultTheme={"dark"}>
				<Toaster />
				<DataTable
					// key={JSON.stringify(issues)}
					columns={columns}
					data={issues}
				/>
			</ThemeProvider>
		</>
	);
}

export default App;
