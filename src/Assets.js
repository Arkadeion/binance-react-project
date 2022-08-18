import { useFetchApi } from "./useFetchApi";

export function Assets() {

  const { data, error, isLoading, logData } = useFetchApi();

  return (
    <div>
      <div className="bg-white rounded-xl border-2 border-black max-w-fit p-4 mb-8">
        {isLoading && <h1 className="text-xl font-bold" >Loading...</h1>}
        {error && <h1 className="text-xl font-bold" >{error.message}</h1>}
        {!error && data && <h1 className="text-xl font-bold" >{data.serverTime !== null ? `${data.serverTime} momento` : `Bruh`}</h1>}
      </div>
      <button className="rounded-xl border-black border-2 p-1 mr-3" onClick={logData} >Refresh User Data</button>
    </div>
  );
}