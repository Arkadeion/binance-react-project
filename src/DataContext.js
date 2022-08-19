import { createContext} from "react";
import { useFetchApi } from "./useFetchApi";

export const DataContext = createContext();

export function DataContextProvider({ children }) {

    const { dataArray, assetsArray, error, setAssetsArray, isLoadingAssets, isLoadingMarkets, setDataArray} = useFetchApi();

    return (
        <DataContext.Provider value={{ dataArray, error, isLoadingAssets, isLoadingMarkets, setDataArray, assetsArray, setAssetsArray,}}>
            {children}
        </DataContext.Provider>
    )

}