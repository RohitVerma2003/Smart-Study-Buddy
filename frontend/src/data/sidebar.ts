import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    ClipboardList,
    BarChart3,
    PenIcon,
} from "lucide-react";

export const sidebarItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Documents",
        url: "/documents",
        icon: FileText,
    },
    {
        title: "Canvas",
        url: "/canvas",
        icon: PenIcon,
    },
    {
        title: "Chat",
        url: "/chat",
        icon: MessageSquare,
    },
    {
        title: "Quizzes",
        url: "/quizzes",
        icon: ClipboardList,
    },
    {
        title: "Progress",
        url: "/progress",
        icon: BarChart3,
    },
];