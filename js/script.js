let punteggioAttuale = parseInt(localStorage.getItem('punteggio')) || 0;
let resetCounter = parseInt(localStorage.getItem('resetCounter')) || 0;

aggiornaPunteggio();
aggiornaCounter();
caricaBonusSalvati();

// Array di bonus dal "database"
const bonusDatabase = JSON.parse(localStorage.getItem('bonusDatabase')) || [
    { title: "Out Of Lab", points: 20 },
    { title: "Torre Sprout", points: 25 },
    { title: "Brock", points: 70 },
    { title: "Union Cave", points: 10 },
    { title: "Bugsy", points: 25 },
    { title: "Rivale Post Bugsy", points: 25 },
    { title: "Whitney", points: 15 },
    { title: "Torre Bruciata", points: 10 },
    { title: "Rivale Torre", points: 10 },
    { title: "Mt. Mortar", points: 10 },
    { title: "Faro", points: 10 },
    { title: "Nina", points: 15 },
    { title: "Grotta Celeste", points: 10 },
    { title: "Team Rocket HQ", points: 20 },
    { title: "Erika", points: 20 },
    { title: "Jasmine", points: 35 },
    { title: "Pryce", points: 20 },
    { title: "T. Radio #1", points: 10 },
    { title: "Tunnel e T. Radio #2", points: 25 },
    { title: "Rivale Tunnel", points: 25 },
    { title: "Clair", points: 40 },
    { title: "Kimono", points: 20 },
    { title: "Rivale Via Vittoria", points: 40 },
    { title: "Via Vittoria", points: 20 },
    { title: "Will", points: 100 },
    { title: "Koga", points: 130 },
    { title: "Bruno", points: 160 },
    { title: "Karen", points: 200 },
    { title: "Lance", points: 500 },
    { title: "Blu", points: 350 },
    { title: "Rosso", points: 700 },
    // Aggiungi altri bonus secondo necessità
];

let originalBonusDatabase = [
    { title: "Out Of Lab", points: 20 },
    { title: "Torre Sprout", points: 25 },
    { title: "Brock", points: 70 },
    { title: "Union Cave", points: 10 },
    { title: "Bugsy", points: 25 },
    { title: "Rivale Post Bugsy", points: 25 },
    { title: "Whitney", points: 15 },
    { title: "Torre Bruciata", points: 10 },
    { title: "Rivale Torre", points: 10 },
    { title: "Mt. Mortar", points: 10 },
    { title: "Faro", points: 10 },
    { title: "Nina", points: 15 },
    { title: "Grotta Celeste", points: 10 },
    { title: "Team Rocket HQ", points: 20 },
    { title: "Erika", points: 20 },
    { title: "Jasmine", points: 35 },
    { title: "Pryce", points: 20 },
    { title: "T. Radio #1", points: 10 },
    { title: "Tunnel e T. Radio #2", points: 25 },
    { title: "Rivale Tunnel", points: 25 },
    { title: "Clair", points: 40 },
    { title: "Kimono", points: 20 },
    { title: "Rivale Via Vittoria", points: 40 },
    { title: "Via Vittoria", points: 20 },
    { title: "Will", points: 100 },
    { title: "Koga", points: 130 },
    { title: "Bruno", points: 160 },
    { title: "Karen", points: 200 },
    { title: "Lance", points: 500 },
    { title: "Blu", points: 350 },
    { title: "Rosso", points: 700 },
];

// Popola dinamicamente le opzioni del select
const bonusSelect = document.getElementById("bonusSelect");
bonusDatabase.forEach(bonus => {
    const option = document.createElement("option");
    option.text = bonus.title;
    bonusSelect.add(option);
});

function rimuoviBonusDallaLista(selectedBonusIndex) {
    bonusDatabase.splice(selectedBonusIndex, 1);
    bonusSelect.remove(selectedBonusIndex);
}

function aggiungiBonusInPagina() {
    // Recupera il bonus selezionato
    const selectedBonusIndex = bonusSelect.selectedIndex;
    const selectedBonus = bonusDatabase[selectedBonusIndex];

    // Visualizza il bonus in pagina
    visualizzaBonusInPagina(selectedBonus);

    bonusDatabase.splice(selectedBonusIndex, 1);

    localStorage.setItem("bonusDatabase", JSON.stringify(bonusDatabase));

    // Rimuovi il bonus dalla lista dei bonus disponibili
    rimuoviBonusDallaLista(selectedBonusIndex);

    // Aggiungi il bonus al localStorage
    salvaBonus(selectedBonus);
}

