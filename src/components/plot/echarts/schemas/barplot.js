export const formSchema = {
    "title": "Bar Plot Customization",
    "type": "object",
    "options": {
        "inputAttributes": {
            "class": "w-full mt-1 rounded-lg p-2 h-12"
        },
    },
    "properties": {
        "column_category": {
            "type": "string",
            "title": "Category Column",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "columns_values": {
            "type": "string",
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
            "enum": ["Sum", "Mean", "Max", "Min", "Median"],
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
        "xAxisLabel": {
            "type": "string",
            "title": "X-Axis Label",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "yAxisLabel": {
            "type": "string",
            "title": "Y-Axis Label",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "legendPosition": {
            "type": "string",
            "title": "Legend Position",
            "enum": ["left", "right", "top", "bottom"],
            "default": "top",
            "options": {
                "inputAttributes": {
                    "class": "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "colorScale": {
            "type": "string",
            "title": "Color Scale",
            "enum": ["Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Pink", "Brown", "Gray", "Black"],
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
        "colorPrimary": {
            "type": "string",
            "format": "color",
            "title": "Color Primary",
            
            "options": {
                "inputAttributes": {
                    "class": "w-20 h-12 bg-transparent text-blue-gray-700 outline-none focus:outline-none transition-all border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-xl focus:border-gray-300 cursor-pointer",

                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
        "colorSecundary": {
            "type": "string",
            "format": "color",
            "title": "Color Secondary",
            "options": {
                "inputAttributes": {
                    "class": "w-20 h-12 bg-transparent text-blue-gray-700 outline-none focus:outline-none transition-all border border-blue-gray-200 focus:border-2 text-sm px-3 py-2.5 rounded-xl focus:border-gray-300 cursor-pointer"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },

        "data_source": {
            "type": "string",
            "title": "Dataset",
            "enum": [""],
            "default": "",
            "options": {
                "inputAttributes": {
                    "class": "w-full mb-4 bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "mt-2 text-sm text-gray-600 font-bold"
                }
            }
        },
    },
    // "required": ["title", "xAxisLabel", "yAxisLabel", "seriesData", "colorScale"]
};
