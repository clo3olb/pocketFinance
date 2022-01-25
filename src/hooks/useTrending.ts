import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingsType } from "types/QueryDataType";

const useTrending = () => {
    const [trendings, setTrendings] = useState<TrendingsType | null>(null);
    useEffect(() => {
        // prettier-ignore
        const url = `v1/finance/trending/US?count=5`;
        axios({ url, method: "GET" }) // important)
            .then((res) => {
                if (res?.data) {
                    setTrendings(res.data.finance.result[0]);
                }
            })
            .catch((err) => console.error(err));
    }, []);
    return trendings;
};

export default useTrending;
