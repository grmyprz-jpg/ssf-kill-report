let joueurs = [
{name:"Jeremy",kills:0},
{name:"Player2",kills:0},
{name:"Player3",kills:0},
{name:"Player4",kills:0},
{name:"Player5",kills:0},
];

function afficher(){

joueurs.sort((a,b)=>b.kills-a.kills);

let html="";

joueurs.forEach((j,index)=>{

html+=`
<tr>
<td>${index+1}</td>
<td>${j.name}</td>
<td>${j.kills}</td>
<td>
<button onclick="add(${index})">+</button>
<button onclick="removeKill(${index})">-</button>
</td>
</tr>
`;

});

document.getElementById("players").innerHTML=html;

localStorage.setItem("kills",JSON.stringify(joueurs));

}

function add(i){
joueurs[i].kills++;
afficher();
}

function removeKill(i){
if(joueurs[i].kills>0){
joueurs[i].kills--;
}
afficher();
}

if(localStorage.getItem("kills")){
joueurs=JSON.parse(localStorage.getItem("kills"));
}

afficher();
