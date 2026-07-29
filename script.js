// ===========================
// SSF Kill Report
// ===========================

let players = JSON.parse(localStorage.getItem("players")) || [];

function savePlayers() {
    localStorage.setItem("players", JSON.stringify(players));
}

function renderPlayers() {
    const tbody = document.getElementById("playerTable");
    tbody.innerHTML = "";

    players.sort((a, b) => b.current - a.current);

    players.forEach((player, index) => {
        const gain = player.current - player.start;

        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.start.toLocaleString()}</td>
            <td>${player.current.toLocaleString()}</td>
            <td style="color:#ff4444;font-weight:bold;">
                +${gain.toLocaleString()}
            </td>
            <td>
                <button onclick="updatePlayer(${index})">✏️</button>
                <button onclick="deletePlayer(${index})">🗑️</button>
            </td>
        </tr>
        `;
    });
}

function addPlayer() {
    const name = document.getElementById("name").value.trim();
    const kills = Number(document.getElementById("kills").value);

    if (!name || isNaN(kills)) {
        alert("Remplis tous les champs.");
        return;
    }

    players.push({
        name: name,
        start: kills,
        current: kills
    });

    savePlayers();
    renderPlayers();

    document.getElementById("name").value = "";
    document.getElementById("kills").value = "";
}

function updatePlayer(index) {
    const newKills = prompt(
        "Nouveau total de kills :",
        players[index].current
    );

    if (newKills === null) return;

    players[index].current = Number(newKills);

    savePlayers();
    renderPlayers();
}

function deletePlayer(index) {
    if (confirm("Supprimer ce joueur ?")) {
        players.splice(index, 1);

        savePlayers();
        renderPlayers();
    }
}

window.onload = renderPlayers;
