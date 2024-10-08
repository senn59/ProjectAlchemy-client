import {IIssue} from "@/App.tsx";

import {
    TableCell
} from "@/components/ui/table"

export function Issue(props: IIssue) {
    return(
        <>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.description}</TableCell>
        </>
    )
}