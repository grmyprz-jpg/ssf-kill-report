let players = [];

async function loadPlayers() {
    try {
        const response = await fetch("joueurs.json");
        const data = await response.json();

        players = data.joueurs.map(joueur => ({
            name: joueur.nom,
            startKills: joueur.kills,
            currentKills: joueur.kills
        }));

        renderPlayers();

    } catch (error) {
        alert("Erreur lors du chargement de joueurs.json");
        console.error(error);
    }
}

function renderPlayers() {
    const tbody = document.getElementById("joueurs");
    tbody.innerHTML = "";

    players.forEach((player, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.startKills}</td>
            <td>${player.currentKills}</td>
            <td>${player.currentKills - player.startKills}</td>
            <td><button onclick="editPlayer(${index})">Modifier</button></td>
        `;

        tbody.appendChild(tr);
    });
}

function editPlayer(index) {
    const valeur = prompt("Nouveau nombre de kills :", players[index].currentKills);

    if (valeur === null) return;

    const nombre = parseInt(valeur, 10);

    if (isNaN(nombre)) {
        alert("Veuillez entrer un nombre valide.");
        return;
    }

    players[index].currentKills = nombre;
    renderPlayers();
}

function resetWeek() {
    players.forEach(player => {
        player.startKills = player.currentKills;
    });

    renderPlayers();
}

window.onload = loadPlayers;
