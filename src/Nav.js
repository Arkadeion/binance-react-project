import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./DataContext";

export function Nav() {

    const data = useContext(DataContext);

    return (
        <div className="flex w-3/5 justify-center gap-3" >
            <Link className="inline-block px-8 bg-slate-100 py-5 text-xl font-bold text-indigo-700 transition border-2 border-current rounded hover:scale-110 hover:shadow-xl active:text-indigo-500 focus:outline-none focus:ring" to={`/assets`}>Assets</Link>
            <Link className="inline-block px-8 bg-slate-100 py-5 text-xl font-bold text-indigo-700 transition border-2 border-current rounded hover:scale-110 hover:shadow-xl active:text-indigo-500 focus:outline-none focus:ring" to={`/markets`}>Markets</Link> 
            <button className="inline-block px-8 bg-slate-100 py-3 text-medium font-bold text-indigo-700 transition border-2 border-current rounded hover:scale-110 hover:shadow-xl active:text-indigo-500 focus:outline-none focus:ring" onClick={data.refreshData} >Refresh Data</button>
        </div>
    )
}