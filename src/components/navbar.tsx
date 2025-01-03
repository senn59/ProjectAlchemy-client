import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shadcn/theme-toggle";
import { useAuth } from "@/auth/authprovider.tsx";
import { Invitations } from "@/components/invitations.tsx";

function Navbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const signOut = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <div className="w-screen h-16 flex items-center justify-between">
                <div className="w-full flex items-center">
                    <h1 className="pr-4 pl-4 font-bold">ProjectAlchemy</h1>
                    <Link to="/projects">
                        <Button variant={"ghost"}>Projects</Button>
                    </Link>
                </div>
                <div className="pr-5 flex items-center">
                    <div className="mr-4 text-sm w-max">
                        <span className="font-bold text-muted-foreground">
                            Logged in:
                        </span>{" "}
                        <span className="">{user?.email}</span>
                    </div>
                    <div className="mr-4">
                        <Invitations />
                    </div>
                    <div className="mr-4">
                        <ModeToggle />
                    </div>
                    <Button variant={"outline"} onClick={signOut}>
                        Sign out
                    </Button>
                </div>
            </div>
            <Separator />
        </>
    );
}
export default Navbar;
