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

export default function Signup() {
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>Sign up for an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="pb-4">
                        <Input placeholder="Username" />
                    </div>
                    <div className="pb-4">
                        <Input type="password" placeholder="Password" />
                    </div>
                    <div className="pb-4">
                        <Input type="password" placeholder="Repeat Password" />
                    </div>
                    <Button className="w-full">Continue</Button>
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
