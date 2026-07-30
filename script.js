// ======================================
// SSF Kill Tracker v2.1
// ======================================

let players = [];

async function loadPlayers() {
    try {
        // Toujours récupérer la dernière version du JSON
        const response = await fetch("joueurs.json?v=" + Date.now());

        if (!response.ok) {
            throw new Error("Impossible de charger joueurs.json");
        }

        const data = await response.json();

        players = data.joueurs.map(joueur => ({
            name: joueur.nom,
            startKills: joueur.kills,
            currentKills: joueur.kills
        }));

        // Restaurer les données sauvegardées
        const saved = localStorage.getItem("ssf_players");

        if (saved) {
            const savedPlayers = JSON.parse(saved);

            players.forEach(player => {
                const ancien = savedPlayers.find(p => p.name === player.name);

                if (ancien) {
                    player.startKills = ancien.startKills;
                    player.currentKills = ancien.currentKills;
                }
            });
        }

        savePlayers();
        renderPlayers();

    } catch (e) {
        alert("Erreur : " + e.message);
        console.error(e);
    }
}

function savePlayers() {
    localStorage.setItem("ssf_players", JSON.stringify(players));
}

function gain(player) {
    return player.currentKills - player.startKills;
}

function renderPlayers() {

    const tbody = document.getElementById("joueurs");

    tbody.innerHTML = "";

    players.sort((a, b) => gain(b) - gain(a));

    players.forEach((player, index) => {

        const ligne = document.createElement("tr");

        ligne.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.startKills.toLocaleString("fr-FR")}</td>
            <td>${player.currentKills.toLocaleString("fr-FR")}</td>
            <td style="color:red;font-weight:bold;">
                +${gain(player).toLocaleString("fr-FR")}
            </td>
            <td>
                <button onclick="editPlayer(${index})">
                    Modifier
                </button>
            </td>
        `;

        tbody.appendChild(ligne);
    });
}

function editPlayer(index) {

    let valeur = prompt(
        "Nouveau total de kills :",
        players[index].currentKills
    );

    if (valeur === null) return;

    valeur = valeur.replace(/\s/g, "");

    if (isNaN(valeur) || valeur === "") {
        alert("Nombre invalide");
        return;
    }

    players[index].currentKills = Number(valeur);

    savePlayers();
    renderPlayers();
}

function resetWeek() {

    if (!confirm("Réinitialiser les kills de départ ?")) return;

    players.forEach(player => {
        player.startKills = player.currentKills;
    });

    savePlayers();
    renderPlayers();
}

window.onload = loadPlayers;
