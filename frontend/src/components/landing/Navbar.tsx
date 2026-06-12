import { Button } from "../../../components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
    const { user } = useAuth();
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-green-600" />

                    <span className="font-bold text-xl">
                        Smart Study Buddy
                    </span>
                </div>

                {user ? <div className="flex gap-3">
                    <Button variant="outline" asChild className="cursor-pointer bg-green-500">
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </Button></div> : <div className="flex gap-3">
                    <Button variant="ghost" asChild>
                        <Link to="/login">
                            Login
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link to="/signup">
                            Get Started
                        </Link>
                    </Button>
                </div>}
            </div>
        </header>
    );
}