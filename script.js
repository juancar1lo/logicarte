document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    const savedLang = localStorage.getItem('selectedLanguage') || 'es';
    const initialLang = langFromUrl || savedLang;
    console.log('Conceptos - langFromUrl:', langFromUrl, 'savedLang:', savedLang, 'initialLang:', initialLang);
    const langSelect = document.getElementById('language');
    if (langSelect) {
        langSelect.value = initialLang;
        changeLanguage(initialLang); // Cambié a changeLanguage para consistencia con el resto del script
    } else {
        console.error('Selector de idioma no encontrado');
        changeLanguage(initialLang); // Aplicar idioma de todos modos
    }
    // Resto del código...
});

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    document.getElementById('main-title-es').style.display = lang === 'es' ? 'block' : 'none';
    document.getElementById('main-title-eu').style.display = lang === 'eu' ? 'block' : 'none';
    // Resto de la función...
}

// Función para desplegar u ocultar contenido con transiciones dinámicas
function toggleContent(id) {
    document.querySelectorAll(".concept-content").forEach(cont => {
        if (cont.id !== id) {
            cont.style.maxHeight = "0px";
            cont.classList.remove("open");
            const btn = document.querySelector(`button[onclick="toggleContent('${cont.id}')"]`);
            if (btn) {
                btn.setAttribute("aria-expanded", "false");
            }
        }
    });
    const content = document.getElementById(id);
    const button = document.querySelector(`button[onclick="toggleContent('${id}')"]`);
    if (content.classList.contains("open")) {
        content.style.maxHeight = "0px";
        content.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
    } else {
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
        button.setAttribute("aria-expanded", "true");
        setTimeout(() => {
            content.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 400);
    }
}

// Traducciones para retroalimentación
const feedbackTranslations = {
    es: {
        correct: "¡Correcto!",
        incorrect: "Incorrecto. Intenta de nuevo."
    },
    eu: {
        correct: "Zuzen!",
        incorrect: "Okerra. Saiatu berriro."
    }
};

let currentLang = 'es';

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang); // Guardar el idioma seleccionado
    document.getElementById('main-title-es').style.display = lang === 'es' ? 'block' : 'none';
    document.getElementById('main-title-eu').style.display = lang === 'eu' ? 'block' : 'none';
    document.querySelectorAll('[id^=button-]').forEach(button => {
        if (button.id.endsWith('-es')) {
            button.style.display = lang === 'es' ? 'inline' : 'none';
        } else if (button.id.endsWith('-eu')) {
            button.style.display = lang === 'eu' ? 'inline' : 'none';
        }
    });
    document.querySelectorAll('[id$=-text-es], [id$=-intro-es]').forEach(el => {
        el.style.display = lang === 'es' ? 'block' : 'none';
    });
    document.querySelectorAll('[id$=-text-eu], [id$=-intro-eu]').forEach(el => {
        el.style.display = lang === 'eu' ? 'block' : 'none';
    });
    document.querySelectorAll('[id$=-es]').forEach(el => {
        if (!el.classList.contains('check-btn')) {
            el.style.display = lang === 'es' ? 'block' : 'none';
        }
    });
    document.querySelectorAll('[id$=-eu]').forEach(el => {
        if (!el.classList.contains('check-btn')) {
            el.style.display = lang === 'eu' ? 'block' : 'none';
        }
    });
    document.querySelectorAll('.ejercicio input').forEach(input => {
        input.placeholder = lang === 'es' ? 'Escribe tu respuesta' : 'Idatzi zure erantzuna';
    });
    document.querySelectorAll('.ejercicio select option[value=""]').forEach(option => {
        option.text = lang === 'es' ? 'Selecciona una opción' : 'Hautatu aukera bat';
    });
    document.querySelectorAll('.check-btn').forEach(btn => {
        btn.textContent = lang === 'es' ? btn.getAttribute('data-es') : btn.getAttribute('data-eu');
    });
}

function insertSymbol(symbol, idInput) {
    const input = document.getElementById(idInput);
    input.value += symbol;
    input.focus();
}

function comprobarRespuesta(idInput, respuestaCorrecta, feedbackId) {
    const entrada = document.getElementById(idInput).value.trim();
    const feedback = document.getElementById(feedbackId);
    if (entrada === respuestaCorrecta) {
        feedback.textContent = feedbackTranslations[currentLang].correct;
        feedback.style.color = "green";
    } else {
        feedback.textContent = feedbackTranslations[currentLang].incorrect;
        feedback.style.color = "red";
    }
    const content = document.querySelector(".concept-content.open");
    if (content) {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function comprobarRespuestaTest(idSelect, respuestaCorrecta, feedbackId) {
    const seleccion = document.getElementById(idSelect).value;
    const feedback = document.getElementById(feedbackId);
    if (seleccion === respuestaCorrecta) {
        feedback.textContent = feedbackTranslations[currentLang].correct;
        feedback.style.color = "green";
    } else {
        feedback.textContent = feedbackTranslations[currentLang].incorrect;
        feedback.style.color = "red";
    }
    const content = document.querySelector(".concept-content.open");
    if (content) {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function clearFeedback(feedbackId) {
    const feedbackElem = document.getElementById(feedbackId);
    if (feedbackElem) {
        feedbackElem.textContent = "";
    }
    const fieldId = feedbackId.replace("feedback-", "");
    const fieldElem = document.getElementById(fieldId);
    if (fieldElem) {
        if (fieldElem.tagName.toLowerCase() === "input") {
            fieldElem.value = "";
        } else if (fieldElem.tagName.toLowerCase() === "select") {
            fieldElem.selectedIndex = 0;
        }
    }
    const content = document.querySelector(".concept-content.open");
    if (content) {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}