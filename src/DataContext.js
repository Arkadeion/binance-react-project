import { createContext} from "react";
import { useFetchApi } from "./useFetchApi";

export const DataContext = createContext();

export function DataContextProvider({ children }) {

    const { dataArray, assetsArray, setAssetsArray, isLoadingAssets, isLoadingMarkets, setDataArray} = useFetchApi();

    return (
        <DataContext.Provider value={{ dataArray, isLoadingAssets, isLoadingMarkets, setDataArray, assetsArray, setAssetsArray,}}>
            {children}
        </DataContext.Provider>
    )

}