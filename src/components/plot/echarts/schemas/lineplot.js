export const formSchema = {
  title: "Bar Plot Customization",
  type: "object",
  options: {
    inputAttributes: {
      class: "w-full mt-1 rounded-lg p-2 h-12",
    },
  },
  properties: {
    "line-plot-type": {
      type: "string",
      title: "Line Plot Type",
      enum: ["Basic", "Multi", "Stacked"],
      default: "Basic",
      options: {
        inputAttributes: {
          class:
            "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "column-category": {
      type: "string",
      title: "Category Column",
      enum: [],
      default: "DayOfWeek",
      //DayOfWeek
      options: {
        inputAttributes: {
          class:
            "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "second-column-category": {
      type: "string",
      title: "Secondary Category Column",
      enum: [],
      default: "Channel",
      //Channel
      options: {
        inputAttributes: {
          class:
            "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "column-values": {
      type: "string",
      enum: [],
      default: "Revenue",
      //Revenue
      title: "Value Column(s)",
      options: {
        inputAttributes: {
          class:
            "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    aggregation: {
      type: "string",
      title: "Aggregation Function",
      enum: ["Sum", "Mean", "Count",'Min','Max'],
      default: "Sum",
      options: {
        inputAttributes: {
          class:
            "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    title: {
      type: "string",
      title: "Chart Title",
      options: {
        inputAttributes: {
          class:
            "w-full bg-transparent outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    subtitle: {
      type: "string",
      title: "Chart Subtitle",
      options: {
        inputAttributes: {
          class:
            "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "x-axis-label": {
      type: "string",
      title: "X-Axis Label",
      options: {
        inputAttributes: {
          class:
            "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "y-axis-label": {
      type: "string",
      title: "Y-Axis Label",
      options: {
        inputAttributes: {
          class:
            "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "legend-position": {
      type: "string",
      title: "Legend Position",
      enum: ["none", "left", "right"],
      default: "right",
      options: {
        inputAttributes: {
          class:
            "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "line-style": {
        type: "string",
        title: "Line Style",
        enum: ["solid", "dashed", "dotted"],
        default: "solid",
        options: {
          inputAttributes: {
            class:
              "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
          },
          containerAttributes: {
            class: "mt-2 text-sm text-gray-600 font-bold",
          },
        },
      },
      "simbol-size": {
        type: "number",
        title: "Simbol Size",
       
        default:5,
        options: {
          inputAttributes: {
            class:
              "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
          },
          containerAttributes: {
            class: "mt-2 text-sm text-gray-600 font-bold",
          },
        },
      },
    "color-scale": {
      type: "string",
      title: "Color Scale",
      enum: [
        "Viridis",
        "YlGnBu",
        "Inferno",
        "Magma",
        "Plasma",
        "Warm",
        "Cool",
        "CubehelixDefault",
        "BuGn",
        "BuPu",
        "GnBu",
        "OrRd",
        "PuBuGn",
        "PuBu",
        "PuRd",
        "RdPu",
        "YlGn",
        "YlOrBr",
        "YlOrRd",
        "Turbo",
        "Cividis",
        "Rainbow",
        "Sinebow",
        "Blues",
        "Greens",
        "Greys",
        "Purples",
        "Reds",
        "Spectral",
        "RdYlGn",
        "RdYlBu",
        "RdGy",
        "RdBu",
        "PiYG",
        "PRGn",
        "PuOr",
        "BrBG",
        "Custom",
      ],
      default: "Red",
      options: {
        inputAttributes: {
          class:
            "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "color-primary": {
      type: "string",
      format: "color",
      title: "Color Primary",

      options: {
        inputAttributes: {
          class:
            "w-20 h-12 bg-transparent text-blue-gray-700 outline-none focus:outline-none transition-all border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-xl focus:border-gray-300 cursor-pointer",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "color-secundary": {
      type: "string",
      format: "color",
      title: "Color Secondary",
      options: {
        inputAttributes: {
          class:
            "w-20 h-12 bg-transparent text-blue-gray-700 outline-none focus:outline-none transition-all border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-xl focus:border-gray-300 cursor-pointer",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },
    "line-type": {
        type: "string",
        title: "Line Type",
        enum: ["smooth", "normal"],
        default: "normal",
        options: {
          inputAttributes: {
            class: "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
          },
          containerAttributes: {
            class: "mt-2 text-sm text-gray-600 font-bold",
          },
        },
      },
    "show-labels": {
      type: "string",
      title: "Marks Labels",
      enum: ["true", "false"],
      default: "false",
      options: {
        inputAttributes: {
          class:
            "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
        },
        containerAttributes: {
          class: "mt-2 text-sm text-gray-600 font-bold",
        },
      },
    },

    
    // "show-background": {
    //   type: "boolean",
    //   format: "bool",
    //   title: "Show Background",
    //   options: {
    //     inputAttributes: {
    //       class:
    //         "w-20 h-12 bg-transparent text-blue-gray-700 outline-none focus:outline-none transition-all border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-xl focus:border-gray-300 cursor-pointer",
    //     },
    //     containerAttributes: {
    //       class: "mt-2 text-sm text-gray-600 font-bold",
    //     },
    //   },
    // },
  },
}
