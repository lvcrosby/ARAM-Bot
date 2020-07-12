'use strict';
// Aram Bot V 1.1

// Import the discord.js module
const Discord = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
// --------------------------------------- Variables -----------------------------------------

var championList = "";

// --------------------------------------- Time ----------------------------------------------

var d = new Date();

// --------------------------------------- Functions -----------------------------------------

function generateTeams(message){

  //Input:      Discord message object
  //Processing: Pulls 2 sets of 15 random champions from the list in champs.txt, not repeating
  //Output:     Replies to user with an embed that includes two lists of 15 champions

  //Original Champion List
  /*var strChamps = "Aatrox;Ahri;Akali;Alistar;Amumu;Anivia;Annie;Aphelios;Ashe;Aurelion Sol;Azir;Bard;Blitzcrank;Brand;Braum;Caitlyn;Camille;Cassiopeia;Cho'Gath;Corki;Darius;Diana;Dr. Mundo;Draven;Ekko;Elise;Evelynn;Ezreal;Fiddlesticks;Fiora;Fizz;Galio;Gangplank;Garen;Gnar;Gragas;Graves;Hecarim;Heimerdinger;Illaoi;Irelia;Ivern;Janna;Jarvan IV; Jax;Jayce;Jhin;Jinx;Kai'Sa;Kalista;Karma;Karthus;Kassadin;Katarina;Kayle;Kayn;Kennen;Kha'Zix;Kindred;Kled;Kog'Maw;LeBlanc;Lee Sin;Leona;Lissandra;Lucian;Lulu;Lux;Malphite;Malzahar;Maokai;Master Yi;Miss Fortune;Mordekaiser;Morgana;Nami;Nasus;Nautilus;Neeko;Nidalee;Nocturne;Nunu & Willump;Olaf;Orianna;Ornn;Pantheon;Poppy;Pyke;Qiyana;Quinn;Rakan;Rammus;Rek'Sai;Renekton;Rengar;Riven;Rumble;Ryze;Sejuani;Senna;Sett;Shaco;Shen;Shyvana;Singed;Sion;Sivir;Skarner;Sona;Soraka;Swain;Sylas;Syndra;Tahm Kench;Taliyah;Talon;Taric;Teemo;Thresh;Tristana;Trundle;Tryndamere;Twisted Fate;Twitch; Udyr;Urgot;Varus;Vayne;Veigar;Vel'Koz;Vi;Viktor;Vladimir;Volibear;Warwick;Wukong;Xayah;Xerath;Xin Zhao;Yasuo;Yorick;Yuumi;Zac;Zed;Ziggs;Zilean;Zoe;Zyra";
  */

  var fs = require('fs');
  var strChamps = fs.readFileSync('champs.txt', (err, data) => {
      return data.toString();
  });
  strChamps = strChamps + "";
  var arrChamps = strChamps.split(",");
  var team1 = " ";
  var team2 = " ";
  var arrSelectedChamps = [];
  for (var i = 0; i < 15; i++){
    var tempchamp = Math.floor(Math.random() * (148 - i));
    arrSelectedChamps.push(arrChamps[tempchamp]);
    arrChamps.splice(tempchamp, 1);
  }// end for loop

  arrSelectedChamps.sort();
  var j = 0;
  arrSelectedChamps.forEach((item, i) => {
    if(i < (arrSelectedChamps.length - 1)){
      team1 = team1.concat(arrSelectedChamps[i] + ", ");
    }else{
      team1 = team1.concat(arrSelectedChamps[i] + ".\n");
    }// end if/else
    if(j == 4 || j == 9){
      team1 = team1.concat("\n");
    }//end if
    j++;
  });//end forEach

  arrSelectedChamps = [];
  for (var i = 0; i < 15; i++){
    var tempchamp = Math.floor(Math.random() * (133 - i));
    arrSelectedChamps.push(arrChamps[tempchamp]);
    arrChamps.splice(tempchamp, 1);
  }// end for loop
  j = 0;
  arrSelectedChamps.sort();
  arrSelectedChamps.forEach((item, i) => {
    if(i < (arrSelectedChamps.length - 1)){
      team2 = team2.concat(arrSelectedChamps[i] + ", ");
    }else{
      team2 = team2.concat(arrSelectedChamps[i] + ".\n");
    }// end if/else
    if(j == 4 || j == 9){
      team2 = team2.concat("\n");
    }//end if
    j++;
  });//end forEach
  const exampleEmbed = new Discord.MessageEmbed().setTitle('ARAM Inhouse Generator');

    var author = message.author;

    exampleEmbed.setColor('#73a8de');
    exampleEmbed.addField(author.username + "'s Team's Champions: ", team1);
    exampleEmbed.addField("Team 2's Champions: ", team2);
    exampleEmbed.setFooter("Created By: Noyes");
    message.reply(exampleEmbed);
    console.log("Generated teams at " + (d.getMonth() + 1) + "-" + d.getDay() + "-" + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "\n" + team1 + "\n" + team2);
}//end generateTeams()

