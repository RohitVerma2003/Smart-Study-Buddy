import { SidebarTrigger } from "../../components/ui/sidebar";

export function AppNavbar() {
    return (
        <header className="flex h-16 items-center border-b px-4">
            <SidebarTrigger />

            <div className="ml-3 flex items-center gap-2">
                <span className="font-semibold">
                    Smart Study Buddy
                </span>
            </div>
        </header>
    );
}