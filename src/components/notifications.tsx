import { Button } from "@/components/ui/button.tsx";
import { LucideBell } from "lucide-react";

export function Notifications() {
    return (
        <>
            <Button variant="outline" size="icon">
                <LucideBell className="h-[1.2rem] w-[1.2rem] " />
            </Button>
        </>
    );
}
