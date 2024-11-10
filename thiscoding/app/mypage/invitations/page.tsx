import SideTap from "@/app/(components)/SideTap";
import '@/app/globals.css';

const Page = () => {

    return (
        <>
            <div className="bg-neutral-200 h-screen">
                <div className="mx-[5%]">
                    <SideTap/>
                </div>
            </div>
        </>
    )
}

export default Page;