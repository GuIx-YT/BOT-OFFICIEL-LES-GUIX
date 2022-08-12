const { SlashCommandBuilder } = require("@discordjs/builders");

const owenerID = "741431851603722320";

const Discord = require("discord.js");
const Client = new Discord.Client({intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS
]});

Client.on("ready", async () => {
    console.log("Index en cour...");
    console.log("Les GuIx");
    console.log("Bot connecté sur " + Client.guilds.cache.size + " serveur !");

    function randomStatus() {
        let status = ["EN DEVELOPPEMENT", "Les GuIx", "!help"]
        let rstatus = Math.floor(Math.random() * status.length);

        Client.user.setActivity(status[rstatus], {type: "WATCHING"});
    }; setImmediate(randomStatus, 30)

    Client.application.commands.create(data);

    Client.guilds.cache.get("916666130209312768").commands.create(data);
    
    var row = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setCustomId("🎫ticket🎫")
            .setLabel("ouvrir un Ticket")
            .setStyle("PRIMARY")
        );

    /*Client.channels.cache.get("934335929232015370").send({content: "Appuyez sur le bouton pour ouvrir un Ticket", components: [row]});*/
    
    /*var row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Selectionnez une options de note: ")
                .addOptions([
                    {
                        label: "Hyper Cool !",
                        description: "Note le serveur Hyper Cool !",
                        value: "NOTE1"
                    },
                    {
                        label: "Il est accordé",
                        description: "Vous accordé des Serveur vous ?",
                        value: "NOTE2"
                    },
                    {
                        label: "Je ne laisse aucune chance",
                        description: "D'accord 😅",
                        value: "NOTE3"
                    }
                ])
        );

    Client.channels.cache.get("939842905194000424").send({content: "menu de selection de note: ", components: [row]});*/
});

Client.on("guildMemberAdd", member => {
    console.log("Un Membre vient d'arrivé - " + member.displayName);
    Client.channels.cache.get('937744369396633630').send("Salut <@" + member.id + ">, Bienvenus sur **Les GuIx** !");
    member.roles.add('925801759434231898');
});

Client.on("guildMemberRemove", member => {
    console.log("Un Membre vient de quitté - " + member.displayName);
    Client.channels.cache.get('1007620489033809971').send("**" + member.displayName + "** Vient de prendre son départ 👋");
});

var nbTicket = 0;

const prefix = "!";

Client.login(process.env.TOKEN);

Client.on("messageCreate", message => {
    if(message.content[0] === prefix) {
        if(message.content === prefix + "Bienvenue"){
            message.channel.send("MP correctement envoyez")
            message.author.createDM().then(channeL => {
                channeL.send("Bienvenue sur Les GuIx je te laisse faire part du le règlement du serveur Discord !");
            }).catch(console.error);
        }
    }
});

Client.on("guildMemberAdd", member => {
    member.createDM().then(channeL => {
        return channel.send("Bienvenue sur Les GuIx je te laisse faire part sur le règlement du serveur Discord ! " + member.displayName);
    }).catch(console.error);
});

var data = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Supprime les messages demander")
    .addIntegerOption(option => 
        option.setName("number")
            .setDescription("Nombre de message qui sera supprimé")
            .setRequired(true)
    );

var data = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Permé de stoppé le bot à distance")

