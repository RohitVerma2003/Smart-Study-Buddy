import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../components/ui/sidebar";

import { BookOpen } from "lucide-react";
import { sidebarItems } from "../data/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar() {
    return (
        <Sidebar className="" collapsible="icon">
            <SidebarHeader className="border-b h-16 flex items-center justify-center">
                <div className="flex items-center justify-center gap-2 px-2 py-2">
                    <BookOpen className="h-5 w-5" />

                    <span className="truncate group-data-[collapsible=icon]:hidden font-semibold">
                        Smart Study
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.title} className="border-b h-16 flex justify-center items-center">
                            <SidebarMenuButton asChild>
                                <Link to={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <div className="flex items-center gap-2 p-2">
                    <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
                        <p className="truncate text-sm font-medium">
                            Rohit Verma
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            rohit@gmail.com
                        </p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}