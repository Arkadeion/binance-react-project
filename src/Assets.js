import { useContext } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DataContext } from "./DataContext";
import { Nav } from "./Nav";

/* DataTable settings */

const AssetsComponent = row => (
  <Link className="inline-block px-3 py-3 text-sm font-medium text-indigo-700 transition hover:scale-110 hover:shadow-xl active:text-indigo-500" to={`/markets?base_asset=${row.baseAsset}`}>{row.baseAsset}</Link>
);

const MarketsComponent = row => (
  <div className="inline-block py-3 text-sm font-medium text-indigo-700 transition">{row.numberOfMarkets}</div>
);

const customStyles = {
  table: {
		style: {
			backgroundColor: "#F1F5F9",
		},
	},
  headRow: {
    style: {
      backgroundColor: "#F1F5F9",
      minHeight: '52px',
      borderBottomWidth: '1px',
      borderBottomColor: "#4F46E5",
      borderBottomStyle: 'solid',
      fontSize: "1rem",
      color: "#4F46E5",
    },
  },
  rows: {
    style: {
      backgroundColor: "#F1F5F9",
      
      '&:not(:last-of-type)': {
        borderBottomStyle: 'dotted',
        borderBottomWidth: '1px',
        borderBottomColor: "#4F46E5",
      },
    },
  },
  pagination: {
		style: {
			color: "#4F46E5",
			fontSize: '11px',
			minHeight: '56px',
			backgroundColor: "#F1F5F9",
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: "#4F46E5",
		},
	},
}

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
    <div className="flex mb-5 w-3/5 justify-center" >
      <div>
        <div className="flex justify-center">
          <Nav />
        </div>
        <div className="flex justify-center bg-slate-100 mb-5 rounded-xl border-2 border-black max-w-fit p-4 mt-8 mb-8" >
          {data.isLoadingAssets && <h1 className="text-xl font-bold" >Loading...</h1>}
          {data.error && <h1 className="text-xl font-bold" >{data.error.message}</h1>}
          {!data.error && data.assetsArray && <div className="text-xl font-bold" >{
            <div>
              <DataTable pagination={true} paginationPerPage='30'
                columns={columns}
                data={data.assetsArray}
                customStyles={customStyles} />
            </div>
          }</div>}
        </div>
      </div >
    </div>
  );
}


