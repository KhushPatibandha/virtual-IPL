const teamGroupElement = document.querySelector('.team-group');

function updateTeamFunds(team, totalSpent) {
    const teamFunds = parseInt(team.teamFunds.replace(' Rs', ''));
    const remainingFunds = teamFunds - totalSpent;
    if (remainingFunds < 0) {
        team.teamFunds = `${remainingFunds} Rs`;
        team.disqualified = true;
    } else {
        team.teamFunds = `${remainingFunds} Rs`;
    }
}

teamData.forEach((team, index) => {
    const batsmanTotal = team.batsmen.reduce((acc, player) => acc + parseInt(player.playerPrice || 0), 0);
    const bowlerTotal = team.bowlers.reduce((acc, player) => acc + parseInt(player.playerPrice || 0), 0);
    const wicketKeeperTotal = team.wicketKeepers.reduce((acc, player) => acc + parseInt(player.playerPrice || 0), 0);
    const allRounderTotal = team.allRounders.reduce((acc, player) => acc + parseInt(player.playerPrice || 0), 0);

    const totalTeamPrice = batsmanTotal + bowlerTotal + wicketKeeperTotal + allRounderTotal;

    updateTeamFunds(team, totalTeamPrice);

    const teamContainer = document.createElement('div');
    teamContainer.classList.add('team-container');

    const teamName = team.disqualified ? `${team.teamName} (disqualified)` : team.teamName;

    teamContainer.innerHTML = `
        <div class="teamInfo" id="team-${index + 1}">
            <div class="teamName" id="team${index + 1}Name">
                <h2>${teamName}</h2>
                <div class="teamFunds" id="team${index + 1}Fund">
                    <h2>${team.teamFunds}</h2>
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