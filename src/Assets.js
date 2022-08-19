import { useContext } from "react";
import { Link } from "react-router-dom";
import { AssetsComponent } from "./AssetsComponent";
import { DataContext } from "./DataContext";

export function Assets() {

  const data = useContext(DataContext);

  return (
    <div>
      <div>
        <Link to={`/markets`}>Markets</Link>
      </div>
      <div className="bg-white rounded-xl border-2 border-black max-w-fit p-4 mb-8">
        {data.isLoadingAssets && <h1 className="text-xl font-bold" >Loading...</h1>}
        {data.error && <h1 className="text-xl font-bold" >{data.error.message}</h1>}
        {!data.error && data.assetsArray && <h1 className="text-xl font-bold" >{
          <table>
            <thead>
              <tr>
                <th>Base Asset</th>
                <th># of Markets</th>
              </tr>
            </thead>
            <tbody>
              {data.assetsArray.map((asset) => {
                return <AssetsComponent {...asset} key={asset.id} />
              })}
            </tbody>
          </table>
        }</h1>}
      </div>
    </div>
  );
}