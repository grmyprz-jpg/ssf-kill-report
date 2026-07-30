let players = [];

async function loadPlayers() {
    try {
        const saved = localStorage.getItem("ssf_players");

        if (saved) {
            players = JSON.parse(saved);
        } else {
            const response = await fetch("./joueurs.json");

            if (!response.ok) {
                throw new Error("Impossible de charger joueurs.json");
            }

            const data = await response.json();

            players = data.joueurs.map(j => ({
                nom: j.nom,
                startKills: j.kills,
                currentKills: j.kills
            }));

            savePlayers();
        }

        renderPlayers();

    } catch (e) {
        alert(e.message);
        console.error(e);
    }
}

function renderPlayers() {

    const tbody = document.getElementById("joueurs");
    tbody.innerHTML = "";

    players.forEach((player, index) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${player.nom}</td>

            <td>${player.startKills.toLocaleString("fr-FR")}</td>

            <td>
                <input
                    type="number"
                    value="${player.currentKills}"
                    onchange="updateKills(${index}, this.value)">
            </td>
        `;

        tbody.appendChild(tr);

    });

}

function updateKills(index, value) {

    value = parseInt(value);

    if (isNaN(value)) value = 0;

    players[index].currentKills = value;

    savePlayers();

}

function savePlayers() {

    localStorage.setItem(
        "ssf_players",
        JSON.stringify(players)
    );

}

function resetWeek() {

    if (!confirm("Réinitialiser la semaine ?"))
        return;

    players.forEach(player => {

        player.startKills = player.currentKills;

    });

    savePlayers();

    renderPlayers();

}

document.getElementById("saveBtn").addEventListener("click", () => {

    savePlayers();

    alert("Sauvegarde effectuée.");

});

document.getElementById("resetBtn").addEventListener("click", resetWeek);

window.onload = loadPlayers;
