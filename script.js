// ======================================
// SSF Kill Tracker v2.0
// ======================================

let players = [];

// Charger les joueurs
async function loadPlayers() {

    const savedPlayers = localStorage.getItem("ssf_players");

    if (savedPlayers) {

        players = JSON.parse(savedPlayers);

    } else {

        const response = await fetch("joueurs.json");
        const data = await response.json();

        players = data.joueurs.map(joueur => ({
            name: joueur.nom,
            startKills: joueur.kills,
            currentKills: joueur.kills
        }));

        savePlayers();
    }

    renderPlayers();
}

// Sauvegarder
function savePlayers() {
    localStorage.setItem("ssf_players", JSON.stringify(players));
}

// Calcul des gains
function gain(player) {
    return player.currentKills - player.startKills;
}

// Affichage du tableau
function renderPlayers() {

    const tbody = document.getElementById("joueurs");

    tbody.innerHTML = "";

    players.sort((a, b) => gain(b) - gain(a));

    players.forEach((player, index) => {

        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.startKills.toLocaleString()}</td>
            <td>${player.currentKills.toLocaleString()}</td>
            <td style="color:#ff4444;font-weight:bold;">
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

// Modifier les kills
function editPlayer(index) {

    let valeur = prompt(
        "Nouveau total de kills :",
        players[index].currentKills
    );

    if (valeur === null) return;

    valeur = valeur.replace(/\s/g, "");

    if (isNaN(valeur) || valeur === "") {
        alert("Veuillez entrer un nombre valide.");
        return;
    }

    players[index].currentKills = parseInt(valeur);

    savePlayers();

    renderPlayers();
}

// Réinitialiser les gains
function resetWeek() {

    if (!confirm("Réinitialiser les kills de départ pour tous les joueurs ?"))
        return;

    players.forEach(player => {
        player.startKills = player.currentKills;
    });

    savePlayers();

    renderPlayers();
}

// Lancer l'application
window.onload = loadPlayers;
