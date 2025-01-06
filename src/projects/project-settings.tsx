import { Button } from "@/components/ui/button.tsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "@/projects/project-provider.tsx";
import { InvitationSentView, memberType } from "@/projects/types.ts";
import api from "@/api.ts";
import { ENDPOINTS } from "@/endpoints.ts";
import { toast } from "@/hooks/use-toast.ts";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/auth/authprovider.tsx";
import { useNavigate } from "react-router-dom";

export function ProjectSettings() {
    const [invitations, setInvitations] = useState<InvitationSentView[]>([]);
    const { user } = useAuth();
    const { project } = useContext(ProjectContext);
    const navigator = useNavigate();

    useEffect(() => {
        if (
            project.members.find((m) => m.userId == user?.id)?.type !=
            memberType.Owner
        ) {
            navigator("/projects/" + project.id);
        }
    }, []);

    const formSchema = z.object({
        email: z.string().email(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        api.post(ENDPOINTS.PROJECT_INVITATIONS(project.id), {
            email: values.email,
        })
            .then((r) => {
                toast({
                    title: "Success",
                    description: `Invite sent to ${values.email}`,
                });
                setInvitations((prev) => [...prev, r.data]);
            })
            .catch((e) => {
                console.log(e);
                let description = e.message;
                if (e.status == 422) {
                    description = "Invitation for that email already exists";
                }
                toast({
                    variant: "destructive",
                    title: "Error sending invitation",
                    description: description,
                });
            });
    };

    const deleteInvitation = (id: string) => {
        api.delete(ENDPOINTS.PROJECT_INVITATIONS(project.id) + `/${id}`)
            .then(() => {
                toast({
                    title: "Success",
                    description: "Deleted invitation",
                });
                setInvitations((prev) =>
                    prev.filter((i) => i.invitationId !== id),
                );
            })
            .catch((e) => {
                toast({
                    variant: "destructive",
                    title: "Error while trying to delete invitation",
                    description: e.message,
                });
            });
    };

    useEffect(() => {
        api.get(ENDPOINTS.PROJECT_INVITATIONS(project.id))
            .then((r) => {
                setInvitations(r.data);
                console.log(r.data);
            })
            .catch((e) =>
                toast({
                    variant: "destructive",
                    title: `Error fetching invitations`,
                    description: e.message,
                }),
            );
    }, []);

    return (
        <div className="flex justify-center w-full">
            <div className="w-2/3 my-16">
                <div className="text-sm text-muted-foreground">
                    Project: {project.name}
                </div>
                <h1 className="text-2xl font-extrabold mt-4">
                    Project Settings
                </h1>
                <p>Configure project settings here</p>
                <div className="mt-10">
                    <div>
                        <div className="mb-4 text-lg font-bold">
                            Members ({project.members.length})
                        </div>
                        <Table className="m-0 p-0">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {project.members.map((member) => (
                                    <TableRow key={member.userId}>
                                        <TableCell>{member.userId}</TableCell>
                                        <TableCell>{member.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <div className="mt-10 text-lg font-bold">
                            Add a new member
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="py-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <Label htmlFor="name">
                                                        Email Address
                                                    </Label>
                                                </FormLabel>
                                                <div className="flex items-end">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="mr-4"
                                                        />
                                                    </FormControl>
                                                    <Button type="submit">
                                                        Send invite
                                                    </Button>
                                                </div>
                                                <FormMessage className="absolute" />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div className="mb-4 mt-10 text-lg font-bold">
                        Outgoing Invites ({invitations.length})
                    </div>
                    <Table className="m-0 p-0">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invitations.length < 1 ? (
                                <TableCaption className="w-full">
                                    No outgoing invitations
                                </TableCaption>
                            ) : (
                                invitations.map((i) => (
                                    <TableRow key={i.invitationId}>
                                        <TableCell>{i.email}</TableCell>
                                        <TableCell>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you absolutely
                                                            sure?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot
                                                            be undone. This will
                                                            revoke the invite
                                                            sent to {i.email}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                deleteInvitation(
                                                                    i.invitationId,
                                                                );
                                                            }}
                                                        >
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
