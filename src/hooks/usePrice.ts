import { useEffect, useState } from "react";
import axios from "axios";
import { PriceType } from "types/QueryDataType";
import { defaultPriceObject } from "./defaultValues";

const getObject = (symbol: string, prevPrice: number = 0) => {
    let object = Object.assign({}, defaultPriceObject);
    console.log({ prevPrice });
    object.symbol = symbol;

    object.regularMarketPrice = prevPrice == 0 ? parseFloat((Math.random() * 1000).toFixed(2)) : prevPrice;
    let changeInPrice = parseFloat((10 * Math.random()).toFixed(2)) * (Math.random() < 0.5 ? 1 : -1);
    object.regularMarketPrice += changeInPrice;
    console.log(object.regularMarketPrice);
    return object;
};

const usePrice = (ticker: string) => {
    const [price, setPrice] = useState<PriceType | null>(null);
    useEffect(() => {
        setPrice(getObject(ticker));
        const intervalId = setInterval(() => {
            setPrice((price) => getObject(ticker, price?.regularMarketPrice));
        }, 5000);
        return () => clearInterval(intervalId);
    }, [ticker]);
    return price;
};

export default usePrice;

// const usePrice = (ticker: string) => {
//   const [price, setPrice] = useState<PriceType | null>(null);
//   useEffect(() => {
//     const url = `/v7/finance/quote?symbols=${ticker}`;
//     const getPrice = () => {
//       axios
//         .get(url)
//         .then((res) => {
//           if (res?.data?.quoteResponse?.result[0]) {
//             setPrice(res.data.quoteResponse.result[0]);
//           }
//         })
//         .catch((err) => console.error(err));
//     };
//     getPrice();
//     const intervalId = setInterval(() => {
//       getPrice();
//     }, 5000);
//     return () => clearInterval(intervalId);
//   }, [ticker]);
//   return price;
// };

// export default usePrice;
