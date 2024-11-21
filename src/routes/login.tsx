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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
    return (
        <div className="flex-grow flex justify-center items-center">
            <Tabs
                defaultValue="login"
                className="flex flex-col items-center h-96"
            >
                <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="pb-4">
                                <Label>Username</Label>
                                <Input placeholder="Username" />
                            </div>
                            <div className="pb-4">
                                <Label>Password</Label>
                                <Input type="password" placeholder="Password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="register">
                    <Card>
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription>
                                Register an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="pb-4">
                                <Label>Username</Label>
                                <Input placeholder="Username" />
                            </div>
                            <div className="pb-4">
                                <Label>Password</Label>
                                <Input type="password" placeholder="Password" />
                            </div>
                            <div>
                                <Label>Confirm password</Label>
                                <Input type="password" placeholder="Password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Register</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
