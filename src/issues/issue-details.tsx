import { Issue } from "@/issues/types.ts";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { ENDPOINTS } from "@/endpoints";
import axios from "axios";

interface IssueTypeSelectProps {
	issue: Issue;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}

interface EditableFields {
	name: string;
	description: string;
}

export default function IssueDetails(props: IssueTypeSelectProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [editableFields, setEditableFields] = useState<EditableFields>({
		name: props.issue.name,
		description: props.issue.description,
	});
	const [isEditing, setEditing] = useState<Record<string, boolean>>({
		name: false,
		description: false,
	});

	useEffect(() => {
		if (isEditing["description"] && textareaRef.current) {
			const length = textareaRef.current.value.length;
			textareaRef.current.setSelectionRange(length, length);
		}
	}, [isEditing]);

	const handleEditing = (field: string) => {
		setEditing({ ...isEditing, [field]: true });
	};

	const handleSave = (field: string) => {
		setEditing({ ...isEditing, [field]: false });
		const issueField = field as keyof EditableFields;
		const request = [
			{
				op: "replace",
				path: `/${issueField}`,
				value: editableFields[issueField],
			},
		];
		console.log(request);
		axios.patch(`${ENDPOINTS.ISSUES}/${props.issue.id}`, request);
	};

	const handleKeyPress = (event: KeyboardEvent, field: string) => {
		if (event.key === "Enter" && !event.shiftKey) {
			handleSave(field);
		}
	};

	return (
		<Sheet open={props.isOpen} onOpenChange={props.onOpenChange}>
			{props.issue !== null && (
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Issue {props.issue.id}</SheetTitle>
					</SheetHeader>
					<div className={"mt-10"}>
						<div className={"sheet-field-cnt"}>
							<Label className={"pl-1"}>Name</Label>
							{isEditing["name"] ? (
								<Input
									value={editableFields.name}
									onBlur={() => handleSave("name")}
									onKeyDown={(e) => handleKeyPress(e, "name")}
									onChange={(e) =>
										setEditableFields({
											...editableFields,
											name: e.target.value,
										})
									}
									autoFocus
								/>
							) : (
								<Button
									variant={"ghost"}
									className={"justify-start text-lg p-2"}
									onClick={() => handleEditing("name")}
								>
									{editableFields.name}
								</Button>
							)}
						</div>
						<div className={"sheet-field-cnt mt-10"}>
							<Label className={"pl-1"}>Description</Label>
							{isEditing["description"] ? (
								<Textarea
									ref={textareaRef}
									value={editableFields.description}
									onBlur={() => handleSave("description")}
									onKeyDown={(e) =>
										handleKeyPress(e, "description")
									}
									onChange={(e) =>
										setEditableFields({
											...editableFields,
											description: e.target.value,
										})
									}
									autoFocus
								/>
							) : (
								<Button
									variant={"ghost"}
									className={`justify-start p-2`}
									onClick={() => handleEditing("description")}
								>
									<p
										className={
											props.issue.description
												? ""
												: "opacity-50"
										}
									>
										{editableFields.description
											? editableFields.description
											: "Add description..."}
									</p>
								</Button>
							)}
						</div>
						<div className={"sheet-field-cnt mt-10"}>
							<Label className={"pl-1"}>Type</Label>
							<IssueTypeSelect
								currentType={props.issue.type}
								issueId={props.issue.id}
								silent={true}
							/>
						</div>
					</div>
				</SheetContent>
			)}
		</Sheet>
	);
}
