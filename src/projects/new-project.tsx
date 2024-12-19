import { Button } from "@/components/ui/button.tsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function NewProject() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create a new project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a new project</DialogTitle>
                    <DialogDescription>
                        Creat a new project here. Fill in a name and click
                        create to get started.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="">
                        <Label htmlFor="name">Project Name</Label>
                        <Input id="name" className="mt-2" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create project</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default NewProject;
