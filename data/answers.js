exports.respuestas = [{
        mensajes: ["/all", "/todo", "/consulta", "/consultar", "/nodo"],
        respuesta: {
            texto: "De qué NODO buscas información ?",
            parametros: {
                parse_mode: "Markdown",
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: "Nodo 1 - Smart Environment", callback_data: "/nodo1All" }],
                        [{ text: "Nodo 2 - Smart Water", callback_data: "/nodo2All" }]
                    ],
                }),
            },
        },
    },
    {
        mensajes: ["/nodo1", "/nodoUNO"],
        respuesta: {
            texto: "Selecciona el parámetro que desea consultar del *Nodo 1 - Smart Environment*",
            parametros: {
                parse_mode: "Markdown",
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: "Consultar Todo", callback_data: "/nodo1All" }],
                        [
                            { text: "Temperatura", callback_data: "/tempN1" },
                            { text: "Humedad", callback_data: "hum" },
                            { text: "Presión", callback_data: "pres" },
                        ],
                        [
                            { text: "CO", callback_data: "/co" },
                            { text: "Ozono", callback_data: "day" },
                        ],
                        [
                            { text: "SO2", callback_data: "how" },
                            { text: "NO2", callback_data: "are" }
                        ],
                    ],
                }),
            },
        },
    },
    {
        mensajes: ["/nodo1All"],
        respuesta: {
            texto: '',
            parametros: { parse_mode: "Markdown" },
            tipo: 10
        }
    },
    {
        mensajes: ["/nodo2All"],
        respuesta: {
            texto: 'Upps!! de momento no tenemos datos sobre este nodo :(, esperamos pronto poder brindarte la información que buscas :)',
            parametros: { parse_mode: "Markdown" },
            // tipo: 1
        }
    },
    {
        mensajes: ["/tempN1", "/temperaturaN1", "/temperaturaNodo1"],
        respuesta: {
            texto: "",
            parametros: { parse_mode: "Markdown" },
            tipo: 1
        },
    },
    {
        mensajes: ["/co", "/monoxido", "/carbono"],
        respuesta: {
            texto: "",
            parametros: { parse_mode: "Markdown" },
            tipo: 7
        },
    }
];