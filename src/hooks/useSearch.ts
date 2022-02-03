import { useEffect, useState } from "react";
import axios from "axios";
import { SearchType } from "types/QueryDataType";
import { defaultSearchObject } from "./defaultValues";

const useSearch = (query: string) => {
    const [news, setNews] = useState<SearchType | null>(null);
    useEffect(() => {
        // prettier-ignore
        setNews(defaultSearchObject);
    }, [query]);
    return news;
};

// const useSearch = (query: string) => {
//   const [news, setNews] = useState<SearchType | null>(null);
//   useEffect(() => {
//     // prettier-ignore
//     const url = `/v1/finance/search?q=${query}&lang=en-US&region=US`;
//     axios({ url, method: "GET" }) // important)
//       .then((res) => {
//         if (res?.data) {
//           setNews(res.data);
//         }
//       })
//       .catch((err) => console.error(err));
//   }, [query]);
//   return news;
// };

export default useSearch;
