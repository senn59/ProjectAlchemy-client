import { Member } from "@/projects/types.ts";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface MembersPopoverProps {
    members: Member[];
}

export function MembersPopover({ members }: MembersPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Members ({members.length})</Button>
            </PopoverTrigger>
            <PopoverContent className="w-max text-sm">
                {members.map((member) => (
                    <div className="flex justify-between" key={member.userId}>
                        <div>{member.userName}</div>
                        <div className="pl-6">{member.type}</div>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
}
