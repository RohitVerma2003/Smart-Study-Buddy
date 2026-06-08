import {
    SidebarInset,
    SidebarProvider,
} from "../../../components/ui/sidebar";

import { Outlet } from "react-router-dom";
import { AppSidebar } from "../../components/AppSidebar";
import { AppNavbar } from "../../components/AppNavbar";

export default function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <AppNavbar />

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}