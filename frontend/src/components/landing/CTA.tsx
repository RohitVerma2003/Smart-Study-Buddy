import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="rounded-3xl border bg-green-500 p-12 text-center text-white">
                <h2 className="text-4xl font-bold">
                    Turn Every PDF Into
                    <br />
                    A Personal AI Tutor
                </h2>

                <p className="mt-4 text-white/80">
                    Learn faster, revise smarter,
                    and stay ahead.
                </p>

                <Button
                    size="lg"
                    variant="outline"
                    className="mt-8 cursor-pointer"
                >
                    Start Studying

                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </section>
    );
}