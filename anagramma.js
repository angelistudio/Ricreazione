/**
 * Generatore di Anagrammi in Italiano
 *
 * Questo modulo permette di generare anagrammi di parole italiane,
 * verificare se due parole sono anagrammi e altre funzioni utili.
 */

/**
 * Normalizza una stringa rimuovendo spazi, convertendo in minuscolo
 * e gestendo i caratteri accentati italiani
 * @param {string} parola - La parola da normalizzare
 * @returns {string} - La parola normalizzata
 */
function normalizza(parola) {
    return parola
        .toLowerCase()
        .replace(/\s+/g, '')
        .trim();
}

/**
 * Verifica se due parole sono anagrammi l'una dell'altra
 * @param {string} parola1 - Prima parola
 * @param {string} parola2 - Seconda parola
 * @returns {boolean} - true se sono anagrammi, false altrimenti
 */
function sonoAnagrammi(parola1, parola2) {
    const p1 = normalizza(parola1);
    const p2 = normalizza(parola2);

    if (p1.length !== p2.length) {
        return false;
    }

    const ordina = (str) => str.split('').sort().join('');
    return ordina(p1) === ordina(p2);
}

/**
 * Genera tutte le permutazioni di un array
 * @param {Array} array - Array di elementi da permutare
 * @returns {Array} - Array di tutte le permutazioni
 */
function permutazioni(array) {
    if (array.length <= 1) {
        return [array];
    }

    const risultato = [];

    for (let i = 0; i < array.length; i++) {
        const elemento = array[i];
        const resto = [...array.slice(0, i), ...array.slice(i + 1)];
        const permutazioniResto = permutazioni(resto);

        for (const perm of permutazioniResto) {
            risultato.push([elemento, ...perm]);
        }
    }

    return risultato;
}

/**
 * Genera tutti gli anagrammi possibili di una parola
 * Attenzione: per parole lunghe il numero di anagrammi cresce fattorialmente!
 * @param {string} parola - La parola di cui generare gli anagrammi
 * @param {boolean} unicoRisultato - Se true, rimuove i duplicati (default: true)
 * @returns {string[]} - Array di tutti gli anagrammi possibili
 */
function generaAnagrammi(parola, unicoRisultato = true) {
    const parolaNormalizzata = normalizza(parola);

    // Avviso per parole troppo lunghe
    if (parolaNormalizzata.length > 10) {
        console.warn(`Attenzione: generare anagrammi per "${parola}" (${parolaNormalizzata.length} lettere) potrebbe richiedere molto tempo!`);
    }

    const lettere = parolaNormalizzata.split('');
    const tuttePermutazioni = permutazioni(lettere);
    const anagrammi = tuttePermutazioni.map(perm => perm.join(''));

    if (unicoRisultato) {
        return [...new Set(anagrammi)];
    }

    return anagrammi;
}

/**
 * Conta il numero di anagrammi possibili (fattoriale / ripetizioni)
 * @param {string} parola - La parola da analizzare
 * @returns {number} - Numero di anagrammi unici possibili
 */
