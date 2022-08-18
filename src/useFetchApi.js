import { useEffect, useState } from "react";

/* const fetcher = (url) => fetch(url).then((response) => response.json());

export function useFetchApi() {

    const priceArray = useSWR('https://api.binance.com/api/v3/ticker/price', fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 15000
    });

    const exchangeArray = useSWR('https://api.binance.com/api/v3/exchangeInfo', fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 15000
    });

    const [priceData, setPriceData] = useState();

    const [exchangeData, setExchangeData] = useState();

    const [dataArray, setDataArray] = useState();

    useEffect(() => {
        if (priceArray) {
            setPriceData(() => priceArray.data);
        }

        if (exchangeArray) {
            setExchangeData(() => exchangeArray.data)
        }

        if (priceData && exchangeData) {
            const mappedArray = priceArray.data.map(ticker => {

                const find = exchangeArray.data.symbols.find(name => name.symbol === ticker.symbol);

                return {
                    ...ticker,
                    baseAsset: find.baseAsset,
                    quoteAsset: find.quoteAsset,
                }
            });

            setDataArray(mappedArray);
        }

    }, [])

    return (
        {
            priceData: priceData,
            exchangeData: exchangeData,
            dataArray: dataArray,
            isLoadingAssets: !exchangeArray.data && !exchangeArray.error,
            isLoadingMarkets: !dataArray && !exchangeArray.error && !priceArray.error,
            error: priceArray.error || exchangeArray.error,
        }
    )
} */

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
        .then(() => sessionStorage.setItem('data', JSON.stringify(dataArray)));
    } else {
        setDataArray(JSON.parse(sessionStorage.getItem('data')));
    }
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

    }

    return({
        dataArray: dataArray,
        isLoadingMarkets: !dataArray,
        setDataArray: setDataArray,
    })
}

