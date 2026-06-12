export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div>
                        <h3 className="font-bold">
                            Smart Study Buddy
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            AI Powered Learning Workspace
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        © 2026 Smart Study Buddy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}