export default function Stats() {
    return (
        <section className="border-y">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-12 text-center">
                <div>
                    <h3 className="text-3xl font-bold">
                        PDFs
                    </h3>

                    <p className="text-muted-foreground">
                        Upload Any Material
                    </p>
                </div>

                <div>
                    <h3 className="text-3xl font-bold">
                        AI
                    </h3>

                    <p className="text-muted-foreground">
                        Instant Explanations
                    </p>
                </div>

                <div>
                    <h3 className="text-3xl font-bold">
                        Quiz
                    </h3>

                    <p className="text-muted-foreground">
                        Auto Generation
                    </p>
                </div>

                <div>
                    <h3 className="text-3xl font-bold">
                        Track
                    </h3>

                    <p className="text-muted-foreground">
                        Learning Progress
                    </p>
                </div>
            </div>
        </section>
    );
}