// Traducciones
const translations = {
    es: {
        title: "LOGICARTE",
        subtitle: "HERRAMIENTAS PARA APRENDER LÓGICA PROPOSICIONAL",
        formalizar: "Conceptos y Formalización",
        calculadora: "Calculadora de Tablas de Verdad",
        demostrador: "Demostrador por Reducción al Absurdo",
        deduccion: "Demostrador por Deducción Natural",
        resolucion: "Demostrador por Resolución",
        falacias: "Falacias",
        ayuda: "Ayuda"
    },
    eu: {
        title: "LOGICARTE",
        subtitle: "LOGIKA PROPOSIZIONALA IKASTEKO TRESNAK",
        formalizar: "Kontzeptuak eta Formalizazioa",
        calculadora: "Egia-Taulen Kalkulagailua",
        demostrador: "Absurdurako Erredukzioaren Frogatzailea",
        deduccion: "Dedukzio Natural Frogatzailea",
        resolucion: "Erresoluzio Frogatzailea",
        falacias: "Falaziak",
        ayuda: "Laguntza"
    }
};

// Actualizar idioma
function updateLanguage(lang) {
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('subtitle').textContent = translations[lang].subtitle;
    document.getElementById('btnFormalizar').textContent = translations[lang].formalizar;
    document.getElementById('btnCalculadora').textContent = translations[lang].calculadora;
    document.getElementById('btnDemostrador').textContent = translations[lang].demostrador;
    document.getElementById('btnDeduccion').textContent = translations[lang].deduccion;
    document.getElementById('btnResolucion').textContent = translations[lang].resolucion;
    document.getElementById('btnFalacias').textContent = translations[lang].falacias;
    document.getElementById('linkAyuda').textContent = translations[lang].ayuda;
    localStorage.setItem('selectedLanguage', lang); // Guardar inmediatamente en localStorage
    // Actualizar contenido de ayuda según idioma
    if (lang === "es") {
        document.getElementById("help-es").style.display = "block";
        document.getElementById("help-eu").style.display = "none";
    } else {
        document.getElementById("help-es").style.display = "none";
        document.getElementById("help-eu").style.display = "block";
    }
}

// Cargar idioma guardado o español por defecto al iniciar
window.onload = function() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'es';
    document.getElementById('language').value = savedLang;
    updateLanguage(savedLang);
    generateSymbols(); // Generar símbolos al cargar la página
};

// Evento del selector de idioma
document.getElementById('language').addEventListener('change', function() {
    updateLanguage(this.value);
});

// Abrir herramientas en nuevas pestañas con el idioma seleccionado
function abrirHerramienta(url) {
    const lang = document.getElementById('language').value || 'es';
    localStorage.setItem('selectedLanguage', lang);
    window.open(url + '?lang=' + lang, '_blank');
}

// Generar símbolos de fondo
const symbols = ['∧', '∨', '¬', '→', '↔', 'P', 'Q', 'R', 'S', 'T'];

function createSymbol() {
    const symbolDiv = document.createElement('div');
    symbolDiv.classList.add('symbol');
    symbolDiv.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    symbolDiv.style.left = `${left}%`;
    symbolDiv.style.top = `${top}%`;
    const rotation = Math.random() * 360;
    symbolDiv.style.transform = `rotate(${rotation}deg)`;
    const duration = 10 + Math.random() * 20;
    const delay = Math.random() * 5;
    symbolDiv.style.animationDuration = `${duration}s`;
    symbolDiv.style.animationDelay = `${delay}s`;
    return symbolDiv;
}

function generateSymbols() {
    const background = document.getElementById('background-symbols');
    for (let i = 0; i < 20; i++) {
        background.appendChild(createSymbol());
    }
}

// Funciones para mostrar y cerrar el modal de ayuda
function mostrarAyuda() {
    document.getElementById("helpModal").style.display = "block";
}

function cerrarAyuda() {
    document.getElementById("helpModal").style.display = "none";
}