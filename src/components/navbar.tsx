import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shadcn/theme-toggle";
import { useAuthStore } from "@/auth/store.ts";

function Navbar() {
    const store = useAuthStore();
    const navigate = useNavigate();

    const signOut = () => {
        store.logout();
        navigate("/");
    };
    return (
        <>
            <div className="w-screen h-16 flex items-center justify-between">
                <div className="w-full flex items-center">
                    <h1 className="pr-4 pl-4 font-bold">ProjectAlchemy</h1>
                    <Button variant={"ghost"}>
                        <Link to="/board">Board</Link>
                    </Button>
                </div>
                <div className="pr-5 flex">
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
