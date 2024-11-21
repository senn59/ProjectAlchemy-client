import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shadcn/theme-toggle";

function Root() {
    return (
        <>
            <div className="w-screen h-16 flex items-center justify-between">
                <div className="w-full flex items-center">
                    <h1 className="pr-10 pl-4 font-bold">ProjectAlchemy</h1>
                    <Button variant={"ghost"}>
                        <Link to="/board">Board</Link>
                    </Button>
                </div>
                <div className="pr-5">
                    <ModeToggle />
                </div>
            </div>
            <Separator />
        </>
    );
}
export default Root;
