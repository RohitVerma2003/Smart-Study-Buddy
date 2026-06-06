import { Button } from "../../components/ui/button"
import { Spinner } from "../../components/ui/spinner"

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 w-screen h-screen">
            <Button className="bg-green-500">
                <Spinner data-icon="inline-start" color="black"/>
                Loading...
            </Button>
        </div>
    )
}

export default Loader