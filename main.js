document.addEventListener('DOMContentLoaded', () => {
    const teamGroupElement = document.querySelector('.team-group');
    let teamData;
  
    function renderTeam() {
        teamGroupElement.innerHTML = '';
  
        teamData.forEach((team, index) => {
            const teamContainer = document.createElement('div');
            teamContainer.classList.add('team-container');

            const totalPlayerPrice = team.batsmen.reduce((sum, player) => sum + parsePrice(player.playerPrice), 0)
            + team.bowlers.reduce((sum, player) => sum + parsePrice(player.playerPrice), 0)
            + team.wicketKeepers.reduce((sum, player) => sum + parsePrice(player.playerPrice), 0)
            + team.allRounders.reduce((sum, player) => sum + parsePrice(player.playerPrice), 0);

            let teamFunds = parseInt(parsePrice(team.teamFunds)) - totalPlayerPrice;
            const isDisqualified = teamFunds < 0;

            if (isDisqualified) {
                teamFunds = -Math.abs(teamFunds);
            }

            team.teamFunds = teamFunds.toString();

            const teamName = isDisqualified ? `${team.teamName} (disqualified)` : team.teamName;
  
            teamContainer.innerHTML = `
                <div class="teamInfo" id="team-${index + 1}">
                    <div class="teamName" id="team${index + 1}Name">
                        <h2>${teamName}</h2>
                        <div class="teamFunds" id="team${index + 1}Fund">
                            <h2>${team.teamFunds} Rs</h2>
                        </div>
                    </div>
                    <div class="Players">
                        <div class="batsman" id="team${index + 1}Batsman">
                            <h3>Batsman</h3>
                            <ul>
                                ${team.batsmen.map(player => `
                                    <li class="player">
                                        <span class="playerName">${player.playerName}</span>
                                        <span class="playerPrice">${player.playerPrice}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="bowlers" id="team${index + 1}Bowlers">
                            <h3>Bowlers</h3>
                            <ul>
                                ${team.bowlers.map(player => `
                                    <li class="player">
                                        <span class="playerName">${player.playerName}</span>
                                        <span class="playerPrice">${player.playerPrice}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="wicketKeeper" id="team${index + 1}WicketKeeper">
                            <h3>Wicket Keepers</h3>
                            <ul>
                                ${team.wicketKeepers.map(player => `
                                    <li class="player">
                                        <span class="playerName">${player.playerName}</span>
                                        <span class="playerPrice">${player.playerPrice}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="allRounder" id="team${index + 1}AllRounder">
                            <h3>All Rounders</h3>
                            <ul>
                                ${team.allRounders.map(player => `
                                    <li class="player">
                                        <span class="playerName">${player.playerName}</span>
                                        <span class="playerPrice">${player.playerPrice}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            teamGroupElement.appendChild(teamContainer);
        });
    }

    function parsePrice(price) {
        const parsedPrice = parseInt(price);
        return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
     
    // Fetch team data from data.json
    fetch('/data.json')
    .then(response => response.json())
    .then(data => {
        teamData = data;
        renderTeam(); // Render the initial team data on the webpage

        const socket = io();
  
        socket.on('data-update', updatedData => {
            teamData = updatedData;
            renderTeam();
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});