function addChampion(champ, message){

  //Input:      String champ with name of champion to be added to list of champions
  //Processing: Adds champ to the list of champions
  //Output:     Returns new list of champs, or an error message

  var arrChampionList = [];

  try{

    var fs = require('fs');
    championList = fs.readFileSync('champs.txt', (err, data) => {
        return data.toString();
    });

    championList = championList + "";
    arrChampionList = championList.split(",");
    arrChampionList.push(champ);
    arrChampionList.sort();


    fs.writeFile('champs.txt', arrChampionList.toString(), function (err){
      if (err) throw err;
      console.log("Successfully added champion " + champ + " to the file.");
    });
  }
  catch(err){
    console.log(err.message);
    return "Error adding champion to list, check console for error.";
  }
  const embed = new Discord.MessageEmbed().setTitle("Success");
  embed.setColor('#73a8de');
  embed.addField("Successfully added champion " + champ + " to the list of champions.", " Type '!aram list' to view the full list of champions.");
  embed.setFooter("Created by: Noyes");
  message.reply(embed);
}

function removeChampion(champ, message){

  //Input:      champion name to be removed, message object
  //Processing: pulls the list from champs.txt, removes any names matching 'champ' and replaces champs.txt
  //Output:     Sends a reply to the user informing them of whether the operation was successful or not

  try{
    var fs = require('fs');
    var arrChampionList = [];
    championList = fs.readFileSync('champs.txt', (err, data) => {
      return data.toString();
    });
    var succ = false;
    championList = championList + "";
    arrChampionList = championList.split(",");
    arrChampionList.forEach((item, i) => {
      if(item === champ){
        console.log("Removed " + champ);
        arrChampionList.splice(i, 1);
        succ = true;
      }
    });

    const embed = new Discord.MessageEmbed()
    embed.setColor('#73a8de');

    if(succ){
      fs.writeFile('champs.txt', arrChampionList.toString(), function (err){
        if (err) throw err;
        console.log("Successfully removed all instances of " + champ + " from the champion list.");
      });
      embed.setTitle("Success");
      embed.addField("Successfully removed " + champ + " from the list of champions.", "Type '!aram list' to view the full list of champions.");
    }else{

        embed.setTitle("Unsuccessful");
        embed.addField("There were no instances of " + champ + " in the list of champions. ", "Type '!aram list' to view the full list of champions.");
        console.log("Unsuccessfull. No instances of " + champ + " were found.");
    }// end if/else succ
    embed.setFooter("Created by: Noyes");
    message.reply(embed);
  } catch(err){
    console.log(err);
    return "Error removing champion from the list, check console for error.";
  }//end try catch
}//end function removeChampion

function listChampions(message){
  var aramList = "";
  championList = "";
  var arrChampionList = [];
  var fs = require('fs');
  championList = fs.readFileSync('champs.txt', (err, data) => {
    return data.toString();
  });
  championList = championList + "";
  arrChampionList = championList.split(",");
  var strChampList = " ";
  arrChampionList.forEach((item, i) => {
    strChampList = strChampList + arrChampionList[i];
    if((i + 1) < arrChampionList.length){
      strChampList = strChampList + ", ";
    }
    if((i + 1) === arrChampionList.length){
      strChampList = strChampList + ".";
    }
  });
  message.reply("All champions included in the ARAM list: \n" + strChampList);
}

function permissionDenied(message, command){
  const embed = new Discord.MessageEmbed().setTitle("Permission Denied");
  embed.setColor("#73a8de");
  embed.addField("You do not have permission to " + command + ".", "Ask an administrator for help.");
  embed.setFooter("Created by: Noyes");
  message.reply(embed);
}//end function permissionDenied

// --------------------------------------- Event Listeners -----------------------------------

//Bot ready?
client.on('ready', () => {
  console.log('Aram Bot is ready!');
});

// chat listeners
client.on('message', message =>{
  // If message includes "!aram"
  if(message.content.indexOf("!aram" === 0)){
    var command = message.content.split(" ");
    if (command[0] === "!aram") {
      if (message.content === "!aram"){
        generateTeams(message);
      }
      if (command[1] === "list"){
        listChampions(message);
      }
      // Admin commands
      if (command[1] === "add") {
        if (message.member.hasPermission("KICK_MEMBERS")){
          if (command[2] === "champion" || command[2] === "champ"){
            var strChamp = "";
            command.forEach((item, i) => {
              if (i > 2){
                if((i + 1) === command.length){
                  strChamp = strChamp + command[i];
                }else{
                  strChamp = strChamp + command[i] + " ";
                }//end if command.length
              }
            });
            addChampion(strChamp, message);
          }//end if champion
        } else {
          permissionDenied(message, command[1]);
        }//end if/else hasPermission
      }else if(command[1] === "remove"){
        if (message.member.hasPermission("KICK_MEMBERS")){
          if(command[2] === "champion" || command[2] === "champ"){
            var strChamp = "";
            command.forEach((item, i) => {
              if (i > 2){
                if((i + 1) === command.length){
                  strChamp = strChamp + command[i];
                }else{
                  strChamp = strChamp + command[i] + " ";
                }//end if command.length
              }//end if i > 2
            });//end forEach
            removeChampion(strChamp, message);
          }//end if champ
        } else {
          permissionDenied(message, command[1]);
        }
      }//end if/else add, remove
    }//end if !aram
  }//end if indexOf
});//end client.on

// ------------------------------------- Bot Token --------------------------------------
// Log our bot in using the token from https://discordapp.com/developers/applications/me
// This determines which bot this script will be run on
client.login('BOT TOKEN HERE');
