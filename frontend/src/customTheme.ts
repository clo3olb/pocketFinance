import { ThemeType } from "grommet"

const Theme: ThemeType = {
  global: {
    colors: {
      // brand: "#e55039",
      // brand: "#3B3B98",
    },
    font: {
      // family: "Montserrat",
      // family: "GmarketSansMedium",
    },
    focus: {
      outline: {
        size: "none",
      },
    },
    breakpoints: {
      small: {
        value: 780,
        edgeSize: {
          none: "0px",
          hair: "2px",
          xxsmall: "3px",
          xsmall: "6px",
          small: "12px",
          medium: "24px",
          large: "48px",
          xlarge: "72px",
        },
      },
    },
  },
}

export default Theme
