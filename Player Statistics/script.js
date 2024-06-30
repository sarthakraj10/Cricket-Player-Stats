const apiUrl1 = "https://api.cricapi.com/v1/players?apikey=0d8b69fa-a810-4093-97b3-4a264a57f189&offset=0&search=";
const apiUrl2 = "https://api.cricapi.com/v1/players_info?apikey=0d8b69fa-a810-4093-97b3-4a264a57f189&id=";
const playerName = document.querySelector("input");
async function playerStats(playerName) {
  document.querySelector(".player").innerHTML = "";
  document.getElementById('batting-stats').innerHTML = "";
  document.getElementById('bowling-stats').innerHTML = "";
  const response1 = await fetch(apiUrl1 + playerName);
  const data1 = await response1.json();
  const playerId = data1.data[0].id;
  fetch(apiUrl2 + playerId).then((data2) => {
    return data2.json();
  }).then((data3) => {
    console.log(data3);
    let playerInfo = "";
    playerInfo = `
        <h2 style="color:#00b3ff">${data1.data[0].name} - (${data1.data[0].country})</h2>
        <img src="${data3.data.playerImg}" class="img-fluid" alt="">
        <div>
          <div class="info">
            <h3 style="color:#00b3ff">Personal Information</h3>
            <table id="player-info" class="table table-hover">
              <tr>
                <th class="table-danger">Name</th>
                <td>${data3.data.name}</td>
              </tr>
              <tr>
                <th class="table-danger">Date Of Birth</th>
                <td>${(data3.data.dateOfBirth).slice(0, 10)}</td>
              </tr>
              <tr>
                <th class="table-danger">Role</th>
                <td>${data3.data.role}</td>
              </tr>
              <tr>
                <th class="table-danger">Batting Style</th>
                <td>${data3.data.battingStyle}</td>
              </tr>
              <tr>
                <th class="table-danger">Bowling Style</th>
                <td>${data3.data.bowlingStyle}</td>
              </tr>
              <tr>
                <th class="table-danger">Place Of Birth</th>
                <td>${data3.data.placeOfBirth}</td>
              </tr>
              <tr>
                <th class="table-danger">Country</th>
                <td>${data3.data.country}</td>
              </tr>
            </table>
          </div>
        </div>`;
    const stats = data3.data.stats;

    // Function to extract stats for a specific match type
    function getStatsForMatchTypeBatting(matchType) {
      const relevantStats = stats.filter(stat => stat.matchtype === matchType);
      const data = {
        Mat: relevantStats.find(stat => stat.stat === 'm')?.value || '',
        Inn: relevantStats.find(stat => stat.stat === 'inn')?.value || '',
        Runs: relevantStats.find(stat => stat.stat === 'runs')?.value || '',
        NO: relevantStats.find(stat => stat.stat === 'no')?.value || '',
        HS: relevantStats.find(stat => stat.stat === 'hs')?.value || '',
        Avg: relevantStats.find(stat => stat.stat === 'avg')?.value || '',
        BF: relevantStats.find(stat => stat.stat === 'bf')?.value || '',
        SR: relevantStats.find(stat => stat.stat === 'sr')?.value || '',
        '100s': relevantStats.find(stat => stat.stat === '100s')?.value || '',
        '200s': relevantStats.find(stat => stat.stat === '200s')?.value || '',
        '50s': relevantStats.find(stat => stat.stat === '50s')?.value || '',
        '4s': relevantStats.find(stat => stat.stat === '4s')?.value || '',
        '6s': relevantStats.find(stat => stat.stat === '6s')?.value || ''
      };
      return data;
    }

    const matchTypes = ['test', 'odi', 't20i', 'ipl'];

    const battingStats = document.getElementById('batting-stats');

    matchTypes.forEach(matchType => {
      const stats = getStatsForMatchTypeBatting(matchType);
      const row = `<tr>
                        <td class="matchType">${matchType.toUpperCase()}</td>
                        <td>${stats.Mat}</td>
                        <td>${stats.Inn}</td>
                        <td>${stats.Runs}</td>
                        <td>${stats.NO}</td>
                        <td>${stats.HS}</td>
                        <td>${stats.Avg}</td>
                        <td>${stats.BF}</td>
                        <td>${stats.SR}</td>
                        <td>${stats['100s']}</td>
                        <td>${stats['200s']}</td>
                        <td>${stats['50s']}</td>
                        <td>${stats['4s']}</td>
                        <td>${stats['6s']}</td>
                      </tr>`;
      battingStats.insertAdjacentHTML('beforeend', row);
    });
    function getStatsForMatchTypeBowling(matchType) {
      const relevantStats = stats.filter(stat => stat.matchtype === matchType);
      const data = {
        Mat: relevantStats.find(stat => stat.stat === 'm')?.value || '',
        Inn: relevantStats.find(stat => stat.stat === 'inn')?.value || '',
        Balls: relevantStats.find(stat => stat.stat === 'b')?.value || '',
        Runs: relevantStats.find(stat => stat.stat === 'runs')?.value || '',
        Wkts: relevantStats.find(stat => stat.stat === 'wkts')?.value || '',
        BBI: relevantStats.find(stat => stat.stat === 'bbi')?.value || '',
        BBM: relevantStats.find(stat => stat.stat === 'bbm')?.value || '',
        Eco: relevantStats.find(stat => stat.stat === 'econ')?.value || '',
        Avg: relevantStats.find(stat => stat.stat === 'avg')?.value || '',
        SR: relevantStats.find(stat => stat.stat === 'sr')?.value || '',
        '5w': relevantStats.find(stat => stat.stat === '5w')?.value || '',
        '10w': relevantStats.find(stat => stat.stat === '10w')?.value || ''
      };
      return data;
    }

    const bowlingStats = document.getElementById('bowling-stats');

    matchTypes.forEach(matchType => {
      const stats = getStatsForMatchTypeBowling(matchType);
      const row = `<tr>
                        <td class="matchType">${matchType.toUpperCase()}</td>
                        <td>${stats.Mat}</td>
                        <td>${stats.Inn}</td>
                        <td>${stats.Balls}</td>
                        <td>${stats.Runs}</td>
                        <td>${stats.Wkts}</td>
                        <td>${stats.BBI}</td>
                        <td>${stats.BBM}</td>
                        <td>${stats.Eco}</td>
                        <td>${stats.Avg}</td>
                        <td>${stats.SR}</td>
                        <td>${stats['5w']}</td>
                        <td>${stats['10w']}</td>
                      </tr>`;
      bowlingStats.insertAdjacentHTML('beforeend', row);
    });
    document.querySelector(".player").innerHTML = playerInfo;
  })
}
document.querySelector("button").addEventListener("click", () => {
  playerStats(playerName.value);
});
document.addEventListener('keydown', (event) => {
  if (event.key == "Enter") {
    playerStats(playerName.value);
  }
})