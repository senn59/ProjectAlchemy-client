import { Button } from "@/components/ui/button.tsx";
import {
    Table,
    TableBody,
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

export function ProjectSettings() {
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
        console.log(values.email);
    };

    return (
        <div className="flex justify-center w-full">
            <div className="w-2/3 mt-16">
                <div className="text-sm text-muted-foreground">ProjectName</div>
                <h1 className="text-2xl font-extrabold mt-4">
                    Project Settings
                </h1>
                <p>Configure project settings here</p>
                <div className="mt-10">
                    <div>
                        <div className="mb-4 text-lg font-bold">
                            Members (1)
                        </div>
                        <Table className="m-0 p-0">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>testuser</TableCell>
                                    <TableCell>Owner</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>testuser</TableCell>
                                    <TableCell>Invited</TableCell>
                                </TableRow>
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
                                                        Email Adress
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
                        Outgoing Invites (1)
                    </div>
                    <Table className="m-0 p-0">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>email@email.com</TableCell>
                                <TableCell>
                                    <Button variant="destructive" size="sm">
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