Client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === "clear"){
            var number = interaction.options.getInteger("number");

            if(number >= 1 && number <= 100){
                interaction.channel.bulkDelete(number);
                interaction.reply({content: number + " message correctement supprimés", ephemeral: true});
            }
            else {
                interaction.reply({content: "Les messages supprimés doit être compris entre 1 et 100", ephemeral: true});
            }
        }

        if(interaction.commandName === "stop"){
            if(interaction.user.id === owenerID){
                Client.destroy();
            }
            else {
                interaction.reply({content: "Vous n'avez pas le droit éxecuter cette commande.", ephemeral: true});
            }
        }
    }

    if(interaction.isButton()){
        if(interaction.customId === "🎫ticket🎫"){
            nbTicket ++;

            interaction.guild.channels.create("ticket-" + nbTicket, {
                parent: "996384398490480701",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL]
                    },
                    {
                        id: interaction.user.id,
                        allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL]
                    }
                ]
            }).then(channel => {
                var row = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("close-ticket")
                        .setLabel("Fermer le Ticket")
                        .setStyle("DANGER")
                    );

                channel.send({content: "<@" + interaction.user.id + "> Voici votre Ticket, vous pouvez le fermer en appuyant sur le bouton", components: [row]});

                interaction.reply({content: "Ticket correctement créé", ephemeral: true});
            });
        }
        else if(interaction.customId === "close-ticket"){
            interaction.channel.setParent("996382147625627658")

            var row = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("delete-ticket")
                        .setLabel("Supprimé le Ticket des Archive")
                        .setStyle("DANGER")
                );

            interaction.message.delete();

            interaction.channel.send({content: "Supprimé le Ticket des archive: ", components: [row]});

            interaction.reply({content: "ticket archivé", ephemeral: true});
        }
        else if(interaction.customId === "delete-ticket"){
            interaction.channel.delete();
        }
    }

    if(interaction.isSelectMenu()){
        if(interaction.customId === "select"){
            console.log(interaction.values);

            if(interaction.values == "NOTE1"){
                interaction.reply({content: "Tu a noté le serveur Hyper Cool !", ephemeral: true});
            }
            else if(interaction.values == "NOTE2"){
                interaction.reply({content: "Vous accordé des Serveur vous ?", ephemeral: true});
            }
            else if(interaction.values == "NOTE3"){
                interaction.reply({content: "D'accord 😅", ephemeral: true});
            }
        }
    }
});

Client.on("messageCreate", message => {
    if(message.author.bot) return;

    if(message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
            .setTitle("Liste des commandes existantes")
            .setColor("BLUE")
            .setAuthor("GuIx", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F236x%2F82%2Fb8%2Fa0%2F82b8a0f65d49e7cef984b1e235e3ec1d.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.fr%2Fqcouvreur%2Frenard-logo%2F&tbnid=46j5lmS9WGgn6M&vet=12ahUKEwjxodjfuPP4AhULWhoKHTxbDWYQMygBegUIARDOAQ..i&docid=eagXZcY0GvazDM&w=236&h=236&q=logo%20de%20renard%20gaming&ved=2ahUKEwjxodjfuPP4AhULWhoKHTxbDWYQMygBegUIARDOAQ", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F236x%2F82%2Fb8%2Fa0%2F82b8a0f65d49e7cef984b1e235e3ec1d.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.fr%2Fqcouvreur%2Frenard-logo%2F&tbnid=46j5lmS9WGgn6M&vet=12ahUKEwjxodjfuPP4AhULWhoKHTxbDWYQMygBegUIARDOAQ..i&docid=eagXZcY0GvazDM&w=236&h=236&q=logo%20de%20renard%20gaming&ved=2ahUKEwjxodjfuPP4AhULWhoKHTxbDWYQMygBegUIARDOAQ")
            .setDescription("Commandes")
            .setThumbnail("https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F236x%2F82%2Fb8%2Fa0%2F82b8a0f65d49e7cef984b1e235e3ec1d.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.fr%2Fqcouvreur%2Frenard-logo%2F&tbnid=46j5lmS9WGgn6M&vet=12ahUKEwjxodjfuPP4AhULWhoKHTxbDWYQMygBegUIARDOAQ..i&docid=eagXZcY0GvazDM&w=236&h=236&q=logo%20de%20renard%20gaming&ved=2ahUKEwjxodjfuPP4AhULWhoKHTxbDWYQMygBegUIARDOAQ")
            .addField("!Bienvenue", "Permet de recevoir un MP de Les GuIx");

        message.reply({ embeds: [embed]});
    }
});
