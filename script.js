// ======================================
// SSF Kill Tracker v1.0
// ======================================

let players = JSON.parse(localStorage.getItem("ssf_players"));

if (!players) {

players = [

{
name:"NoHereSmall",
startKills:0,
currentKills:0
},

{
name:"Alpharius XX",
startKills:0,
currentKills:0
},

{
name:"Stark58000",
startKills:0,
currentKills:0
},

{
name:"Sweet Melora",
startKills:0,
currentKills:0
},

{
name:"sir mojo",
startKills:0,
currentKills:0
},

{
name:"Darkssade",
startKills:0,
currentKills:0
},

{
name:"El Sirocco",
startKills:0,
currentKills:0
},

{
name:"Rp88",
startKills:0,
currentKills:0
},

// Les autres joueurs seront ajoutés ici
];

savePlayers();

}

function savePlayers(){
localStorage.setItem("ssf_players",JSON.stringify(players));
}

function gain(player){
return player.currentKills-player.startKills;
}

function renderPlayers(){

const tbody=document.getElementById("playerTable");

tbody.innerHTML="";

players.sort((a,b)=>gain(b)-gain(a));

players.forEach((player,index)=>{

tbody.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${player.name}</td>

<td>${player.startKills.toLocaleString()}</td>

<td>${player.currentKills.toLocaleString()}</td>

<td style="color:#ff4444;font-weight:bold">

+${gain(player).toLocaleString()}

</td>

<td>

<button onclick="editPlayer(${index})">

Modifier

</button>

</td>

</tr>

`;

});

}

function editPlayer(index){

let valeur=prompt(

"Nouveau total de kills",

players[index].currentKills

);

if(valeur===null)return;

players[index].currentKills=parseInt(valeur);

savePlayers();

renderPlayers();

}

window.onload=renderPlayers;
