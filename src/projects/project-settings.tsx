import { LucideSettings } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function ProjectSettings() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <LucideSettings size={20} />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Project Settings</DialogTitle>
                        <DialogDescription>
                            Configure project settings here
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <div>Members</div>
                        <div>Add a new member</div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
