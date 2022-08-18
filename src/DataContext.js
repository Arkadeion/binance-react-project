import { createContext, useEffect, useState } from "react";
import { useFetchApi } from "./useFetchApi";

export const DataContext = createContext();

export function DataContextProvider({ children }) {

    const { dataArray, isLoadingAssets, isLoadingMarkets, setDataArray} = useFetchApi();

    

    return (
        <DataContext.Provider value={{ dataArray, isLoadingAssets, isLoadingMarkets, setDataArray}}>
            {children}
        </DataContext.Provider>
    )

}