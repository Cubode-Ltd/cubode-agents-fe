export const formSchema = {
    "title": "Bar Plot Customization",
    "type": "object",
    "options": {
        "inputAttributes": {
            "class": "w-full mt-1 rounded-lg p-2 h-12"
        },
    },
    "properties": {
        "firstName": {
            "type": "string",
            "title": "First name",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "text-sm text-gray-600 font-bold"
                }
            }
        },
        "lastName": {
            "type": "string",
            "title": "Last name",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "text-sm text-gray-600 font-bold"
                }
            }
        },
        "age": {
            "type": "integer",
            "title": "Age",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "text-sm text-gray-600 font-bold"
                }
            }
        },
        "bio": {
            "type": "string",
            "title": "Bio",
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "text-sm text-gray-600 font-bold"
                }
            }
        },
        "colorscale": {
            "type": "string",
            "title": "Color Scale",
            "enum": ["Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Pink", "Brown", "Gray", "Black"],
            "default": "Red",
            "options": {
                "inputAttributes": {
                    "class": "w-full mt-1 border border-gray-300 rounded-md p-2 h-12"
                },
            }
        },
        "password": {
            "type": "password",
            "title": "Password",
            "minLength": 3,
            "options": {
                "inputAttributes": {
                    "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                    "class": "text-sm text-gray-600 font-bold"
                }
            }
        }
    },
    "required": ["firstName", "lastName"]
};