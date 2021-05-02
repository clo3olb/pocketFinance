export type ChartDataType = {
  labels: number[] | string[] //["1", "2", "3", "4", "5", "6"],
  datasets: {
    label?: string
    data: number[] | string[] // [12, 19, 3, 5, 2, 3],
    fill?: boolean
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}
