import logo from "@/assets/cetus-whale.png";

export function Header() {
    return <div className="border-b">
        <div className="flex h-16 items-center px-4 gap-2">
            <img src={logo} alt={"cetuspro whale"} className={"h-6 block"}/>
            <h1 className={"font-bold"}>Cetus Weather</h1>
        </div>
    </div>;
}
