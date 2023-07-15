const teamGroupElement = document.querySelector('.team-group');

teamData.forEach((team, index) => {
  const teamContainer = document.createElement('div');
  teamContainer.classList.add('team-container');
  teamContainer.innerHTML = `
    <div class="teamInfo" id="team-${index + 1}">
        <div class="teamName" id="team${index + 1}Name">
            <h2>${team.teamName}</h2>
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
