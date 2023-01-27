import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        body: ["Quicksand"],
        display: ["Quicksand"],
      },
      colors: {
        salmon: "#FFC7C7",
        purple: "#8785A2",
        "light-grey": "#F5F5F5",
      },
      scale: {
        99: "0.99",
        98: "0.98",
        85: "0.85",
        80: "0.80",
      },
      opacity: {
        15: "0.15",
      },
    },
  },
};
