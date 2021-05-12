import { useEffect, useState } from "react";
import axios from "axios";
import { HistoryType } from "types/QueryDataType";

type UseHistoricalPropTypes = {
  ticker: string;
  from: number;
  to?: number;
  interval?: string;
};

const parseCSV = (csv: string) => {
  const rows = csv.split("\n");
  const headers = rows[0].split(",").map((header) => header.toLowerCase());
  const parsed: HistoryType[] = [];
  for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
    const rowContents = rows[rowIndex].split(",");
    let contents: any = {};
    for (let contentIndex = 0; contentIndex < headers.length; contentIndex++) {
      contents[headers[contentIndex]] = rowContents[contentIndex];
    }
    parsed.push(contents);
  }
  return parsed;
};

const useHistorical = ({
  ticker,
  from,
  to = Math.floor(Date.now() / 1000),
  interval = "1d",
}: UseHistoricalPropTypes) => {
  const [history, setHistory] = useState<HistoryType[]>([]);
  useEffect(() => {
    const url = `/v7/finance/download/${ticker}?interval=${interval}&events=history&includeAdjustedClose=true&period1=${Math.floor(
      from
    )}&period2=${to}`;
    axios({ url, method: "GET" }) // important)
      .then((res) => {
        if (res?.data) {
          setHistory(parseCSV(res.data));
        }
      })
      .catch((err) => console.error(err));
  }, [from]);
  return history;
};

export default useHistorical;
