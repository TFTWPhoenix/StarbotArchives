var mp = require("minecraft-protocol");
var translations = require("./translations.json");
var bot = mp.createClient({
  host: "kaboom.pw",
  port: 25565,
  username: "§bStarbotV3.1",
  version: "1.15.2"
});

bot.on("login", () => {
  console.log("logged in");
});

bot.on("chat", (msgData, packetInfo) => {
  var message = processMsg(JSON.parse(msgData.message));
  console.log(processMsg(JSON.parse(msgData.message)).split(": ")[1]);

});

function processMsg(data) {
    if (
      typeof data.text == "undefined" &&
      typeof data.translate !== "undefined" && 
      !(typeof data == 'string')
    ) {
      var msg = "";
  
      var translate = translations[data.translate] || data.translate;
  
      var withdata = [];
  
      if (typeof data.with !== "undefined")
        data.with.forEach(data => {
          //   console.log(data)
          withdata.push(processMsg(data));
        });
  
  
      if (typeof data.text == "undefined") data.text = "";
      if (typeof data.color == "undefined") data.color = "";
      if (typeof data.bold == "undefined") data.bold = false;
      if (typeof data.obfuscated == "undefined") data.obfuscated = false;
      if (typeof data.underlined == "undefined") data.underlined = false;
      if (typeof data.italic == "undefined") data.italic = false;
      if (typeof data.strikethrough == "undefined") data.strikethrough = false;
  
      var color = getColor(data.color);
      var bold = data.bold == true ? "" : "";
      var obfuscated = data.obfuscated == true ? "" : "";
      var underlined = data.underlined == true ? "" : "";
      var italic = data.italic == true ? "" : "";
      var strikethrough = data.strikethrough == true ? "" : "";
  

      for(var i = 0;i<(translate.match(/%s/g) || []).length+1;i++){
        var replace = typeof withdata[i] !== 'undefined'?withdata[i]:"";
        translate = translate.replace('%s',replace+color +
        bold +
        obfuscated +
        underlined +
        italic +
        strikethrough)    
    }

  
      var msg =
        color +
        bold +
        obfuscated +
        underlined +
        italic +
        strikethrough + translate
  
       if (typeof data.extra !== "undefined")
        data.extra.forEach(data => {
          msg = msg + processMsg(data);
        });
      //   console.log(msg)
        return msg;
  
        
    } else if (typeof data == 'string') {
  
        return data;
    } else {
      if (typeof data.text == "undefined") data.text = "";
      if (typeof data.color == "undefined") data.color = "";
      if (typeof data.bold == "undefined") data.bold = false;
      if (typeof data.obfuscated == "undefined") data.obfuscated = false;
      if (typeof data.underlined == "undefined") data.underlined = false;
      if (typeof data.italic == "undefined") data.italic = false;
      if (typeof data.strikethrough == "undefined") data.strikethrough = false;
  
      var color = getColor(data.color);
      var bold = data.bold == true ? "" : "";
      var obfuscated = data.obfuscated == true ? "" : "";
      var underlined = data.underlined == true ? "" : "";
      var italic = data.italic == true ? "" : "";
      var strikethrough = data.strikethrough == true ? "" : "";
  

      var msg =
        color +
        bold +
        obfuscated +
        underlined +
        italic +
        strikethrough +
        data.text;
  
      if (typeof data.extra !== "undefined")
        data.extra.forEach(data => {
          msg = msg + processMsg(data);
        });
  
      return msg;
    }
  }
const colors = {
  "reset": "",
  "white": "",
  "black": "",
  "red": "",
  "dark_red": "",
  "green": "",
  "dark_green": "",
  "light_purple": "",
  "dark_purple": "",
  "blue": "",
  "dark_blue": "",
  "aqua": "",
  "dark_aqua": "",
  "gold": "",
  "yellow": "",
  "gray": "",
  "dark_gray": ""
}
function getColor(cl) {
  return colors[cl] == undefined ? "" : colors[cl];
}
