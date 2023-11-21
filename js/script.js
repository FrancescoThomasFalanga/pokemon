let punteggioAttuale = parseInt(localStorage.getItem('punteggio')) || 0;
let resetCounter = parseInt(localStorage.getItem('resetCounter')) || 0;

aggiornaPunteggio();
aggiornaCounter();
caricaBonusSalvati();
caricaImpresaSalvati();

// Array di bonus dal "database"
const bonusDatabase = JSON.parse(localStorage.getItem('bonusDatabase')) || [
    { title: "Out Of Lab", points: 25 },
    { title: "Torre Sprout", points: 50 },
    { title: "Falkner", points: 70 },
    { title: "Union Cave", points: 10 },
    { title: "Bugsy", points: 25 },
    { title: "Rivale Post Bugsy", points: 25 },
    { title: "Whitney", points: 15 },
    { title: "Torre Bruciata", points: 10 },
    { title: "Rivale Torre", points: 10 },
    { title: "Mt. Mortar", points: 10 },
    { title: "Faro", points: 10 },
    { title: "Morty", points: 15 },
    { title: "Team Rocket HQ", points: 20 },
    { title: "Chuck", points: 20 },
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

const impresaDatabase = JSON.parse(localStorage.getItem('impresaDatabase')) || [
    { title: "Leggendario", points: 25},
    { title: "No Cure", points: 70},
    { title: "Max 499 Bst", points: 150},
    { title: "Re Lento", points: 80},
];

let originalBonusDatabase = [
    { title: "Out Of Lab", points: 25 },
    { title: "Torre Sprout", points: 50 },
    { title: "Falkner", points: 70 },
    { title: "Union Cave", points: 10 },
    { title: "Bugsy", points: 25 },
    { title: "Rivale Post Bugsy", points: 25 },
    { title: "Whitney", points: 15 },
    { title: "Torre Bruciata", points: 10 },
    { title: "Rivale Torre", points: 10 },
    { title: "Mt. Mortar", points: 10 },
    { title: "Faro", points: 10 },
    { title: "Morty", points: 15 },
    { title: "Team Rocket HQ", points: 20 },
    { title: "Chuck", points: 20 },
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

let originalImpresaDatabase = [
    { title: "Leggendario", points: 25},
    { title: "No Cure", points: 70},
    { title: "Max 499 Bst", points: 150},
    { title: "Re Lento", points: 80},
]

const bonusSelect = document.getElementById("bonusSelect");
bonusDatabase.forEach(bonus => {
    const option = document.createElement("option");
    option.text = bonus.title;
    bonusSelect.add(option);
});

const impresaSelect = document.getElementById("impresaSelect");
impresaDatabase.forEach(impresa => {
    const option = document.createElement("option");
    option.text = impresa.title;
    impresaSelect.add(option);
});

function rimuoviBonusDallaLista(selectedBonusIndex) {
    bonusDatabase.splice(selectedBonusIndex, 1);
    bonusSelect.remove(selectedBonusIndex);
}

function rimuoviImpresaDallaLista(selectedImpresaIndex) {
    impresaDatabase.splice(selectedImpresaIndex, 1);
    impresaSelect.remove(selectedImpresaIndex);
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

    location.reload();
}

function aggiungiImpresaInPagina() {
    const selectedImpresaIndex = impresaSelect.selectedIndex;
    const selectedImpresa = impresaDatabase[selectedImpresaIndex];

    visualizzaImpresaInPagina(selectedImpresa);

    impresaDatabase.splice(selectedImpresaIndex, 1);

    localStorage.setItem("impresaDatabase", JSON.stringify(impresaDatabase));

    rimuoviImpresaDallaLista(selectedImpresaIndex);

    salvaImpresa(selectedImpresa);

    location.reload();
}

// Funzione per ripristinare la lista dei bonus
function resetParziale() {

    // Incrementa il contatore al click
    resetCounter++;

    // Aggiorna il valore del contatore nell'elemento HTML
    document.getElementById('resetCounter').textContent = `C = ${resetCounter}`;

    // Aggiorna il valore del contatore nel local storage
    localStorage.setItem('resetCounter', resetCounter);

    // Ripristina la lista dei bonus dal "database"
    bonusSelect.innerHTML = ""; // Rimuovi tutte le opzioni nel select
    impresaSelect.innerHTML = "";

    // Popola dinamicamente le opzioni del select con la lista completa di bonus
    originalBonusDatabase.forEach(bonus => {
        const option = document.createElement("option");
        option.text = bonus.title;
        bonusSelect.add(option);
    });

    originalImpresaDatabase.forEach(impresa => {
        const option = document.createElement("option");
        option.text = impresa.title;
        impresaSelect.add(option);
    });

    // Salva la lista completa dei bonus nel localStorage
    localStorage.setItem('bonusDatabase', JSON.stringify(originalBonusDatabase));

    localStorage.removeItem("bonusSalvati");

    localStorage.setItem('impresaDatabase', JSON.stringify(originalImpresaDatabase));

    localStorage.removeItem("impresaSalvati");
    
    aggiornaCounter();

    location.reload();
}

function isBonusPresente(bonus) {
    const bonusSalvati = JSON.parse(localStorage.getItem('bonusSalvati')) || [];
    return bonusSalvati.some(b => b.title === bonus.title);
}

function isImpresaPresente(impresa) {
    const impresaSalvati = JSON.parse(localStorage.getItem('impresaSalvati')) || [];
    return impresaSalvati.some(b => b.title === impresa.title);
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

function visualizzaImpresaInPagina(impresa) {

    const impresaDiv = document.createElement("div");
    impresaDiv.className = "impresaDiv";
    
    impresaDiv.innerHTML = `<strong>${impresa.title}</strong>`;
    impresaDiv.innerHTML += `<span class="impresaPoints">+${impresa.points}</span>`;

    const impresaContainer = document.getElementById("impresaContainer");
    impresaContainer.appendChild(impresaDiv);

    impresaDiv.addEventListener("click", function() {
        aggiungiPuntiImpresa(impresa.points);

        rimuoviImpresa(impresaDiv, impresa);
    });
}

function aggiungiPuntiBonus(punti) {
    punteggioAttuale += punti;

    // Salva il punteggio nello storage locale
    localStorage.setItem('punteggio', punteggioAttuale);

    // Aggiorna il punteggio visualizzato
    aggiornaPunteggio();
}

function aggiungiPuntiImpresa(punti) {
    punteggioAttuale += punti;

    localStorage.setItem('punteggio', punteggioAttuale);

    aggiornaPunteggio();
}

function aggiungiPunti() {
    const punteggioSpan = document.getElementById('punteggio');
    let punteggio = parseInt(punteggioSpan.innerText) || 0;
    punteggio += 5;
    punteggioSpan.innerText = punteggio;
    localStorage.setItem('punteggio', punteggio);

    location.reload();
}

function sottraiPunti() {
    const punteggioSpan = document.getElementById('punteggio');
    let punteggio = parseInt(punteggioSpan.innerText) || 0;
    punteggio -= 5;
    punteggioSpan.innerText = punteggio;
    localStorage.setItem('punteggio', punteggio);

    location.reload();
}

function caricaBonusSalvati() {
    const bonusSalvati = JSON.parse(localStorage.getItem('bonusSalvati')) || [];
    bonusSalvati.forEach(bonus => {
        visualizzaBonusInPagina(bonus);
    });
}

function caricaImpresaSalvati() {
    const impresaSalvati = JSON.parse(localStorage.getItem('impresaSalvati')) || [];
    impresaSalvati.forEach(impresa => {
        visualizzaImpresaInPagina(impresa);
    });
}

function salvaBonus(bonus) {
    const bonusSalvati = JSON.parse(localStorage.getItem('bonusSalvati')) || [];
    bonusSalvati.push(bonus);
    localStorage.setItem('bonusSalvati', JSON.stringify(bonusSalvati));
}

function salvaImpresa(impresa) {
    const impresaSalvati = JSON.parse(localStorage.getItem('impresaSalvati')) || [];
    impresaSalvati.push(impresa);
    localStorage.setItem('impresaSalvati', JSON.stringify(impresaSalvati));
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

function rimuoviImpresa(impresaDiv, impresa) {

    const impresaContainer = document.getElementById("impresaContainer");

    impresaContainer.removeChild(impresaDiv);

    const impresaSalvati = JSON.parse(localStorage.getItem('impresaSalvati')) || [];
    const index = impresaSalvati.findIndex(b => b.title === impresa.title);
    if (index !== -1) {
        impresaSalvati.splice(index, 1);
        localStorage.setItem('impresaSalvati', JSON.stringify(impresaSalvati));
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

// function resetPunteggio() {
//     localStorage.removeItem('punteggio');
//     document.getElementById('punteggio').innerText = '0';
//     localStorage.removeItem("bonusSalvati");
//     localStorage.removeItem("bonusDatabase");
//     localStorage.removeItem("impresaSalvati");
//     localStorage.removeItem("impresaDatabase");
//     localStorage.removeItem("resetCounter");

//     localStorage.setItem("bonusDatabase", JSON.stringify(originalBonusDatabase));

//     location.reload();

// }

function aggiungiPuntiEvo() {
    const punteggioSpan = document.getElementById('punteggio');
    let punteggio = parseInt(punteggioSpan.innerText) || 0;
    punteggio += 40;
    punteggioSpan.innerText = punteggio;
    localStorage.setItem('punteggio', punteggio);

    location.reload();
}

function toggleWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const instructionsList = document.getElementById('instructionsList');

    // Verifica se il messaggio è attualmente visibile
    if (welcomeMessage.style.display === 'none' || welcomeMessage.style.display === '') {
        // Se è nascosto, mostralo
        welcomeMessage.style.display = 'block';
        instructionsList.style.display = 'block';

        // Salva lo stato nel localStorage
        localStorage.setItem('welcomeMessageVisible', 'true');
    } else {
        // Altrimenti, nascondilo
        welcomeMessage.style.display = 'none';
        instructionsList.style.display = 'none';

        // Salva lo stato nel localStorage
        localStorage.setItem('welcomeMessageVisible', 'false');
    }
}

// Funzione per ripristinare lo stato al caricamento della pagina
function restoreWelcomeMessageState() {
    const welcomeMessageVisible = localStorage.getItem('welcomeMessageVisible');

    if (welcomeMessageVisible === 'true') {
        // Se lo stato è "true", mostra il messaggio
        document.getElementById('welcomeMessage').style.display = 'block';
        document.getElementById('instructionsList').style.display = 'block';
    } else {
        // Altrimenti, nascondilo
        document.getElementById('welcomeMessage').style.display = 'none';
        document.getElementById('instructionsList').style.display = 'none';
    }
}

// Chiama la funzione al caricamento della pagina
restoreWelcomeMessageState();