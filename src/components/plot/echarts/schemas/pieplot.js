export const formSchema = {
    "title": "Bar Plot Customization",
    "type": "object",
    "options": {
        "inputAttributes": {
            "class": "w-full mt-1 rounded-lg p-2 h-12"
        },
    },
    "properties": {
        "column-category": {
            "type": "string",
            "title": "Category Column",
            "enum": [],
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "column-values": {
            "type": "string",
            "enum": [],
            "title": "Value Column(s)",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "aggregation": {
            "type": "string",
            "title": "Aggregation Function",
            "enum": ["Sum","Count"],
            "default": "Sum",
            "options": {
                "inputAttributes": {
                    "class": "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "title": {
            "type": "string",
            "title": "Chart Title",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "subtitle": {
            "type": "string",
            "title": "Chart Subtitle",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "pie-type": {
            "type": "string",
            "title": "Pie Type",
            "enum": ["Basic", "Ring", "Rose"],
            "default": "Basic",
            "options": {
                "inputAttributes": {
                    "class": "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "legend-position": {
            "type": "string",
            "title": "Legend Position",
            "enum": ["none", "left", "right"],
            "default": "right",
            "options": {
                "inputAttributes": {
                    "class": "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "color-scale": {
            "type": "string",
            "title": "Color Scale",
            "enum": [
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
            "default": "Red",
            "options": {
                "inputAttributes": {
                    "class": "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        // "show-background": {
        //     "type": "boolean",
        //     "format": "bool",
        //     "title": "Show Background",
        //     "options": {
        //       "inputAttributes": {
        //             "class": "w-20 h-12 bg-transparent text-blue-gray-700 outline-none focus:outline-none transition-all border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-xl focus:border-gray-300 cursor-pointer"
        //         },
        //         "containerAttributes": {
        //             "class": "mt-2 text-sm text-gray-600 font-bold"
        //         }
        //     }
        // }
    },
};
