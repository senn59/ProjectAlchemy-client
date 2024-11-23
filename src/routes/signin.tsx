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
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/auth/supabaseClient.ts";
import { toast } from "@/hooks/use-toast.ts";

export default function Signin() {
    const formSchema = z.object({
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Enter a valid password"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        supabase.auth
            .signInWithPassword({
                email: values.email,
                password: values.password,
            })
            .then((data) => {
                console.log(data);
                if (data.error) {
                    toast({
                        variant: "destructive",
                        title: "Error occurred while trying to log you in!",
                        description: data.error.message,
                    });
                } else {
                    console.log("Logged in!");
                }
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
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
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
                            <Button className="w-full" type={"submit"}>
                                Continue
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            to={"/auth/signup"}
                            className="font-bold hover:underline"
                        >
                            Signup
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
