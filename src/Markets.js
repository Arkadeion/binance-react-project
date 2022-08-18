import { useContext, useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: 'Market',
    selector: row => row.symbol
  },
  {
    name: 'Base Asset',
    selector: row => row.baseAsset
  },
  {
    name: 'Quote Asset',
    selector: row => row.quoteAsset
  },
  {
    name: 'Price',
    selector: row => '$' + row.price
  }
]

export function Markets() {

  const data = useContext(DataContext);

  function orderTable(event) {

    const value = event.target.value;

    switch (value) {
      case 'ascending':
        data.setDataArray(data.dataArray.sort((a, b) => (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0)));
        data.setDataArray([...data.dataArray]);
        break;
      case 'descending':
        data.setDataArray(data.dataArray.sort((a, b) => (b.symbol > a.symbol) ? 1 : ((a.symbol > b.symbol) ? -1 : 0)));
        data.setDataArray([...data.dataArray]);
        break;
      default:
        break;
    }

  }

  return (
    <div>
      <div className="bg-white rounded-xl border-2 border-black w-3/5 p-4 mb-8">
        {data.isLoadingMarkets && <h1 className="text-3xl font-bold" >Loading...</h1>}
        {data.error && <h1 className="text-xl font-bold" >{data.error.message}</h1>}
        {/* {!data.error && data.dataArray && <ul>{data.dataArray.map((symbol) => <li key={symbol.id}>Market: {symbol.symbol} --- Price: {symbol.price} --- Base Asset: {symbol.baseAsset} --- Quote Asset: {symbol.quoteAsset} --- ID: {symbol.id}</li>)}</ul>} */}
        {!data.error && data.dataArray &&
          <div>
            <select onChange={orderTable}>
              <option>Order by Name</option>
              <option value="ascending">Ascending</option>
              <option value="descending" >Descending</option>
            </select>
            <DataTable
              columns={columns}
              data={data.dataArray} />
          </div>

        }
      </div>
    </div>
  );
}