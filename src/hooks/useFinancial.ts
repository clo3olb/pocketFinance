import { useEffect, useState } from "react";
import axios from "axios";
const yahooFinance = require("yahoo-finance");

const useFinancial = (ticker: string) => {
  const [financial, setFinancial] = useState(null);
  useEffect(() => {
    // prettier-ignore
    const url = `/v1/finance/search?q=${ticker}&lang=en-US&region=US`;
    axios({ url, method: "GET" }) // important)
      .then((res) => {
        if (res?.data) {
          setFinancial(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, [ticker]);
  return financial;
};

export default useFinancial;
