module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      cyan: {
        0: "#e7f7f7",
        50: "#cceded",
        100: "#90e2df",
        150: "#8de2e0"
      },
      gray: {
        0: "#323232",
        10: "#eeeeee",
        20: "#999999",
        30: "#666666",
        50: "#dadada",
        100: "#f7fafc",
        200: "#f4f5f6",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c"
      },
      red: {
        0: "#e40000",
        100: "#fff5f5",
        200: "#fed7d7",
        300: "#feb2b2",
        400: "#fc8181",
        500: "#f56565",
        600: "#e53e3e",
        700: "#c53030",
        800: "#9b2c2c",
        900: "#742a2a"
      },
      orange: {
        100: "#fffaf0",
        200: "#feebc8",
        300: "#fbd38d",
        400: "#f6ad55",
        500: "#ed8936",
        600: "#dd6b20",
        700: "#c05621",
        800: "#9c4221",
        900: "#7b341e"
      },
      yellow: {
        0: "#fbcb3b",
        100: "#fffff0",
        200: "#fefcbf",
        300: "#faf089",
        400: "#f6e05e",
        500: "#ecc94b",
        600: "#d69e2e",
        700: "#b7791f",
        800: "#975a16",
        900: "#744210"
      },
      green: {
        0: "#35a509",
        100: "#f0fff4",
        200: "#c6f6d5",
        300: "#9ae6b4",
        400: "#68d391",
        500: "#48bb78",
        600: "#38a169",
        700: "#2f855a",
        800: "#276749",
        900: "#22543d"
      },
      teal: {
        100: "#e6fffa",
        200: "#b2f5ea",
        300: "#81e6d9",
        400: "#4fd1c5",
        500: "#38b2ac",
        600: "#319795",
        700: "#2c7a7b",
        800: "#285e61",
        900: "#234e52"
      },
      blue: {
        100: "#e7f7f7",
        200: "#bee3f8",
        300: "#90cdf4",
        400: "#63b3ed",
        500: "#4299e1",
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#2a4365"
      },
      indigo: {
        100: "#ebf4ff",
        200: "#c3dafe",
        300: "#a3bffa",
        400: "#7f9cf5",
        500: "#667eea",
        600: "#5a67d8",
        700: "#4c51bf",
        800: "#434190",
        900: "#3c366b"
      },
      purple: {
        100: "#faf5ff",
        200: "#e9d8fd",
        300: "#d6bcfa",
        400: "#b794f4",
        500: "#9f7aea",
        600: "#805ad5",
        700: "#6b46c1",
        800: "#553c9a",
        900: "#44337a"
      },
      pink: {
        100: "#fff5f7",
        200: "#fed7e2",
        300: "#fbb6ce",
        400: "#f687b3",
        500: "#ed64a6",
        600: "#d53f8c",
        700: "#b83280",
        800: "#97266d",
        900: "#702459"
      }
    },
    spacing: {
      "px": "1px",
      "0": "0",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "8": "2rem",
      "10": "2.5rem",
      "12": "3rem",
      "14": "3.5rem",
      "15": "3.75rem",
      "16": "4rem",
      "18": "4.5rem",
      "20": "5rem",
      "24": "6rem",
      "32": "8rem",
      "34": "8.5rem",
      "35": "8.75rem",
      "36": "9rem",
      "38": "9.5rem",
      "40": "10rem",
      "48": "12rem",
      "50": "12.5rem",
      "52": "13rem",
      "56": "14rem",
      "64": "16rem",
      "40rem": "40rem"
    },
    backgroundColor: (theme) => theme("colors"),
    backgroundPosition: {
      "bottom": "bottom",
      "center": "center",
      "left": "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      "right": "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      "top": "top"
    },
    backgroundSize: {
      "auto": "auto",
      "cover": "cover",
      "contain": "contain",
      "100-100": "100% 100%"
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      default: theme("colors.gray.300", "currentColor")
    }),
    borderRadius: {
      "none": "0",
      "sm": "0.125rem",
      "default": "0.25rem",
      "md": "0.375rem",
      "lg": "0.5rem",
      "2": "2rem",
      "full": "9999px"
    },
    borderWidth: {
      "default": "1px",
      "0": "0",
      "2": "2px",
      "4": "4px",
      "8": "8px"
    },
    boxShadow: {
      "default":
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "md":
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "lg":
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "xl":
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      "outline": "0 0 0 3px rgba(66, 153, 225, 0.5)",
      "none": "none"
    },
    container: {
      center: true
    },
    cursor: {
      "auto": "auto",
      "default": "default",
      "pointer": "pointer",
      "wait": "wait",
      "text": "text",
      "move": "move",
      "not-allowed": "not-allowed"
    },
    fill: {
      current: "currentColor"
    },
    flex: {
      "1": "1 1 0%",
      "auto": "1 1 auto",
      "initial": "0 1 auto",
      "none": "none"
    },
    flexGrow: {
      "0": "0",
      "default": "1"
    },
    flexShrink: {
      "0": "0",
      "default": "1"
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace"
      ],
      ciuta: ["Ciutadella", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"']
    },
    fontSize: {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "md": "0.9375rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "2rem": "2rem"
    },
    fontWeight: {
      hairline: "100",
      thin: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    },
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "100vh"
    }),
    inset: (theme) => ({
      "0": "0",
      "100": "100%",
      "auto": "auto",
      "-3rem": "-3rem",
      "1/2": "50%",
      ...theme("spacing")
    }),
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em"
    },
    lineHeight: {
      "none": "1",
      "tight": "1.25",
      "snug": "1.375",
      "normal": "1.5",
      "relaxed": "1.625",
      "loose": "2",
      "6": "1.5rem"
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal"
    },
    margin: (theme, { negative }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...negative(theme("spacing"))
    }),
    maxHeight: (theme) => ({
      full: "100%",
      screen: "100vh",
      ...theme("spacing")
    }),
    maxWidth: {
      "xs": "20rem",
      "sm": "24rem",
      "md": "28rem",
      "lg": "32rem",
      "xl": "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5lg": "62rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "78rem",
      "full": "100%"
    },
    minHeight: (theme) => ({
      full: "100%",
      screen: "100vh",
      ...theme("spacing")
    }),
    minWidth: {
      "0": "0",
      "full": "100%"
    },
    objectPosition: {
      "bottom": "bottom",
      "center": "center",
      "left": "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      "right": "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      "top": "top"
    },
    opacity: {
      "0": "0",
      "25": "0.25",
      "50": "0.5",
      "75": "0.75",
      "100": "1"
    },
    order: {
      "first": "-9999",
      "last": "9999",
      "none": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
      "11": "11",
      "12": "12"
    },
    padding: (theme) => theme("spacing"),
    placeholderColor: (theme) => theme("colors"),
    stroke: {
      current: "currentColor"
    },
    textColor: (theme) => theme("colors"),
    width: (theme) => ({
      "auto": "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/7": "14.28571%",
      "1/8": "12.5%",
      "7/8": "87.5%",
      "3/10": "30%",
      "7/10": "70%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      "7/20": "35%",
      "full": "100%",
      "screen": "100vw"
    }),
    zIndex: {
      "auto": "auto",
      "0": "0",
      "2": "2",
      "10": "10",
      "20": "20",
      "30": "30",
      "40": "40",
      "50": "50"
    },
    animations: {
      "three-bounce": {
        "0%": {
          transform: "scale(0)"
        },
        "40%": {
          transform: "scale(1)"
        },
        "80%": {
          transform: "scale(0)"
        },
        "100%": {
          transform: "scale(0)"
        }
      },
      "pulse": {
        "50%": {
          opacity: 1.0
        },
        "100%": {
          opacity: 0.25
        }
      }
    },
    animationDuration: {
      "default": "1s",
      "0s": "0s",
      "1s": "1s",
      "1.4s": "1.4s",
      "2s": "2s",
      "3s": "3s",
      "4s": "4s",
      "5s": "5s"
    },
    animationTimingFunction: {
      "default": "ease",
      "linear": "linear",
      "ease": "ease",
      "ease-in": "ease-in",
      "ease-out": "ease-out",
      "ease-in-out": "ease-in-out"
    },
    animationDelay: {
      "default": "0s",
      ".32s": "-.32s",
      ".16s": "-.16s",
      "0s": "0s",
      "1s": "1s",
      "2s": "2s",
      "3s": "3s",
      "4s": "4s",
      "5s": "5s"
    },
    animationIterationCount: {
      default: "infinite",
      once: "1",
      infinite: "infinite"
    },
    animationDirection: {
      "default": "normal",
      "normal": "normal",
      "reverse": "reverse",
      "alternate": "alternate",
      "alternate-reverse": "alternate-reverse"
    },
    animationFillMode: {
      default: "none",
      none: "none",
      forwards: "forwards",
      backwards: "backwards",
      both: "both"
    },
    animationPlayState: {
      running: "running",
      paused: "paused"
    },
    transform: {
      none: "none"
    },
    transformOrigin: {
      t: "top",
      tr: "top right",
      r: "right",
      br: "bottom right",
      b: "bottom",
      bl: "bottom left",
      l: "left",
      tl: "top left"
    },
    translate: {
      "1/2": "50%",
      "full": "100%",
      "right-up": ["100%", "-100%"],
      "3d": ["40px", "-60px", "-130px"]
    },
    scale: {
      "90": "0.9",
      "100": "1",
      "110": "1.1",
      "-100": "-1",
      "stretched-x": ["2", "0.5"],
      "stretched-y": ["0.5", "2"],
      "3d": ["0.5", "1", "2"]
    },
    rotate: {
      "90": "90deg",
      "180": "180deg",
      "270": "270deg",
      "3d": ["0", "1", "0.5", "45deg"]
    },
    skew: {
      "-5": "-5deg",
      "5": "5deg"
    },
    perspective: {
      "none": "none",
      "250": "250px",
      "500": "500px",
      "750": "750px",
      "1000": "1000px"
    },
    perspectiveOrigin: {
      t: "top",
      tr: "top right",
      r: "right",
      br: "bottom right",
      b: "bottom",
      bl: "bottom left",
      l: "left",
      tl: "top left"
    }
  },
  variants: {
    accessibility: ["responsive", "focus"],
    alignContent: ["responsive"],
    alignItems: ["responsive"],
    alignSelf: ["responsive"],
    appearance: ["responsive"],
    backgroundAttachment: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus"],
    backgroundPosition: ["responsive"],
    backgroundRepeat: ["responsive"],
    backgroundSize: ["responsive"],
    borderCollapse: ["responsive"],
    borderColor: ["responsive", "hover", "focus"],
    borderRadius: ["responsive"],
    borderStyle: ["responsive"],
    borderWidth: ["responsive"],
    boxShadow: ["responsive", "hover", "focus"],
    cursor: ["responsive"],
    display: ["responsive"],
    fill: ["responsive"],
    flex: ["responsive"],
    flexDirection: ["responsive"],
    flexGrow: ["responsive"],
    flexShrink: ["responsive"],
    flexWrap: ["responsive"],
    float: ["responsive"],
    fontFamily: ["responsive"],
    fontSize: ["responsive"],
    fontSmoothing: ["responsive"],
    fontStyle: ["responsive"],
    fontWeight: ["responsive", "hover", "focus"],
    height: ["responsive"],
    inset: ["responsive"],
    justifyContent: ["responsive"],
    letterSpacing: ["responsive"],
    lineHeight: ["responsive"],
    listStylePosition: ["responsive"],
    listStyleType: ["responsive"],
    margin: ["responsive"],
    maxHeight: ["responsive"],
    maxWidth: ["responsive"],
    minHeight: ["responsive"],
    minWidth: ["responsive"],
    objectFit: ["responsive"],
    objectPosition: ["responsive"],
    opacity: ["responsive", "hover", "focus"],
    order: ["responsive"],
    outline: ["responsive", "focus"],
    overflow: ["responsive"],
    padding: ["responsive"],
    placeholderColor: ["responsive", "focus"],
    pointerEvents: ["responsive"],
    position: ["responsive"],
    resize: ["responsive"],
    stroke: ["responsive"],
    tableLayout: ["responsive"],
    textAlign: ["responsive"],
    textColor: ["responsive", "hover", "focus"],
    textDecoration: ["responsive", "hover", "focus"],
    textTransform: ["responsive"],
    userSelect: ["responsive"],
    verticalAlign: ["responsive"],
    visibility: ["responsive"],
    whitespace: ["responsive"],
    width: ["responsive"],
    wordBreak: ["responsive"],
    zIndex: ["responsive"],
    // all the following default to ['responsive']
    animations: ["responsive"],
    animationDuration: ["responsive"],
    animationTimingFunction: ["responsive"],
    animationDelay: ["responsive"],
    animationIterationCount: ["responsive"],
    animationDirection: ["responsive"],
    animationFillMode: ["responsive"],
    animationPlayState: ["responsive"],
    // all the following default to ['responsive']
    transform: ["responsive"],
    transformOrigin: ["responsive"],
    translate: ["responsive"],
    scale: ["responsive"],
    rotate: ["responsive"],
    skew: ["responsive"],
    perspective: ["responsive"],
    perspectiveOrigin: ["responsive"],
    transformStyle: ["responsive"],
    backfaceVisibility: ["responsive"],
    transformBox: ["responsive"]
  },
  corePlugins: {},
  plugins: [
    require("tailwindcss-animations", "tailwindcss-transforms")({
      "3d": false
    })
  ]
};
