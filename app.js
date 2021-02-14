require('dotenv').config();
const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env.TOKEN_TELEGRAM_BOT);
const Controller = require('./controller');

//#########################################################################
// Escucha mensajes directos con el chat del bot
//#########################################################################
slimbot.on('message', async(message) => {
    // reply when user sends a message
    var respuesta = Controller.controlMessage(message.text);
    if (respuesta) {
        if (respuesta.tipo) {
            var resp = await Controller.todo(respuesta.tipo);
            slimbot.sendMessage(message.chat.id, resp, respuesta.parametros);
        } else {
            slimbot.sendMessage(message.chat.id, respuesta.texto, respuesta.parametros);
        }
    }
});

//#########################################################################
// Escucha mensajes en grupos en los que este agregado el bot
//#########################################################################
slimbot.on('channel_post', async message => {
    // reply when user sends a message
    var respuesta = Controller.controlMessage(message.text);
    if (respuesta) {
        if (respuesta.tipo) {
            var resp = await Controller.todo(respuesta.tipo);
            slimbot.sendMessage(message.chat.id, resp, respuesta.parametros);
        } else {
            slimbot.sendMessage(message.chat.id, respuesta.texto, respuesta.parametros);
        }
    }
});

//#########################################################################
// CallBack para menús dentro del chat
//#########################################################################
slimbot.on('callback_query', async query => {
    console.log(query.data);
    var respuesta = Controller.controlMessage(query.data);
    if (respuesta) {
        if (respuesta.tipo) {
            var resp = await Controller.todo(respuesta.tipo);
            slimbot.sendMessage(query.message.chat.id, resp, respuesta.parametros);
        } else {
            slimbot.sendMessage(query.message.chat.id, respuesta.texto, respuesta.parametros);
        }
    }
});


//#########################################################################
// Call API
//#########################################################################
slimbot.startPolling();