// Funzione per ripristinare la lista dei bonus
function resetBonus() {

    // Incrementa il contatore al click
    resetCounter++;

    // Aggiorna il valore del contatore nell'elemento HTML
    document.getElementById('resetCounter').textContent = `C = ${resetCounter}`;

    // Aggiorna il valore del contatore nel local storage
    localStorage.setItem('resetCounter', resetCounter);

    // Ripristina la lista dei bonus dal "database"
    bonusSelect.innerHTML = ""; // Rimuovi tutte le opzioni nel select

    // Popola dinamicamente le opzioni del select con la lista completa di bonus
    originalBonusDatabase.forEach(bonus => {
        const option = document.createElement("option");
        option.text = bonus.title;
        bonusSelect.add(option);
    });

    // Salva la lista completa dei bonus nel localStorage
    localStorage.setItem('bonusDatabase', JSON.stringify(originalBonusDatabase));

    localStorage.removeItem("bonusSalvati");
    
    aggiornaCounter();

    location.reload();
}

function isBonusPresente(bonus) {
    const bonusSalvati = JSON.parse(localStorage.getItem('bonusSalvati')) || [];
    return bonusSalvati.some(b => b.title === bonus.title);
}

function visualizzaBonusInPagina(bonus) {
    // Crea un elemento div per visualizzare le informazioni del bonus
    const bonusDiv = document.createElement("div");
    bonusDiv.className = "bonusDiv";
    
    bonusDiv.innerHTML = `<strong>${bonus.title}</strong>`;
    bonusDiv.innerHTML += `<span class="bonusPoints">+${bonus.points}</span>`;

    // Aggiungi l'elemento div al container dei bonus
    const bonusContainer = document.getElementById("bonusContainer");
    bonusContainer.appendChild(bonusDiv);

    // Aggiungi l'evento click al div per gestire l'aggiunta dei punti
    bonusDiv.addEventListener("click", function() {
        aggiungiPuntiBonus(bonus.points);

        // Rimuovi il bonus dalla pagina e dal localStorage
        rimuoviBonus(bonusDiv, bonus);
    });
}

function aggiungiPuntiBonus(punti) {
    punteggioAttuale += punti;

    // Salva il punteggio nello storage locale
    localStorage.setItem('punteggio', punteggioAttuale);

    // Aggiorna il punteggio visualizzato
    aggiornaPunteggio();
}

function aggiungiPunti() {
    const punteggioSpan = document.getElementById('punteggio');
    let punteggio = parseInt(punteggioSpan.innerText) || 0;
    punteggio += 5;
    punteggioSpan.innerText = punteggio;
    localStorage.setItem('punteggio', punteggio);
}

function sottraiPunti() {
    const punteggioSpan = document.getElementById('punteggio');
    let punteggio = parseInt(punteggioSpan.innerText) || 0;
    punteggio -= 5;
    punteggioSpan.innerText = punteggio;
    localStorage.setItem('punteggio', punteggio);
}

function caricaBonusSalvati() {
    const bonusSalvati = JSON.parse(localStorage.getItem('bonusSalvati')) || [];
    bonusSalvati.forEach(bonus => {
        visualizzaBonusInPagina(bonus);
    });
}

function salvaBonus(bonus) {
    const bonusSalvati = JSON.parse(localStorage.getItem('bonusSalvati')) || [];
    bonusSalvati.push(bonus);
    localStorage.setItem('bonusSalvati', JSON.stringify(bonusSalvati));
}

function rimuoviBonus(bonusDiv, bonus) {
    // Recupera l'elemento genitore del bonusDiv
    const bonusContainer = document.getElementById("bonusContainer");

    // Rimuovi il bonusDiv dall'elemento genitore (bonusContainer)
    bonusContainer.removeChild(bonusDiv);

    // Rimuovi il bonus dal localStorage
    const bonusSalvati = JSON.parse(localStorage.getItem('bonusSalvati')) || [];
    const index = bonusSalvati.findIndex(b => b.title === bonus.title);
    if (index !== -1) {
        bonusSalvati.splice(index, 1);
        localStorage.setItem('bonusSalvati', JSON.stringify(bonusSalvati));
    }
}

function aggiornaPunteggio() {
    const punteggioElement = document.getElementById("punteggio");
    punteggioElement.textContent = punteggioAttuale;
}

function aggiornaCounter() {
    const counterElement = document.getElementById("resetCounter");
    counterElement.textContent = "Tentativo N." + resetCounter;
}

function resetPunteggio() {
    localStorage.removeItem('punteggio');
    document.getElementById('punteggio').innerText = '0';
    localStorage.removeItem("bonusSalvati");
    localStorage.removeItem("bonusDatabase");
    localStorage.removeItem("resetCounter");

    localStorage.setItem("bonusDatabase", JSON.stringify(originalBonusDatabase));

    location.reload();

}

function aggiungiPuntiEvo() {
    const punteggioSpan = document.getElementById('punteggio');
    let punteggio = parseInt(punteggioSpan.innerText) || 0;
    punteggio += 40;
    punteggioSpan.innerText = punteggio;
    localStorage.setItem('punteggio', punteggio);
}