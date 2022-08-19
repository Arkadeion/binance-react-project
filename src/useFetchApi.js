import { useEffect, useState } from "react";

export function useFetchApi() {

    /* States */

    const [dataArray, setDataArray] = useState(null);

    const [assetsArray, setAssetsArray] = useState(null);

    const [error, setError] = useState(null);

    /* Fetcher function + setting states */

    useEffect(() => {

        if (!JSON.parse(sessionStorage.getItem('data')) || !JSON.parse(sessionStorage.getItem('assets'))) {

            Promise.all([
                fetch('https://api.binance.com/api/v3/ticker/price').then(response => response.json()),
                fetch('https://api.binance.com/api/v3/exchangeInfo').then(response => response.json())
            ]).then(([priceResponse, exchangeResponse]) => {
                filteredArray(exchangeResponse.symbols);
                mapArray(priceResponse, exchangeResponse.symbols);
            })
            .catch((err) => {setError(err)});
        }

        setDataArray(JSON.parse(sessionStorage.getItem('data')));
        setAssetsArray(JSON.parse(sessionStorage.getItem('assets')));
        

    }, [])

    /* Generation of the arrays of objects required for the tables */

    function mapArray(priceData, exchangeData) {

        const mappedArray = priceData.map((ticker, index) => {

            const find = exchangeData.find(name => name.symbol === ticker.symbol);

            return {
                ...ticker,
                baseAsset: find.baseAsset,
                quoteAsset: find.quoteAsset,
                id: index + 1
            }
        });

        setDataArray(mappedArray);
        sessionStorage.setItem('data', JSON.stringify(mappedArray))
    }

    function filteredArray(symbols) {

        const unique = [...new Set(symbols.map(item => item.baseAsset))];

        const reducedArray = unique.map((element, index) => {

            const count = symbols.filter(name => name.baseAsset === unique[index]).length;

            return {                
                id: index + 1,
                baseAsset: element,
                numberOfMarkets: count,
            }
        });

        setAssetsArray(reducedArray);
        sessionStorage.setItem('assets', JSON.stringify(reducedArray));
    }

    return ({
        dataArray: dataArray,
        assetsArray: assetsArray,
        setAssetsArray: setAssetsArray,
        isLoadingMarkets: !dataArray && !error,
        isLoadingAssets: !assetsArray && !error,
        setDataArray: setDataArray,
    })
}

