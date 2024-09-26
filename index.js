// Importar las clases necesarias de discord.js
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');

// Reemplaza 'TU_TOKEN_AQUÍ' y 'TU_CLIENT_ID_AQUÍ' con las variables de entorno
const TOKEN = process.env.DISCORD_TOKEN; 
const CLIENT_ID = process.env.CLIENT_ID;

// Crear una nueva instancia del cliente de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds // Permite que el bot se conecte a los servidores
    ]
});

// Definir los comandos
const commands = [
    {
        name: 'roll',
        description: 'Tira un dado y devuelve un número entre 1 y 10'
    }
];

// Registrar los comandos en Discord
const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Iniciando la actualización de comandos de slash...');

        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
        });

        console.log('Comandos de slash actualizados correctamente.');
    } catch (error) {
        console.error(error);
    }
})();

// Evento que se activa cuando el bot se conecta
client.once(Events.ClientReady, () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

// Evento que se activa cuando se usa un comando de interacción
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'roll') {
        const result = Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10
        await interaction.reply(`Tiraste un dado y obtuviste un ${result}!`);
    }
});

// Iniciar sesión en Discord con el token del bot
client.login(TOKEN);
