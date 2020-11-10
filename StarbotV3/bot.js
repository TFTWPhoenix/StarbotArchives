var mf = require("mineflayer");
var crypto = require("crypto");
const readline = require('readline');
const bodyParser = require("body-parser");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var perm = 0;
var lockno = 0;
var lockedPlayers = [];
var loggedInUsers = [];
var authedBotIds = [];
var bots = [];
var nick = "ConsoleUser";

var starbot = mf.createBot({

    host: "kaboom.pw",
    port: 25565,
    username: "§bStarbotV3.1",
    version: false,

});
rl.on('line', function(line) {

    if(line.startsWith("/nick ")) {

        nick = line.split("/nick ")[1];

    } else {

        starbot.chat("&6[Chat] &d" + nick +"&8> &r" + line);

    }

});
starbot.on('spawn', function() {

    bots.push("SBMain");
    starbot.chat("&bStarbot v3 \"&dVivid Sea&b\" has started!");
    
    setTimeout(function() {

        starbot.chat("/c on");

        setTimeout(function() {

            setInterval(function() {starbot.chat("&bStarbot prefix is &d$ &7- &btype &d$help &bfor a list of commands!")},300000);

        },500);



    },500);



});
starbot.on('chat', function(username, message) {


    if(username == "TFTWPhoenix" && loggedInUsers.includes("TFTWPhoenix")) {

        perm = 10;

    } else if (username == "maniaplay" && loggedInUsers.includes("maniaplay")) {

        perm = 6;

    } else if (username == "riiz0r" && loggedInUsers.includes("riiz0r")) {

        perm = 5;

    } else if (username == "Quad" && loggedInUsers.includes("Quad") || username == "QuadraticKid" && loggedInUsers.includes("QuadracticKid")) {

        perm = 9;

    } else if (username == "IamNobleReal" && loggedInUsers.includes("IamNobleReal")) {

        perm = 4;

    } else if (username == "bb41a64a33fe01fb" && loggedInUsers.includes("bb41a64a33fe01fb")) {

        perm = 4;

    } else if (username == "ShamefulMilk") {

        perm = -1;

    } else {

        perm = 0;

    }

    
    if(perm == -1) {

        starbot.chat("&4" + username + "&c, you are blacklisted.");

    } else if(message == "$help") {

        starbot.chat("&bStarbot Commands: &dhelp, perm, login, logout, loginstatus, shamelessplug, oof, sudo, ping, &cban, lock, connect");

    } else if (message.startsWith("$ban ") && perm >= 5) {

        if(message.split("$ban ")[1] != "TFTWPhoenix" || message.split("$ban ")[1] != "maniaplay") {

            starbot.chat("&bBanning &c" + message.split("$ban ")[1] + "&b!");
            var banbot = mf.createBot({ host: "kaboom.pw", port: 25565, username: message.split("$ban ")[1], version: false});
            
            banbot.on('spawn', function() { 
                bots.push("BanBot-" + banbot.username);
                banbot.chat("&cThis account has been banned by Starbot v3!") 
                setTimeout(function() {banbot.chat("/v on");},500);
            
            });

        }



    } else if (message.startsWith("$lock ") && perm >= 5) {

        if(message.split("$lock ")[1] != "TFTWPhoenix" || message.split("$lock ")[1] != "Quad" || message.split("$lock ")[1] != "QuadraticKid") {

            starbot.chat("&bLocking &c" + message.split("$ban ")[1] + "&b!");
            var lockbot = mf.createBot({ host: "kaboom.pw", port: 25565, username: "SBVividLock" + lockno, version: false});
            
            lockbot.on('spawn', function() { 
                
                bots.push("SBVividLock" + lockno);
                lockbot.chat("/deop " + message.split("$lock ")[1]); 
                setTimeout(function() {

                    lockbot.chat('/setblock ~ ~-1 ~ command_block{Command:"sudo ' + message.split("$lock ")[1] + ' v off",auto:1b}');
                    setTimeout(function() {

                        lockbot.chat("/icu control " + message.split("$lock ")[1]);

                    },500);

                },500);                
                lockedPlayers.push(message.split("$lock ")[1]);

            });

        } else {

            starbot.chat("&4" + message.split("$lock ")[1] + "&b is a protected user therefore 'lock' is an invalid action!");

        }

        lockno++;

    } else if (message == "$listauthedbotids" && perm >= 2) {

        starbot.chat("&bAuthed bot ids: &d" + authedBotIds.toString());

    } else if (message == "$login") {

        if(username == "TFTWPhoenix") {

            starbot.chat("&4[&cStarSecure&4] &bPending login authorization from console!");
            rl.question("Authorize Login for TFTWPhoenix (y/N) ", function(answer) {

                if(answer == "" || answer.toUpperCase() == "N") {

                    starbot.chat("&cAuthorization denied from console.");

                } else if (answer.toUpperCase() == "Y") {

                    starbot.chat("&aAuthorization approved.");
                    loggedInUsers.push(username);

                }

            });

        } else {

            loggedInUsers.push(username);

        }

    } else if (message == "$logout") {

        var i = 0;
        while(i < loggedInUsers.length) {

            if(loggedInUsers[i] == username) {

                loggedInUsers[i] = "#0";

            }
            i++;

        }

    } else if (message == "$loginstatus") {

        if(loggedInUsers.includes(username)) {

            starbot.chat("&bLogin Status: &aLogged In!");

        } else {

            starbot.chat("&bLogin Status: &cLogged Out!");

        }

    }
    else if (message == "$perm") {

        starbot.chat("&d" + username + "&b, you have permission level &a" + perm + "&b!");

    }
    else if (message == "boomer") {

        starbot.chat("&d" + username + " &bno u");

    } else if (message == "$shamelessplug") {

        starbot.chat("&dhttps://github.com/TFTWPhoenix");

    }else if (message == "$restart" && perm >= 9) {

        stop();

    } else if (message == "$ping") {

        starbot.chat("Pong. What do you want from me?");

    } else if (message == "$bots") {

        starbot.chat("&bLogged In Bots (" + bots.length + "): &d " + bots.toString());

    } else if (message.startsWith("$connect ") && perm >= 4) {

        var bot = mf.createBot({

            username: message.split("$connect ")[1],
            host:"kaboom.pw",
            port:25565,
            version:false

        });
        bot.on('spawn', function() {

            bots.push(bot.username);

        });
        bot.on('chat', function(username, message) {

            console.log("[" + bot.username + "/Chat] " + username + ": " + message);
            if(message.startsWith("$sudo " + bot.username + " ")) {

                bot.chat(message.split("$sudo " + bot.username + " ")[1]);

            }

        });

    } else if (message.startsWith("$sudo ")) {

        starbot.chat("&bMaking &d" + message.split(" ")[1] + " &brun: &a" + message.split("$sudo " + message.split(" ")[1] + " "));

    } else if (message == "$oof") {

        starbot.chat("&c&lOOF");

    } else if (message == "/tpall" || message == "/tp @a @p" || message == "/tp @a @s") {

        starbot.chat("/deop " + username);
        setTimeout(function() {starbot.chat("&c[Server Integrity Protection] &4" + username + "&c do not use /tpall!")}, 500);

    }




    else if (message.startsWith("$") && !message.startsWith("$sudo")) {

        starbot.chat("&bUnknown command: " + message.replace("$",""));

    } else if (message.includes("deop TFTWPhoenix") && message.startsWith("/")) {

        starbot.chat("/op TFTWPhoenix");
        setTimeout(function() {

            starbot.chat("&4TFTWPhoenix is a protected user. Therefore 'deop' is an invalid action!");


        },500);

    }

    console.info("[SBV3/Chat] " + username + ": " + message);

});
