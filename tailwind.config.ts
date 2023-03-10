import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["node_modules/tailvue/dist/tailvue.es.js"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Quicksand"],
        display: ["Quicksand"],
      },
      colors: {
        salmon: "#FFC7C7",
        purple: {
          DEFAULT: "#8785A2",
          600: "#4B3E8C",
        },
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
