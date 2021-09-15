exports.bookSchema =
{
    type: 'object',
    required: ["title", "authors","descriptions","price","isbn"],
    properties: {
        title: { type: "string" },
        authors: {
            type: "array",
            items: {type : "string"}
        },
        description: {type: "string" },
        details: {
            type: 'object',
            properties: {
                pages: {
                    type: "integer",
                    minimum: 1,
                    maximum: 10000,
                },
                language: {
                    type: "string",
                    enum: ["English", "Traditional Chinese", "Simpify Chinese"]
                }
            }
        },
        price: { type: "number"},
        isbn: { type: "string"}
    }
}