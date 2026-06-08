import { Button } from "../../components/ui/button"
import { Spinner } from "../../components/ui/spinner"

const Loader = () => {
    return (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
            <Button className="bg-green-500">
                <Spinner data-icon="inline-start" color="black" />
                Loading...
            </Button>
        </div>
    )
}

export default Loader