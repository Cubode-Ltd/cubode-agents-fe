import { v4 as uuidv4 } from 'uuid';

export const formSchema = {
    title: "Bar Plot Customization",
    type: "object",
    options: {
      inputAttributes: {
        class: "w-full mt-1 rounded-lg p-2 h-12",
      },
    },
    properties: {
      chartTitle: {
        type: "string",
        title: "Chart Title",
        options: {
          inputAttributes: {
            class: "w-full p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
      },
      chartSubtitle: {
        type: "string",
        title: "Chart Subtitle",
        options: {
          inputAttributes: {
            class: "w-full p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
      },
      xAxisLabel: {
        type: "string",
        title: "X Axis Label",
        options: {
          inputAttributes: {
            class: "w-full p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
      },
      yAxisLabel: {
        type: "string",
        title: "Y Axis Label",
        options: {
          inputAttributes: {
            class: "w-full p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
      },
      showBackgroundField: {
        type: "boolean",
        title: "Show Background",
        options: {
          inputAttributes: {
            class: "w-full mt-3 p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
        enum: [
          { value: 'show', label: 'Show' },
          { value: 'hide', label: 'Hide' },
        ],
      },
      dynamicForms: {
        type: "array",
        title: "Series",
        items: {
          type: "object",
          properties: {
            seriesTitle: {
              type: "string",
              title: "Series Title",
              options: {
                inputAttributes: {
                  class: "w-full h-12 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm py-1 px-2 rounded-xl border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            columnCategory: {
              type: "string",
              title: "Column Category",
              format: "tagify",
              enum: [],
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            columnValues: {
              type: "string",
              title: "Column Values",
              enum: [],
              format: "tagify",
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            aggregation: {
              type: "string",
              title: "Aggregation",
              enum: ["Sum", "Mean", "Min", "Max"],
              format: "tagify",
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            seriesColorspace: {
              type: "string",
              title: "Color Space",
              format: "colorsDropdown",
              enum: [
                "Viridis", "YlGnBu", "Inferno", "Magma", "Plasma", "Warm", "Cool",
                "CubehelixDefault", "BuGn", "BuPu", "GnBu", "OrRd", "PuBuGn", "PuBu",
                "PuRd", "RdPu", "YlGn", "YlOrBr", "YlOrRd", "Turbo", "Cividis",
                "Rainbow", "Sinebow", "Blues", "Greens", "Greys", "Purples", "Reds",
                "Spectral", "RdYlGn", "RdYlBu", "RdGy", "RdBu", "PiYG", "PRGn", "PuOr", "BrBG",
              ],
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            seriesCustomColor1: {
              type: "string",
              format: "color",
              title: "Custom Color 1",
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            seriesCustomColor2: {
              type: "string",
              format: "color",
              title: "Custom Color 2",
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
          },
        },
      },
    },
  };
  

  export const initialValues = {
    showBackgroundField: 'show',
    dynamicForms: [{ seriesTitle: '', columnCategory: '', columnValues: '', seriesColorspace: '', seriesCustomColor1: '', seriesCustomColor2: '' }],
  };
