import { useContext } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DataContext } from "./DataContext";

/* DataTable settings */

const AssetsComponent = row => (
  <Link to={`/markets?base_asset=${row.baseAsset}`}>{row.baseAsset}</Link>
);

const columns = [
  {
    name: 'Base Asset',
    selector: row => row.baseAsset,
    cell: AssetsComponent

  },
  {
    name: '# of Markets',
    selector: row => row.numberOfMarkets
  },
]

export function Assets() {

  /* import context */

  const data = useContext(DataContext);

  return (
    <div>
      <div>
        <Link to={`/markets`}>Markets</Link>
      </div>
      <div className="bg-white rounded-xl border-2 border-black max-w-fit p-4 mb-8">
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
  );
}