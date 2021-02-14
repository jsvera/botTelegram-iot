const https = require("https");
const Labels = require('./data/labels');
const { respuestas } = require('./data/answers');

exports.todo = async(op) => {
    var url = "https://api.thingspeak.com/channels/ " + process.env.CHANNEL_THINGSPEAK + "/";
    var resp = "";
    switch (op) {
        case 10: //Consultar todos los parámetros del nodo uno smart environment
            url += "feeds.json?results=1";
            break;
        case 1: //Consultar temperatura de nodo 1
            url += `fields/${op}.json?results=1`
        case 7: //Consultar monoxido de carbono CO de nodo 1
            url += `fields/${op}.json?results=1`
        default:
            break;
    }
    var data = await doRequest(url);
    resp = formatearRespuesta(op, data);
    return resp;
};

function formatearRespuesta(op, data) {
    var resp = "";
    switch (op) {
        case 10: //Consultar todos los parámetros del nodo uno smart environment
            resp = Labels.cabeceraNodo1;
            resp += "🔺 *Temperatura:* _" + (data.feeds[0].field1 || "N/A") + "_\n";
            resp += "🔹 *Humedad:* _" + (data.feeds[0].field2 || "N/A") + "_\n";
            resp += "🔻 *Presión:* _" + (data.feeds[0].field3 || "N/A") + "_\n";
            resp += "🔹 *Ozono (O3):* _" + (data.feeds[0].field4 || "N/A") + "_\n";
            resp += "🔺 *Dióxido de Azufre (SO2):* _" + (data.feeds[0].field5 || "N/A") + "_\n";
            resp += "🔹 *Dióxido Nítrico (NO2):* _" + (data.feeds[0].field6 || "N/A") + "_\n";
            resp += "🔻 *Monóxido de Carbono (CO):* _" + (data.feeds[0].field7 || "N/A") + "_\n";
            resp += "🔹 *Nivel de Batería: * _" + (data.feeds[0].field8 || "N/A") + "_\n";
            break;
        case 1: //Consultar temperatura de nodo 1
            resp = Labels.cabeceraNodo1;
            resp += "🌡``` Temperatura:``` *" + (data.feeds[0].field1 || "N/A") + "*";
            break;
        case 7:
            resp = Labels.cabeceraNodo1;
            resp += "🚗``` Monóxido de Carbono (CO):``` \t*" + (data.feeds[0].field7 || "N/A") + "*";
            break;
        default:
            break;
    }

    return resp;
}

//#########################################################################
// Función para respuestas
//#########################################################################
exports.controlMessage = (text) => {
    let found = false;
    var r = null;
    respuestas.every(opcion => {
        opcion.mensajes.every(mensaje => {
            if (text === mensaje) {
                r = opcion.respuesta;
                found = true;
                return false;
            }
            return true;
        });
        if (!found) return true;
    });
    if (!found) {
        r = { texto: 'No te entiendo :(', parametros: {} }
    }
    return r;
}

//#########################################################################
// Función para realizar peticiones https externas
//#########################################################################
function doRequest(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { rejectUnauthorized: false }, (res) => {
            res.setEncoding("utf8");
            let responseBody = "";

            res.on("data", (chunk) => {
                responseBody += chunk;
            });

            res.on("end", () => {
                resolve(JSON.parse(responseBody));
            });
        });

        req.on("error", (err) => {
            reject(err);
        });
        req.end();
    });
}