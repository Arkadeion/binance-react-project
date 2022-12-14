import { useContext, useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router";
import { Nav } from "./Nav";

/* DataTable settings */

const MarketsComponent = row => (
  <div className="inline-block py-3 text-sm font-medium text-indigo-700">{row.symbol}</div>
);

const BaseAssetComponent = row => (
  <div className="inline-block py-3 text-sm font-medium text-indigo-700">{row.baseAsset}</div>
);

const QuoteAssetComponent = row => (
  <div className="inline-block py-3 text-sm font-medium text-indigo-700">{row.quoteAsset}</div>
);

const PriceComponent = row => (
  <div className="inline-block py-3 text-sm font-medium text-indigo-700">${row.price}</div>
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
  noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: "#4F46E5",
      backgroundColor: "#F1F5F9",
      fontSize: "1rem",
    },
  },
}

const columns = [
  {
    name: 'Market',
    selector: row => row.symbol,
    cell: MarketsComponent
  },
  {
    name: 'Base Asset',
    selector: row => row.baseAsset,
    cell: BaseAssetComponent
  },
  {
    name: 'Quote Asset',
    selector: row => row.quoteAsset,
    cell: QuoteAssetComponent
  },
  {
    name: 'Price',
    selector: row => row.price,
    cell: PriceComponent
  }
]

export function Markets() {

  /* import context */
  const data = useContext(DataContext);

  /* Query parameters fetching */
  const query = useLocation().search;

  /* States  for the filtering and search */

  const [searchInput, setSearchInput] = useState('');

  const [selectFilter, setSelectFilter] = useState('symbol');

  const [queryStatus, setQueryStatus] = useState(false);

  /* Event handlers */

  function handleInput(event) {
    setSearchInput(event.target.value);
  }

  function handleSelect(event) {
    setSelectFilter(event.target.value);
  }

  function handleFilter() {

    let listCopy;

    if (sessionStorage.getItem('data') === null) {

      sessionStorage.setItem('data', JSON.stringify(data.dataArray));
      listCopy = JSON.parse(sessionStorage.getItem('data'));
    } else {
      listCopy = JSON.parse(sessionStorage.getItem('data'));
    }

    if (searchInput === '') {

      data.setDataArray([...listCopy])

    } else {

      if (selectFilter === 'symbol') {

        const filteredList = listCopy.filter((obj) => obj[selectFilter].match(new RegExp(searchInput, 'ig')))

        data.setDataArray([...filteredList]);

      } else {

        const filteredList = listCopy.filter((obj) => obj[selectFilter].match(new RegExp(`^${searchInput}$`, 'ig')))

        data.setDataArray([...filteredList]);

      }
    }
  }

  function handleReset() {

    let listCopy = JSON.parse(sessionStorage.getItem('data'));
    data.setDataArray([...listCopy]);
    setSearchInput('')
  }

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
      case 'default':
        data.setDataArray(data.dataArray.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
        data.setDataArray([...data.dataArray]);
        break;
      default:
        break;
    }
  }

  function handleQuery() {

    const baseAsset = new URLSearchParams(query).get('base_asset');

    if (baseAsset) {
      setSearchInput(baseAsset);
      setSelectFilter('baseAsset');
    }
  }

  /* Use Effects for query parameters */

  useEffect(() => {
    handleQuery();
    setQueryStatus(true);
  }, [query])

  useEffect(() => {
    handleFilter();
  }, [queryStatus])

  return (
    <div>
      <Nav />
      <div className="flex mb-5 bg-slate-200 justify-around content-center bg-white rounded-xl border-2 border-black w-3/5 p-4 mt-8">
        <div className="flex content-center">
          <select className="border mt-10 h-fit bg-white border-indigo-500 rounded text-indigo-700" onChange={orderTable}>
            <option value="default" >Default Order</option>
            <option value="ascending">Ascending</option>
            <option value="descending" >Descending</option>
          </select>
        </div>
        <div>
          <select className="border bg-white border-indigo-500 rounded text-indigo-700" value={selectFilter} onChange={handleSelect}>
            <option value="symbol">Market</option>
            <option value="baseAsset" >Base Asset</option>
            <option value="quoteAsset" >Quote Asset</option>
          </select>
          <input className="w-full p-3 mt-1 mb-1 text-sm border border-indigo-500 rounded" value={searchInput} onChange={handleInput} />
          <button className="inline-block bg-white px-4 py-2 mr-3 text-sm font-medium text-indigo-700 transition border border-current rounded active:text-indigo-500 focus:outline-none focus:ring" onClick={handleFilter} >Search</button>
          <button className="inline-block bg-white px-4 py-2 text-sm font-medium text-indigo-700 transition border border-current rounded active:text-indigo-500 focus:outline-none focus:ring" onClick={handleReset} >Reset</button>
        </div>
      </div>
      <div className="bg-slate-100 rounded-xl border-2 border-black w-3/5 p-4 mb-8">
        <div className="bg-slate-100 flex justify-center" >
          {data.isLoadingMarkets && <h1 className="text-3xl font-bold" >Loading...</h1>}
          {data.error && <h1 className="text-xl font-bold" >{data.error.message}</h1>}
        </div>
        {!data.error && data.dataArray &&
          <div className="bg-slate-100">
            <DataTable pagination={true} paginationPerPage='30'
              columns={columns}
              data={data.dataArray}
              customStyles={customStyles} />
          </div>
        }
      </div>
    </div>
  );
}