function contaAnagrammi(parola) {
    const parolaNormalizzata = normalizza(parola);
    const lettere = parolaNormalizzata.split('');

    // Conta le occorrenze di ogni lettera
    const conteggio = {};
    for (const lettera of lettere) {
        conteggio[lettera] = (conteggio[lettera] || 0) + 1;
    }

    // Calcola n! / (k1! * k2! * ... * km!)
    const fattoriale = (n) => {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    let numeratore = fattoriale(lettere.length);
    let denominatore = 1;

    for (const count of Object.values(conteggio)) {
        denominatore *= fattoriale(count);
    }

    return numeratore / denominatore;
}

/**
 * Genera una chiave ordinata per raggruppare anagrammi
 * @param {string} parola - La parola da convertire in chiave
 * @returns {string} - Chiave per raggruppare anagrammi
 */
function chiaveAnagramma(parola) {
    return normalizza(parola).split('').sort().join('');
}

/**
 * Raggruppa un array di parole per anagrammi
 * @param {string[]} parole - Array di parole da raggruppare
 * @returns {Object} - Oggetto con chiavi e array di parole che sono anagrammi
 */
function raggruppaAnagrammi(parole) {
    const gruppi = {};

    for (const parola of parole) {
        const chiave = chiaveAnagramma(parola);
        if (!gruppi[chiave]) {
            gruppi[chiave] = [];
        }
        gruppi[chiave].push(parola);
    }

    // Filtra solo i gruppi con più di una parola (veri anagrammi)
    const risultato = {};
    for (const [chiave, gruppo] of Object.entries(gruppi)) {
        if (gruppo.length > 1) {
            risultato[chiave] = gruppo;
        }
    }

    return risultato;
}

/**
 * Mescola casualmente le lettere di una parola
 * @param {string} parola - La parola da mescolare
 * @returns {string} - La parola con le lettere mescolate
 */
function mescolaLettere(parola) {
    const lettere = parola.split('');

    // Algoritmo di Fisher-Yates
    for (let i = lettere.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lettere[i], lettere[j]] = [lettere[j], lettere[i]];
    }

    return lettere.join('');
}

/**
 * Genera un singolo anagramma casuale
 * @param {string} parola - La parola da cui generare l'anagramma
 * @returns {string} - Un anagramma casuale della parola
 */
function anagrammaCasuale(parola) {
    return mescolaLettere(normalizza(parola));
}

// Esempi di anagrammi italiani famosi
const esempiAnagrammiItaliani = [
    { originale: 'amor', anagramma: 'roma' },
    { originale: 'arte', anagramma: 'rate' },
    { originale: 'cane', anagramma: 'acne' },
    { originale: 'cosa', anagramma: 'caos' },
    { originale: 'lago', anagramma: 'gola' },
    { originale: 'male', anagramma: 'lame' },
    { originale: 'nave', anagramma: 'vena' },
    { originale: 'pane', anagramma: 'pena' },
    { originale: 'riso', anagramma: 'siro' },
    { originale: 'vita', anagramma: 'vati' }
];

// Demo interattiva
function demo() {
    console.log('=== Generatore di Anagrammi Italiano ===\n');

    // Test sonoAnagrammi
    console.log('Test: "roma" e "amor" sono anagrammi?', sonoAnagrammi('roma', 'amor'));
    console.log('Test: "casa" e "saca" sono anagrammi?', sonoAnagrammi('casa', 'saca'));
    console.log('Test: "ciao" e "hello" sono anagrammi?', sonoAnagrammi('ciao', 'hello'));

    console.log('\n--- Generazione anagrammi ---');
    const parola = 'cane';
    console.log(`Anagrammi di "${parola}":`, generaAnagrammi(parola));
    console.log(`Numero totale di anagrammi unici:`, contaAnagrammi(parola));

    console.log('\n--- Anagramma casuale ---');
    console.log(`Anagramma casuale di "italiano":`, anagrammaCasuale('italiano'));

    console.log('\n--- Raggruppamento anagrammi ---');
    const listaParole = ['roma', 'amor', 'mora', 'cane', 'acne', 'casa', 'pane', 'pena', 'nape'];
    console.log('Gruppi di anagrammi:', raggruppaAnagrammi(listaParole));

    console.log('\n--- Esempi famosi ---');
    esempiAnagrammiItaliani.forEach(({ originale, anagramma }) => {
        console.log(`  ${originale} <-> ${anagramma}`);
    });
}

// Esporta le funzioni per uso come modulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        normalizza,
        sonoAnagrammi,
        generaAnagrammi,
        contaAnagrammi,
        chiaveAnagramma,
        raggruppaAnagrammi,
        mescolaLettere,
        anagrammaCasuale,
        esempiAnagrammiItaliani,
        demo
    };
}

// Esegui la demo se il file viene eseguito direttamente
if (typeof require !== 'undefined' && require.main === module) {
    demo();
}
