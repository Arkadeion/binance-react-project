import { useEffect, useState } from "react";

export function useFetchApi() {


    const [dataArray, setDataArray] = useState(null);

    useEffect(() => {

        if (!JSON.parse(sessionStorage.getItem('data'))) {

            Promise.all([
                fetch('https://api.binance.com/api/v3/ticker/price').then(response => response.json()),
                fetch('https://api.binance.com/api/v3/exchangeInfo').then(response => response.json())
            ]).then(([priceResponse, exchangeResponse]) => {
                mapArray(priceResponse, exchangeResponse.symbols);
            })
        }

        setDataArray(JSON.parse(sessionStorage.getItem('data')));

    }, [])

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

    return ({
        dataArray: dataArray,
        isLoadingMarkets: !dataArray,
        setDataArray: setDataArray,
    })
}

