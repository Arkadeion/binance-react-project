import { Link } from "react-router-dom";

export function Nav() {

    return (
        <div className="flex w-3/5 justify-center gap-3 mt-4" >
            <Link className="inline-block px-8 py-3 text-sm font-medium text-indigo-600 transition border border-current rounded hover:scale-110 hover:shadow-xl active:text-indigo-500 focus:outline-none focus:ring" to={`/assets`}>Assets</Link>
            <Link className="inline-block px-8 py-3 text-sm font-medium text-indigo-600 transition border border-current rounded hover:scale-110 hover:shadow-xl active:text-indigo-500 focus:outline-none focus:ring" to={`/markets`}>Markets</Link>
        </div>
    )
}