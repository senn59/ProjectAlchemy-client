import {Issue} from "@/components/issues/issue.tsx";
import {IIssue} from "@/App.tsx";
import {
    Table,
    TableBody,
    TableHead,
    TableCaption,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type IssueListProps = {
    issues: IIssue[]
}

export function IssueList(props: IssueListProps) {
    return(
        <>
            <Table>
                <TableCaption>A list of issues</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.issues.map((issue, i) => {
                        return(
                            <TableRow>
                                <Issue name={issue.name} description={issue.description} key={i} />
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </>
    )
}
