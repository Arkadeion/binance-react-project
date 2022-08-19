import { useContext, useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

/* DataTable settings */

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

      const filteredList = listCopy.filter((obj) => obj[selectFilter].match(new RegExp(searchInput, 'i')))

      data.setDataArray([...filteredList]);
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
      <div>
        <Link to={`/assets`}>Assets</Link>
      </div>
      <div className="flex mb-5 justify-between bg-white rounded-xl border-2 border-black w-3/5 p-4 mt-8 mb-8">
        <select className="border-black border-2 mr-2" onChange={orderTable}>
          <option>Order by Name</option>
          <option value="ascending">Ascending</option>
          <option value="descending" >Descending</option>
        </select>
        <div>
          <select className="border-black border-2 mr-2" value={selectFilter} onChange={handleSelect}>
            <option value="symbol">Market</option>
            <option value="baseAsset" >Base Asset</option>
            <option value="quoteAsset" >Quote Asset</option>
          </select>
          <input className="border-black border-2 mr-2" value={searchInput} onChange={handleInput} />
          <button className="border-black border-2 mr-2" onClick={handleFilter} >Search</button>
          <button className="border-black border-2 mr-2" onClick={handleReset} >Reset</button>
        </div>
      </div>
      <div className="bg-white rounded-xl border-2 border-black w-3/5 p-4 mb-8">
        {data.isLoadingMarkets && <h1 className="text-3xl font-bold" >Loading...</h1>}
        {data.error && <h1 className="text-xl font-bold" >{data.error.message}</h1>}
        {!data.error && data.dataArray &&
          <div>
            <DataTable pagination={true} paginationPerPage='30'
              columns={columns}
              data={data.dataArray} />
          </div>
        }
      </div>
    </div>
  );
}