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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import api from "@/api.ts";
import { toast } from "@/hooks/use-toast.ts";
import { useNavigate } from "react-router-dom";

function NewProject() {
    const navigator = useNavigate();
    const formSchema = z.object({
        name: z
            .string()
            .max(30, "Project name cannot exceed 30 characters")
            .min(1, "Project name can not be empty"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        api.post("/projects", { name: values.name })
            .then((res) => {
                navigator(`/projects/${res.data.id}`);
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Error while creating project",
                    description: err?.message,
                });
            });
    };

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Label htmlFor="name">
                                                Project Name
                                            </Label>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="mt-2"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Create project</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default NewProject;
