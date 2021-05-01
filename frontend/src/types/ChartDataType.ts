export type GraphDataType = {
  labels: number[] | string[]; //["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      data: number[] | string[]; // [12, 19, 3, 5, 2, 3],
      fill: boolean;
      backgroundColor: string;
      borderColor: string;
    }
  ];
};
