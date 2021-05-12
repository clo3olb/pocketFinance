import { useEffect, useState } from "react";
import axios from "axios";
import { RecommendationType } from "types/QueryDataType";

const useRecommendation = (ticker: string) => {
  const [recommendations, setRecommendations] = useState<RecommendationType[]>(
    []
  );
  useEffect(() => {
    // prettier-ignore
    const url = `/v6/finance/recommendationsbysymbol/${ticker}`
    axios({ url, method: "GET" }) // important)
      .then((res) => {
        if (res?.data?.finance?.result[0]?.recommendedSymbols) {
          setRecommendations(res.data.finance.result[0].recommendedSymbols);
        }
      })
      .catch((err) => console.error(err));
  }, [ticker]);
  return recommendations;
};

export default useRecommendation;
