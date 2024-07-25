export const formSchema = {
  title: "Line Plot Customization",
  type: "object",
  options: {
    inputAttributes: {
      class: "w-full mt-1 rounded-lg p-2 h-12",
    },
  },
  properties: {
    "chart-title": {
        type: "string",
        title: "Chart Title",
        options: {
          inputAttributes: {
            class: "mt-3 w-full p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
    },
    "chart-subtitle": {
        type: "string",
        title: "Chart Subtitle",
        options: {
          inputAttributes: {
            class: "mt-3 w-full p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
    },
    "chart-x-axis-label": {
        type: "string",
        title: "X Axis Label",
        options: {
          inputAttributes: {
            class: "mt-3 w-full p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
    },
    "chart-y-axis-label": {
        type: "string",
        title: "Y Axis Label",
        options: {
          inputAttributes: {
            class: "mt-3 w-full p-2 border rounded-md",
          },
          containerAttributes: {
            class: "mt-2 text-sm font-bold",
          },
        },
    },
    "chart-show-legend": {
        type: "boolean",
        title: "Show Legend",
        format: "customBoolean",
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
    "chart-show-zoom": {
        type: "boolean",
        title: "Show Data Zoom",
        format: "customBoolean",
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
    "dynamicForms": {
        type: "array",
        title: "Series",
        items: {
          type: "object",
          properties: {
            "series-title": {
              type: "string",
              title: "Series Title",
              options: {
                inputAttributes: {
                  class: "w-full h-12 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm py-1 px-2 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-column-category": {
              type: "string",
              title: "Column Category",
              format: "tagify",
              enum: [],
              maxtags: 1,
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-column-values": {
              type: "string",
              title: "Column Values",
              enum: [],
              format: "tagify",
              maxtags: 1,
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-aggregation": {
              type: "string",
              title: "Aggregation",
              enum: ["Sum", "Mean", "Min", "Max", "Count"],
              format: "tagify",
              maxtags: 1,
              options: {
                inputAttributes: {
                  class: "w-full mt-3 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-symbol-size": {
              type: "number",
              title: "Marker Size",
              format: "slider",
              min: 1,
              max: 20,
              step: 1,
              options: {
                inputAttributes: {
                  class: "w-full mt-3 p-2",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-line-type": {
              type: "string",
              title: "Line Type",
              enum: ["Normal", "Smooth"],
              format: "tagify",
              maxtags: 1,
              options: {
                inputAttributes: {
                  class: "w-full mt-3 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-line-style": {
              type: "string",
              title: "Line Style",
              enum: ["Solid", "Dashed", "Dotted"],
              format: "tagify",
              maxtags: 1,
              options: {
                inputAttributes: {
                  class: "w-full mt-3 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-color-line": {
              type: "string",
              format: "color",
              title: "Line Color",
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-show-area": {
              type: "boolean",
              title: "Show Area",
              format: "customBoolean",
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
          "series-color-area": {
              type: "string",
              format: "color",
              title: "Area Color",
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
          "series-show-labels": {
            type: "boolean",
            title: "Show Data Labels",
            format: "customBoolean",
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
        "series-colorspace-marker": {
              type: "string",
              title: "Marker Color Space",
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
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
        "series-primary-color-marker": {
              type: "string",
              format: "color",
              title: "Marker Color Primary",
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
                },
                containerAttributes: {
                  class: "mt-2 text-sm text-gray-600 font-bold",
                },
              },
            },
            "series-secondary-color-marker": {
              type: "string",
              format: "color",
              title: "Marker Color Secondary",
              options: {
                inputAttributes: {
                  class: "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
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
  'chart-show-legend': 'hide',
  'chart-show-labels': 'hide',
  'chart-show-zoom': 'hide',
  dynamicForms: [{ 
    'series-title': '', 
    'series-column-category': '', 
    'series-column-values': '', 
    'series-aggregation': '', 
    'series-primary-color-marker': '', 
    'series-secondary-color-marker': '',
    'series-color-line': '#3A9BDC',
    'series-color-area': '#3A9BDC',
    'series-show-area': 'hide',
    'series-show-labels': 'hide',
    'series-symbol-size': 10
  }],
};
