import { Checkbox } from "@/components/ui/checkbox";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { ProjectContext } from "@/projects/project-provider";
import { ReactNode, useContext, useState } from "react";
import { IssueType, PartialIssue } from "./types";
import {
    LucideBug,
    LucideClipboardCheck,
    LucideScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function IssueLinking() {
    const { project, issueToLink, setIssueToLink } = useContext(ProjectContext);
    const [selectedIssues, setSelectedIssues] = useState<PartialIssue[]>([]);

    const handleSelect = (i: PartialIssue) => {
        if (selectedIssues.includes(i)) {
            setSelectedIssues((prev) => prev.filter((issue) => issue != i));
        } else {
            setSelectedIssues((prev) => [...prev, i]);
        }
    };

    const getIcon = (type: IssueType): ReactNode => {
        const size = "20";
        switch (type) {
            case IssueType.Task:
                return <LucideClipboardCheck size={size} />;
            case IssueType.UserStory:
                return <LucideScrollText size={size} />;
            case IssueType.Bug:
                return <LucideBug size={size} />;
        }
    };

    const handleLink = () => {
        setIssueToLink(null);
    };

    return (
        issueToLink && (
            <CommandDialog
                open={issueToLink != null}
                onOpenChange={() => setIssueToLink(null)}
            >
                <div className="px-4 pt-2">
                    <span className="text-muted-foreground font-bold">
                        Linking to:{" "}
                    </span>
                    {issueToLink?.name}
                </div>
                <CommandInput placeholder="Search for an issue..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Issues">
                        {project.issues.map((i) => (
                            <CommandItem
                                onSelect={() => handleSelect(i)}
                                className="flex justify-between hover:cursor-pointer"
                                onClick={() => handleSelect(i)}
                                key={i.key}
                            >
                                <div className="flex items-center">
                                    <Checkbox
                                        checked={selectedIssues.includes(i)}
                                    />
                                    <div className="ml-4 font-bold">
                                        {i.key}
                                    </div>
                                    <div className="ml-1"> {i.name}</div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2">{i.type}</div>
                                    <div>{getIcon(i.type)}</div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <div className="pt-2 pb-6 px-4 flex justify-between">
                        <div className="flex">
                            <div>
                                <span className="font-bold text-muted-foreground">
                                    Issues to link:
                                </span>
                            </div>
                            <div className="ml-1">
                                {selectedIssues
                                    .sort((a, b) => a.key - b.key)
                                    .map((issue, index) => (
                                        <>
                                            {issue.key}
                                            {index <
                                                selectedIssues.length - 1 &&
                                                ", "}
                                        </>
                                    ))}
                            </div>
                        </div>
                        <Button
                            size="sm"
                            disabled={selectedIssues.length < 1}
                            onClick={() => handleLink()}
                        >
                            Link issues
                        </Button>
                    </div>
                </CommandList>
            </CommandDialog>
        )
    );
}
