export const parseDate = (inputDate: any) => {
  if (inputDate === null || inputDate === undefined || inputDate === 0) return "-"
  let dateObject = new Date(inputDate)
  const year = dateObject.getFullYear()
  let month: string | number = dateObject.getMonth() + 1
  month = month < 10 ? "0" + month : "" + month
  let date: string | number = dateObject.getDate()
  date = date < 10 ? "0" + date : date
  return `${year}-${month}-${date}`
}

export const getNumberWithSignFunction = (sign: string) => {
  return (number: number | string, isChange: boolean = false): string => addSign(number, sign, isChange)
}
export const addDollarSign = (number: number | string, isChange: boolean = false): string => {
  return addSign(number, "$", isChange)
}
export const addSign = (number: number | string, sign: string, isChange: boolean = false): string => {
  let final = typeof number === "number" ? number.toString() : number
  return isChange ? (`+${sign}` + final).replace(`+${sign}-`, `-${sign}`) : sign + final
}

export const MS_IN_A_DAY = 60 * 60 * 24 * 1000 // milisecondes in a day
