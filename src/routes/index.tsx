import { ModeToggle } from "@/components/shadcn/theme-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/auth/authprovider.tsx";

export default function Index() {
    const navigate = useNavigate();
    const { user, jwt } = useAuth();

    useEffect(() => {
        if (user != null && jwt != null) {
            navigate("/board");
        }
    }, [jwt, user]);

    return (
        <>
            <div className="absolute right-8 top-4">
                <ModeToggle />
            </div>
            <div className="h-screen w-screen flex flex-col items-center justify-center">
                <div className="w-1/3 flex flex-col items-center justify-center">
                    <h1 className="scroll-m-20 text-4xl font-extrabold text-center tracking-tight lg:text-5xl">
                        Lightweight Agile Project Management Tool
                    </h1>
                    <div className="py-3"></div>
                    <p className="text-muted-foreground px-14 text-center">
                        Project Alchemy is a lightweight agile project
                        management tool made by developers for developers.
                    </p>
                    <div className="py-3"></div>
                    <div>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/auth/signup")}
                        >
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
