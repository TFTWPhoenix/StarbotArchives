const { get } = require("http");
var mineflayer = require("mineflayer");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var bot = mineflayer.createBot({

    host: "kaboom.pw",
    port: 25565,
    username: "StarbotV4",
    version: "1.14.4"

});
var lockno = 0;
var bannedgroup = [];
var bannedpermissions = [];
var publicpermissions = ["generic.usebot"];
var vipgroup = ["sirweaklin"];
var vippermissions = ["generic.usebot", "commands.info.whois"];
var moderatorsgroup = [];
var moderatorpermissions = ["generic.usebot", "commands.debug.test", "commands.info.whois", "commands.admin.lock"];
var adminsgroup = [];
var adminpermissions = ["generic.usebot", "commands.debug.test", "commands.info.whois", "commands.admin.lock", "commands.admin.ban"];
var debuggersgroup = [];
var debuggerpermissions = ["generic.usebot", "commands.debug.test", "commands.info.whois", "commands.admin.lock", "commands.admin.ban"];
var ownersgroup = ["TFTWPhoenix"];
var ownerpermissions = ["generic.usebot", "commands.debug.test", "commands.info.whois", "commands.admin.lock", "commands.admin.ban"];

rl.on('line', function(line) {

    if(line.startsWith("/nick ")) {

        nick = line.split("/nick ")[1];

    } else {

        bot.chat("&6[Chat] &dTFTWPhoenix&8> &r" + line);

    }

});

function getGroup(name) {

    if(bannedgroup.includes(name)) {

        return "Banned";

    } else if(vipgroup.includes(name)) {

        return "VIP";

    } else if (moderatorsgroup.includes(name)) {

        return "Moderator";

    } else if (adminsgroup.includes(name)) {

        return "Admin";

    } else if (debuggersgroup.includes(name)) {

        return "Debugger";

    } else if (ownersgroup.includes(name)) {

        return "Owner";

    } else {

        return "Default";

    }

}
function hasPermission(username, permission) {

    var group = getGroup(username);
    if(group == "Default") {

        if(publicpermissions.includes(permission)) {

            return true;

        } else {

            return false;

        }

    } else if(group == "VIP") {

        if(vippermissions.includes(permission)) {

            return true;

        } else {

            return false;

        }

    } else if(group == "Moderator") {

        if(moderatorpermissions.includes(permission)) {

            return true;

        } else {

            return false;

        }

    } else if(group == "Admin") {

        if(adminpermissions.includes(permission)) {

            return true;

        } else {

            return false;

        }

    } else if(group == "Debugger") {

        if(debuggerpermissions.includes(permission)) {

            return true;

        } else {

            return false;

        }

    } else if(group == "Owner") {

        if(ownerpermissions.includes(permission)) {

            return true;

        } else {

            return false;

        }

    } 

}

bot.on('login', function(username, message){

    bot.chat("&7Starbot &8V4 &5\"Lunar Eclipse\"&7 has started.");

});

bot.on('chat', function(username, message) {

    if(getGroup(username) != "Banned" && message.startsWith("$")) {

        if(message == "$test" && hasPermission(username, "commands.debug.test")) {

            bot.chat("&7Process is responding.");

        } else if (message == "$test") {

            bot.chat("&7Sorry! But you don't have permission to do that!");

        } else if (message == "$perm") {

            bot.chat("&7Your permissions group is: &5" + getGroup(username));

        } else if (message.startsWith("$whois ") && hasPermission(username, "commands.info.whois")) {

            bot.chat("&7SBWhoIs Lookup for &d" + message.split(" ")[1] + "&7 returned:");
            setTimeout(function(){

                bot.chat("&7Technical Name: &5" + message.split(" ")[1]);
                setTimeout(function(){

                    bot.chat("&7Permissions Group: &5" + getGroup(message.split(" ")[1]));

                },500);

            },500);

        } else if (message.startsWith("$whois")) {

            bot.chat("&7Sorry! But you don't have permission to do that!");

        } else if (message == "$help") {

            bot.chat("&7-----=====&5Starbot Help&7=====-----");
            setTimeout(function() {

                bot.chat("&7Public Commands: &5perm, help");
                setTimeout(function() {

                    bot.chat("&aVIP &7Commands: &5whois");
                    setTimeout(function() {

                        bot.chat("&3Moderator &7Commands: &5lock");
                        setTimeout(function() {

                            bot.chat("&cAdmin &7Commands: &5ban");
                            setTimeout(function() {

                                bot.chat("&6Debugger &7Commands: &5");

                            },500);


                        },500);


                    },500);


                },500);


            },500);
            

        } else if(message.startsWith("$lock ") && hasPermission(username, "commands.admin.lock")) {

            var lockbot = mineflayer.createBot({

                username: "SBLock" + lockno.toString(),
                host: "kaboom.pw",
                port: 25565,
                version: "1.14.4",

            });
            var igntolock = message.split(" ")[1];
            lockbot.on("spawn", function(){

                lockbot.chat("/deop " + message.split(" ")[1]);
                setTimeout(function() {

                    lockbot.chat("/setblock ~ ~-1 ~ command_block{Command:\"sudo " + message.split(" ")[1] + " v off\",auto:1b}");
                    setTimeout(function() {

                        lockbot.chat("/icu control " + message.split(" ")[1]);
                        setTimeout(function() {

                            lockbot.chat("/mute " + message.split(" ")[1] + " 10y Locked by Starbot");

                        },500);


                    },500);


                },500);

            });

            lockbot.on("playerLeft", function(player) {

                if(player.username == message.split(" ")[1]) {

                    lockbot.quit("Player Left");
                    console.log("[Starbot/INFO] Disconnecting lockbot. Reason: Target Disconnected!");

                }

            });



        } else if (message.startsWith("$lock ")) {

            bot.chat("&7Sorry! But you don't have permission to do that!");

        } else if (message.startsWith("$b ") && hasPermission("commands.admin.ban")) {

            var banbot = mineflayer.createBot({

                username: message.split(" ")[1],
                host: "kaboom.pw",
                port: 25565,
                version: "1.14.4"

            });
            banbot.on("login", function() {

                banbot.chat("&cThis account has been banned by Starbot.");

            });

        } else if (message.startsWith("$ban ")) {

            bot.chat("&7Sorry! But you don't have permission to do that!");

        }
    } 
    
    
    else if(message.startsWith("$")) {

        bot.chat("&7I'm sorry &c" + username + "&7, but an admin has banned you from using Starbot!");

    }

    console.log("[Minecraft/Chat] " + username + ": " + message);

});