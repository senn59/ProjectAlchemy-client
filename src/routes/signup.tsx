import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { supabase } from "@/auth/supabaseClient.ts";
import { toast } from "@/hooks/use-toast.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form.tsx";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const formSchema = z
        .object({
            email: z.string().email(),
            password: z
                .string()
                .min(6, "Password must have a minimum length of 6"),
            passwordConfirm: z.string(),
        })
        .refine((data) => data.password == data.passwordConfirm, {
            message: "Passwords dont match",
            path: ["passwordConfirm"],
        });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        supabase.auth
            .signUp({
                email: values.email,
                password: values.password,
            })
            .then(() => {
                navigate("/auth/signin");
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Error!",
                    description:
                        "Something went wrong while trying to process your request!",
                });
            });
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>Sign up for an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="pb-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="pb-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Password"
                                                    type="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="pb-4">
                                <FormField
                                    control={form.control}
                                    name="passwordConfirm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Repeat password"
                                                    type="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button className="w-full" type={"submit"}>
                                Continue
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to={"/auth/signin"}
                            className="font-bold hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
