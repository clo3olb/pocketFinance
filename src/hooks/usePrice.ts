import { useEffect, useState } from "react";
import axios from "axios";
import { PriceType } from "types/QueryDataType";

const usePrice = (ticker: string) => {
  const [price, setPrice] = useState<PriceType | null>(null);
  useEffect(() => {
    const url = `/v7/finance/quote?symbols=${ticker}`;
    const getPrice = () => {
      axios
        .get(url)
        .then((res) => {
          if (res?.data?.quoteResponse?.result[0]) {
            setPrice(res.data.quoteResponse.result[0]);
          }
        })
        .catch((err) => console.error(err));
    };
    getPrice();
    const intervalId = setInterval(() => {
      getPrice();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [ticker]);
  return price;
};

export default usePrice;
