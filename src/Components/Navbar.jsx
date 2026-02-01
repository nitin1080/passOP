export default function Navbar(){
    return(
        <nav className="bg-slate-800 text-white">
            <div className="flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-white text-2xl">
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">OP/&gt;</span>
                </div>
                {/* <ul>
                    <li className="flex gap-4">
                        <a className="hover:font-bold" href="/">Home</a>
                        <a className="hover:font-bold" href="#">About</a>
                        <a className="hover:font-bold" href="#">Control</a>
                    </li>
                </ul> */}
                <button className="text-white">
                    <i className="fa-brands fa-github text-2xl"></i>
                    <span className="mx-1 font-bold text-xl">GitHub</span>
                </button>
            </div>
        </nav>
    )
}
