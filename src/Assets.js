import { useContext } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DataContext } from "./DataContext";
import { Nav } from "./Nav";

/* DataTable settings */

const AssetsComponent = row => (
  <Link className="inline-block px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl active:text-indigo-500" to={`/markets?base_asset=${row.baseAsset}`}>{row.baseAsset}</Link>
);

const MarketsComponent = row => (
  <div className="inline-block px-8 py-3 text-sm font-medium text-indigo-600 transition">{row.numberOfMarkets}</div>
);

const columns = [
  {
    name: 'Base Asset',
    selector: row => row.baseAsset,
    cell: AssetsComponent

  },
  {
    name: '# of Markets',
    selector: row => row.numberOfMarkets,
    cell: MarketsComponent
  },
]

export function Assets() {

  /* import context */

  const data = useContext(DataContext);

  return (
    <div className="flex mb-5 justify-evenly" >
      <div>
        <Nav />
        <div className="flex mb-5 justify-between align-content: center bg-white rounded-xl border-2 border-indigo-500 w-3/5 p-4 mt-8 mb-8" >
          {data.isLoadingAssets && <h1 className="text-xl font-bold" >Loading...</h1>}
          {data.error && <h1 className="text-xl font-bold" >{data.error.message}</h1>}
          {!data.error && data.assetsArray && <div className="text-xl font-bold" >{
            <div>
              <DataTable pagination={true} paginationPerPage='30'
                columns={columns}
                data={data.assetsArray} />
            </div>
          }</div>}
        </div>
      </div >
    </div>
  );
}


