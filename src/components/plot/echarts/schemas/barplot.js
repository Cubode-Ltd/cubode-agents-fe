export const formSchema = {
  title: "Bar Plot Customization",
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
    "chart-xaxis-label": {
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
    "chart-yaxis-label": {
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
    "chart-show-background": {
      type: "boolean",
      title: "Show Background",
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
                class: "w-full h-12 bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm py-1 px-2 rounded-md border-blue-gray-200 focus:border-gray-300",
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
                class: "w-full bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
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
                class: "w-full bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
              },
              containerAttributes: {
                class: "mt-2 text-sm text-gray-600 font-bold",
              },
            },
          },
          "series-aggregation": {
            type: "string",
            title: "Aggregation",
            enum: ["Sum", "Mean", "Min", "Max"],
            format: "tagify",
            maxtags: 1,
            options: {
              inputAttributes: {
                class: "w-full mt-3 bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
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
          "series-colorspace": {
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
                class: "w-full bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
              },
              containerAttributes: {
                class: "mt-2 text-sm text-gray-600 font-bold",
              },
            },
          },
          "series-primary-color": {
            type: "string",
            format: "color",
            title: "Color Primary",
            options: {
              inputAttributes: {
                class: "w-full bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
              },
              containerAttributes: {
                class: "mt-2 text-sm text-gray-600 font-bold",
              },
            },
          },
          "series-secondary-color": {
            type: "string",
            format: "color",
            title: "Color Secondary",
            options: {
              inputAttributes: {
                class: "w-full bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-300",
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
  'chart-show-background': 'hide',
  'chart-show-legend': 'hide',
  dynamicForms: [{ 
    'series-title': '', 
    'series-column-category': '', 
    'series-column-values': '', 
    'series-aggregation': '', 
    'series-primary-color': '', 
    'series-secondary-color': '',
    'series-show-labels': 'hide',
  }],
};
