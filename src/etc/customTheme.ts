import { ThemeType } from "grommet"
import { deepMerge } from "grommet/utils"

export const resetTheme: ThemeType = {
  global: {
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

export const lightColorTheme: ThemeType = {
  global: {
    colors: {
      // brand: "",
      // brand: "linear-gradient(39deg, rgba(98,193,94,1) 0%, rgba(77,207,201,1) 100%)",
      // brand: "linear-gradient(39deg, rgba(83,205,78,1) 0%, rgba(77,207,201,1) 100%);",
      brand: "linear-gradient(39deg, rgba(96,199,170,1) 0%, rgba(106,209,140,1) 100%)",
      // brand: "linear-gradient(39deg, rgba(12,34,11,1) 0%, rgba(10,73,50,1) 100%);",
      background: "light-1",
      text: {
        dark: "light-1",
        light: "dark-1",
      },
      control: "light-1",
      "neutral-1": "light-1", // White text color when gradient background
      placeholder: "neutral-1",

      border: "light-3",

      // price change color
      "accent-1": "#51c491",
      "accent-2": "#E52634",
    },
  },
}

export const darkColorTheme: ThemeType = {
  global: {
    colors: {
      // brand: "linear-gradient(39deg, rgba(20,147,152,1) 0%, rgba(82,167,164,1) 100%)",
      // brand: "linear-gradient(39deg, rgba(84,173,148,1) 0%, rgba(92,181,121,1) 100%)",
      brand: "light-3",
      background: "#252D3A",
      "light-1": "#2C3647",
      "light-2": "#343E4E",
      "light-3": "#424D5D",
      control: "light-1",
      active: "#424D5D",
      "status-unknown": "light-2",
      text: "#f0f0f0",
      "neutral-1": "#fefefe",
      border: "light-2",
      "accent-1": "#5fe3a9",
      "accent-2": "#f72837",
    },
    focus: {
      outline: {
        size: "none",
      },
    },
    elevation: {
      light: {
        none: "none",
        xsmall: "0px 1px 4px rgba(0, 0, 0, 0.80)",
        small: "0px 2px 8px rgba(0, 0, 0, 0.80)",
        medium: "0px 4px 16px rgba(0, 0, 0, 0.80)",
        large: "0px 8px 16px rgba(0, 0, 0, 0.80)",
        xlarge: "0px 12px 24px rgba(0, 0, 0, 0.80)",
      },
      dark: {
        none: "none",
        xsmall: "0px 1px 4px rgba(0, 0, 0, 0.50)",
        small: "0px 2px 8px rgba(0, 0, 0, 0.50)",
        medium: "0px 4px 16px rgba(0, 0, 0, 0.50)",
        large: "0px 8px 16px rgba(0, 0, 0, 0.50)",
        xlarge: "0px 12px 24px rgba(0, 0, 0, 0.50)",
      },
    },
  },
}

export const cardTheme: ThemeType = {
  card: {
    header: {
      background: "brand",
    },
    body: {
      background: "light-1",
    },
  },
}

export const tabsTheme: ThemeType = {
  tabs: {
    gap: "medium",
    header: {
      extend: "box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);",
    },
    background: {
      color: "brand",
      opacity: "weak",
    },
  },
  tab: {
    active: {
      color: "red",
    },
    hover: {
      background: "background-back",
    },
    border: {
      side: "bottom",
      color: "background-back",
      active: {
        color: "brand",
      },
      hover: {
        color: "background-back",
      },
    },
    pad: "small",
    margin: "none",
  },
}

export const tableTheme: ThemeType = {
  table: {
    header: {
      pad: {
        horizontal: "medium",
        vertical: "xsmall",
      },
      align: "center",
      border: "top",
      extend: "border: 0;",
    },
    body: {
      pad: {
        horizontal: "medium",
        vertical: "xsmall",
      },
      align: "center",
    },
    footer: {
      align: "start",
      border: undefined,
      pad: { horizontal: "large", vertical: "small" },
      verticalAlign: "bottom",
    },
  },
}

export const lightTheme = deepMerge(resetTheme, lightColorTheme, cardTheme, tabsTheme, tableTheme)
export const darkTheme = deepMerge(resetTheme, darkColorTheme, cardTheme, tabsTheme, tableTheme)
