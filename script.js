// --- Game State ---
const gameState = {
    currentSituation: 1,
    maxSituations: 10,
    stamina: 100,
    acv: 0,
    targetAcv: 500,
    maxHearts: 5,
    aeRelationships: { "Carlos": 3, "Laura": 3, "Miguel": 3 },
    situationHistory: []
};

// --- Game Situations (Impacts adjusted to hearts) ---
const situations = [
    { id: 1, title: "Petición Urgente de Demo - Carnicerías Pepe", ae: "Carlos", description: "¡Ayuda urgente! Necesito una demo súper personalizada de Marketing Cloud para mañana a primera hora. El cliente es **Carnicerías Pepe**, una cadena local en expansión con ganas de digitalizarse. ¡El potencial son 150k ACV si les impresionamos! Sé que es un marrón y sobre la bocina, pero el dueño, Pepe, solo podía mañana y es nuestra única bala. ¿Puedes hacer magia?", options: [ { text: "Aceptar. Noche en vela, café y a por ello. ¡Por Pepe!", outcome: "Tras una noche heroica a base de cafeína, montas una demo espectacular que deja a Pepe boquiabierto. Carlos te adora, pero tú pareces un fantasma.", impacts: { stamina: -25, aeRelationship: { "Carlos": +1 }, opportunity: "+25%", acv: 0 } }, { text: "Negociar. Usar la demo estándar y añadir 2-3 slides personalizadas.", outcome: "Le explicas a Carlos que una demo completa es inviable. Preparas la demo estándar y añades detalles sobre el sector cárnico. Es funcional, pero no 'wow'. Carlos acepta a regañadientes.", impacts: { stamina: -10, aeRelationship: { "Carlos": -1 }, opportunity: "-5%", acv: 0 } }, { text: "Rechazar. Imposible garantizar calidad con tan poco tiempo.", outcome: "Le dices a Carlos que es imposible hacer un buen trabajo así, y que sería contraproducente. Carlos monta en cólera, dice que no eres un jugador de equipo. Priorizas tu salud mental.", impacts: { stamina: +5, aeRelationship: { "Carlos": -2 }, opportunity: "-40%", acv: 0 } } ] },
    { id: 2, title: "Conflicto de Prioridades - Banco Solidario vs Juguetes PlayFun", ae: "Laura", description: "Tengo una reunión estratégica la semana que viene con **Banco Solidario** (potencial 75k ACV) y necesito que definamos la arquitectura técnica para integrar sus sistemas legacy. Es complejo. Pero me ha dicho Miguel que también te necesita para una RFP urgente de **Juguetes PlayFun**. ¿Cómo lo hacemos?", options: [ { text: "Priorizar Banco Solidario. La planificación de Laura es más sólida.", outcome: "Te centras en la arquitectura para Laura. Banco Solidario queda impresionado con el plan. Miguel se queja de que le dejaste colgado con la RFP.", impacts: { stamina: -15, aeRelationship: { "Laura": +1, "Miguel": -1 }, opportunity: "+15% (Laura)", acv: 0 } }, { text: "Intentar hacer malabares. Dedicar medio tiempo a cada uno.", outcome: "Trabajas el doble, corriendo de una tarea a otra. Consigues entregar algo para ambos, pero la calidad es justita y acabas la semana hecho polvo.", impacts: { stamina: -30, aeRelationship: { "Laura": 0, "Miguel": 0 }, opportunity: "+0% (Ambas)", acv: 0 } }, { text: "Escalar. Hablar con tu manager para que ayude a priorizar.", outcome: "Planteas el conflicto a tu manager. Tras una reunión, deciden posponer ligeramente la estrategia del Banco para asegurar la RFP. Laura y Miguel entienden, aunque hay retrasos.", impacts: { stamina: -5, aeRelationship: { "Laura": 0, "Miguel": +1 }, opportunity: "0%", acv: 0 } } ] },
    { id: 3, title: "¡Deal Cerrado! - TechCorp Global", ae: "Miguel", description: "¡¡¡BOOM!!! ¡Acabamos de recibir la firma de **TechCorp Global**! ¡Son 100k de ACV limpitos! Tu presentación sobre la escalabilidad y seguridad fue absolutamente CLAVE, el cliente lo mencionó específicamente. ¡Eres un crack! ¡Tenemos que celebrarlo!", options: [ { text: "¡Genial! Organizar una llamada rápida de celebración con el equipo.", outcome: "Propone una videollamada rápida para celebrar. El equipo comparte la alegría, Miguel se siente validado y tú recibes felicitaciones. ¡Subidón de moral!", impacts: { stamina: +10, aeRelationship: { "Miguel": +1 }, acv: 100 } }, { text: "Agradecer brevemente por email y preguntar cuál es la siguiente.", outcome: "Respondes con un 'Gracias, buen trabajo en equipo. ¿Qué es lo próximo?'. Miguel aprecia la eficiencia, pero echa en falta un poco más de efusividad. Sumas el ACV.", impacts: { stamina: 0, aeRelationship: { "Miguel": -1 }, acv: 100 } }, { text: "Decirle a Miguel: '¡Perfecto! Ya sabes dónde invitarme a comer...'", outcome: "Le lanzas la indirecta en tono de broma. Miguel se ríe y probablemente acepte si tenéis confianza. Si no, puede sonar un poco interesado. El ACV es tuyo igualmente.", impacts: { stamina: +5, aeRelationship: { "Miguel": 0 }, acv: 100 } } ] },
    { id: 4, title: "Soporte Post-Venta Inesperado - Moda Rápida Inc.", ae: "Laura", description: "Oye, el cliente **Moda Rápida Inc.**, que cerramos hace dos meses, está teniendo problemas para configurar unas journeys complejas. El equipo de soporte está un poco saturado y el cliente está impaciente. Sé que no es tu labor, pero como confían mucho en ti por la preventa... ¿podrías echarles una mano con una llamada rápida? Sería un gran favor.", options: [ { text: "Aceptar. Una buena relación post-venta es clave para futuras ventas.", outcome: "Dedicas una hora a resolver las dudas del cliente. Quedan encantados y Laura te lo agradece enormemente. Es tiempo que no dedicas a nuevas oportunidades.", impacts: { stamina: -10, aeRelationship: { "Laura": +1 }, acv: 0 } }, { text: "Redirigir cortésmente. Explicar que el equipo de Customer Success es el adecuado.", outcome: "Le explicas a Laura que lo mejor es seguir el proceso y que el equipo de CS está preparado para ello. Proteges tu tiempo, pero Laura siente que podrías haber hecho un esfuerzo extra.", impacts: { stamina: 0, aeRelationship: { "Laura": -1 }, acv: 0 } }, { text: "Aceptar, pero pedirle a Laura 'un favor por otro favor' en el futuro.", outcome: "Aceptas ayudar, pero le dejas caer a Laura que esperas que te eche un cable con esa oportunidad difícil que tienes entre manos. Puede ser efectivo o tensar la relación.", impacts: { stamina: -10, aeRelationship: { "Laura": 0 }, acv: 0 } } ] },
    { id: 5, title: "RFP Compleja - Aeroespacial Cóndor", ae: "Miguel", description: "¡Nos ha caído una RFP (Request for Proposal) de **Aeroespacial Cóndor**! Es enorme, potencial de 300k ACV, pero es súper técnica y piden detalles muy específicos sobre integraciones con SAP y normativas aeroespaciales. Necesito que te la estudies a fondo y prepares toda la respuesta técnica. Tenemos 2 semanas.", options: [ { text: "Sumergirse de lleno. Bloquear agenda y dedicarle máxima prioridad.", outcome: "Te encierras durante días, investigas normativas, hablas con producto... Entregas una respuesta técnica impecable. Miguel está impresionado, pero otras tareas se han resentido.", impacts: { stamina: -35, aeRelationship: { "Miguel": +1 }, opportunity: "+30%", acv: 0 } }, { text: "Buscar ayuda interna. Colaborar con arquitectos especialistas.", outcome: "Identificas que necesitas ayuda específica. Movilizas a un arquitecto especialista en SAP y a otro colega con experiencia en el sector. La respuesta es sólida y compartes la carga.", impacts: { stamina: -15, aeRelationship: { "Miguel": +1 }, opportunity: "+25%", acv: 0 } }, { text: "Simplificar. Responder a lo esencial y destacar fortalezas generales.", outcome: "Ves que responder a todo es inviable o demasiado costoso en tiempo. Te centras en los puntos clave y en diferenciar la plataforma, sin entrar en cada detalle minucioso. Es una apuesta.", impacts: { stamina: -10, aeRelationship: { "Miguel": -1 }, opportunity: "-15%", acv: 0 } } ] },
    { id: 6, title: "Presentación Interna - QBR", ae: "Carlos", description: "Tenemos el QBR (Quarterly Business Review) la semana que viene y me gustaría que presentaras un resumen de las victorias técnicas clave del trimestre y cómo han impactado en los cierres. Especialmente el caso de **Distribuciones Veloz**. Prepara algo chulo para impresionar a la Dirección.", options: [ { text: "Preparar una presentación detallada y ensayarla a conciencia.", outcome: "Creas una presentación visualmente atractiva, con métricas y testimonios. La ensayas varias veces. La Dirección queda impresionada con tu profesionalidad.", impacts: { stamina: -15, aeRelationship: { "Carlos": +1 }, acv: 0 } }, { text: "Reutilizar slides antiguas y hacer un resumen rápido.", outcome: "Recopilas algunas slides de demos anteriores y preparas un resumen funcional pero poco inspirador. Cumples el expediente sin dedicarle mucho tiempo.", impacts: { stamina: -5, aeRelationship: { "Carlos": -1 }, acv: 0 } }, { text: "Delegar en un compañero más junior si es posible.", outcome: "Le pides a un compañero SE más junior que te ayude a recopilar la información y montar un borrador. Supervisas, pero ahorras tiempo. Depende de si hay alguien disponible.", impacts: { stamina: -3, aeRelationship: { "Carlos": 0 }, acv: 0 } } ] },
    { id: 7, title: "Viaje Inesperado - Seguros Confianza", ae: "Laura", description: "¡Noticias! El cliente **Seguros Confianza** (potencial 120k ACV) ha aceptado una reunión presencial la semana que viene en Sevilla, ¡pero solo si vamos los dos! Necesitan ver un compromiso fuerte. Sé que es un viaje no planificado, pero creo que es crucial para cerrar. ¿Te vienes?", options: [ { text: "Aceptar. Preparar maleta y revisar la presentación para el viaje.", outcome: "Reorganizas tu agenda y te preparas para el viaje. El cliente aprecia el esfuerzo y la reunión es productiva. El viaje y la preparación te cansan.", impacts: { stamina: -20, aeRelationship: { "Laura": +1 }, opportunity: "+20%", acv: 0 } }, { text: "Proponer una reunión virtual potente como alternativa inicial.", outcome: "Le explicas a Laura que el viaje es complicado ahora mismo y propones una videoconferencia con todos los recursos necesarios para que sea impactante. Laura intenta convencer al cliente.", impacts: { stamina: -5, aeRelationship: { "Laura": -1 }, opportunity: "-10%", acv: 0 } }, { text: "Rechazar el viaje. Explicar que tienes otros compromisos críticos.", outcome: "Le comunicas a Laura que te es imposible viajar por compromisos previos inamovibles. Laura se siente frustrada y teme perder la oportunidad.", impacts: { stamina: +0, aeRelationship: { "Laura": -2 }, opportunity: "-30%", acv: 0 } } ] },
    { id: 8, title: "Cliente Difícil - Consultores Eficaces", ae: "Miguel", description: "Uff, estoy teniendo problemas con **Consultores Eficaces** (potencial 50k ACV). El CTO es muy escéptico, no para de poner pegas técnicas y cuestiona cada afirmación. Necesito que vengas conmigo a la próxima reunión y le rebatas con argumentos sólidos y paciencia. ¡Necesito tu credibilidad técnica!", options: [ { text: "Aceptar y prepararse a fondo para rebatir cada posible objeción.", outcome: "Investigas a fondo las posibles preocupaciones del CTO, preparas respuestas detalladas y datos técnicos. En la reunión, manejas sus preguntas con solvencia y calma. Ganas credibilidad.", impacts: { stamina: -15, aeRelationship: { "Miguel": +1 }, opportunity: "+15%", acv: 0 } }, { text: "Aceptar, pero pedir a Miguel que modere las expectativas del cliente.", outcome: "Accedes a ir, pero le pides a Miguel que intente gestionar mejor las expectativas y el tono de la reunión para que no sea un interrogatorio. Vas preparado, pero con límites.", impacts: { stamina: -10, aeRelationship: { "Miguel": 0 }, opportunity: "+5%", acv: 0 } }, { text: "Sugerir que quizás este cliente no es el adecuado si es tan problemático.", outcome: "Le planteas a Miguel tus dudas sobre si realmente merece la pena tanto esfuerzo por un cliente tan difícil y un ACV moderado. Miguel se siente cuestionado en su labor.", impacts: { stamina: -0, aeRelationship: { "Miguel": -1 }, opportunity: "-20%", acv: 0 } } ] },
    { id: 9, title: "Formación Interna Obligatoria", ae: "Carlos", description: "Recuerda que esta semana tenemos esa formación obligatoria sobre la nueva 'Política de Seguridad de Datos XYZ'. Son 4 horas y sé que es un rollo, pero tenemos que hacerla. Justo coincide con el día que querías preparar la demo de **Logística Global** (potencial 90k ACV).", options: [ { text: "Asistir a la formación completa y recuperar el tiempo de la demo después.", outcome: "Cumples con la formación obligatoria. Tienes que trabajar horas extra o reorganizar otras tareas para preparar la demo a tiempo. Es lo correcto, pero añade estrés.", impacts: { stamina: -10, aeRelationship: { "Carlos": 0 }, acv: 0 } }, { text: "Intentar hacer la formación 'en diagonal' mientras preparas la demo.", outcome: "Tienes la formación abierta en una ventana mientras trabajas en la demo. No prestas atención real a ninguna de las dos cosas. Cumples formalmente, pero con riesgo y poca calidad.", impacts: { stamina: -15, aeRelationship: { "Carlos": -1 }, acv: 0 } }, { text: "Hablar con tu manager y pedir una excepción o posponer la formación.", outcome: "Explicas la criticidad de la demo a tu manager y solicitas posponer la formación. Si lo aprueba, genial. Si no, quedas mal por intentarlo y tienes que ir igualmente.", impacts: { stamina: -3, aeRelationship: { "Carlos": 0 }, acv: 0 } } ] },
    { id: 10, title: "Propuesta Proactiva - Hoteles Paraíso", ae: "Laura", description: "He estado pensando en **Hoteles Paraíso**, un cliente actual que solo usa Sales Cloud. Creo que podríamos venderles Marketing Cloud si les mostramos cómo conectar los datos de reservas con campañas personalizadas. ¿Preparamos una propuesta proactiva y una mini-demo para sorprenderles?", options: [ { text: "¡Buena idea! Investigar su caso y preparar una propuesta personalizada.", outcome: "Te entusiasma la idea. Investigas el sector hotelero, preparas una propuesta atractiva y una demo enfocada en sus posibles necesidades. Es trabajo extra, pero proactivo.", impacts: { stamina: -20, aeRelationship: { "Laura": +1 }, opportunity: "+25% (Nueva)", acv: 0 } }, { text: "Apoyar la idea, pero sugerir usar material estándar para ahorrar tiempo.", outcome: "Te parece bien, pero recomiendas usar slides y demos genéricas para no invertir demasiado tiempo en algo no solicitado. Laura aprecia el apoyo, aunque sea con menos esfuerzo.", impacts: { stamina: -8, aeRelationship: { "Laura": 0 }, opportunity: "+10% (Nueva)", acv: 0 } }, { text: "Mostrar escepticismo. Centrarse en las oportunidades activas ya existentes.", outcome: "Le dices a Laura que es mejor centrarse en cerrar los tratos abiertos que en invertir tiempo en propuestas proactivas con resultado incierto. Laura se desanima un poco.", impacts: { stamina: 0, aeRelationship: { "Laura": -1 }, opportunity: "0%", acv: 0 } } ] }
    // ADD SITUATIONS 11-20 HERE
];

// --- DOM Elements (Cached) ---
let introSection, gameContainer, gameContent, staminaBar, staminaValue, acvBar, acvValue, ae1Hearts, ae2Hearts, ae3Hearts, situationCounter, gameOverScreen, finalTitle, gameOverReason, outcomeEmoji, finalScoreValue, finalAcv, finalSituations, finalStamina, finalAvgRelation, totalSituationsIntro, startGameButton, restartGameButton;

function cacheDOMElements() {
    introSection = document.getElementById('intro');
    gameContainer = document.getElementById('game-container');
    gameContent = document.getElementById('game-content');
    staminaBar = document.getElementById('stamina-bar');
    staminaValue = document.getElementById('stamina-value');
    acvBar = document.getElementById('acv-bar');
    acvValue = document.getElementById('acv-value');
    ae1Hearts = document.getElementById('ae1-hearts');
    ae2Hearts = document.getElementById('ae2-hearts');
    ae3Hearts = document.getElementById('ae3-hearts');
    situationCounter = document.getElementById('situation-counter');
    gameOverScreen = document.getElementById('game-over');
    finalTitle = document.getElementById('final-title');
    gameOverReason = document.getElementById('game-over-reason');
    outcomeEmoji = document.getElementById('outcome-emoji');
    finalScoreValue = document.getElementById('final-score-value');
    finalAcv = document.getElementById('final-acv');
    finalSituations = document.getElementById('final-situations');
    finalStamina = document.getElementById('final-stamina');
    finalAvgRelation = document.getElementById('final-avg-relation');
    totalSituationsIntro = document.getElementById('total-situations-intro');
    startGameButton = document.getElementById('start-game');
    restartGameButton = document.getElementById('restart-game');
}

// --- Initialization ---
function initializeGame() {
    if (!totalSituationsIntro) cacheDOMElements();
    if (totalSituationsIntro) { totalSituationsIntro.textContent = gameState.maxSituations; }
    if (situationCounter) { situationCounter.textContent = `${gameState.currentSituation}/${gameState.maxSituations}`; }
    if (acvValue) { acvValue.textContent = `$${gameState.acv}k / $${gameState.targetAcv}k`; }
    updateUI();
}

// --- Event Listeners ---
function setupEventListeners() {
     if (!startGameButton) cacheDOMElements();
    if(startGameButton) { startGameButton.addEventListener('click', startGame); } else { console.error("Start button not found!"); }
    if(restartGameButton) { restartGameButton.addEventListener('click', restartGame); } else { console.error("Restart button not found!"); }
}

// --- Game Logic Functions ---
function startGame() {
    if (!introSection || !gameContainer) cacheDOMElements();
    introSection.style.display = 'none';
    gameContainer.style.display = 'flex';
    resetGameState();
    loadSituation(gameState.currentSituation);
    updateUI();
}

function resetGameState() {
     gameState.currentSituation = 1;
     gameState.stamina = 100;
     gameState.acv = 0;
     gameState.aeRelationships = { "Carlos": 3, "Laura": 3, "Miguel": 3 };
     gameState.situationHistory = [];
     if(gameContent) gameContent.innerHTML = '';
     if(gameOverScreen) gameOverScreen.style.display = 'none';
     if(gameContent) gameContent.style.display = 'block';
     updateUI(); // Update UI after reset
}

function restartGame() {
    resetGameState();
    loadSituation(gameState.currentSituation);
}


function loadSituation(situationId) {
     if (!gameContent) cacheDOMElements();
     const situation = situations.find(s => s.id === situationId);
     if (!situation) { console.error(`Situation ${situationId} not found!`); gameContent.innerHTML = `<p style='color:red;'>Error: Situación ${situationId} no encontrada.</p>`; return; }

     let html = `<div class="situation">`;
     html += `<div class="situation-title">${situation.title}</div>`;
     html += `<div class="situation-body">`;
     html += `<img class="situation-image" src="img/${situation.id}.png" alt="Imagen para situación ${situation.id}">`;
     html += `<div class="chat-bubble chat-ae"><div class="chat-name">${situation.ae}</div>${situation.description}</div>`;
     html += `</div>`;
     html += `<div class="options">`;
     situation.options.forEach((option, index) => { html += `<div class="option" data-index="${index}"><span class="option-number">${index + 1}</span><span>${option.text}</span></div>`; });
     html += `</div>`;
     html += `</div>`;

     gameContent.innerHTML = html;
     gameContent.scrollTop = 0;

     document.querySelectorAll('.option').forEach(optionElement => {
         optionElement.addEventListener('click', function() {
             if (this.classList.contains('selected') || gameContent.querySelector('#next-situation')) { return; }
             selectOption(situation, parseInt(this.dataset.index));
             document.querySelectorAll('.option').forEach(opt => { opt.style.pointerEvents = 'none'; if (!opt.classList.contains('selected')) { opt.style.opacity = '0.6'; } });
         });
     });
}


function selectOption(situation, optionIndex) {
    const option = situation.options[optionIndex];
    if (!option || !option.impacts) { console.error("Invalid option/impacts:", situation, optionIndex); return; }

    // Apply impacts - hearts logic
    if (typeof option.impacts.stamina === 'number') { gameState.stamina = Math.max(0, Math.min(100, gameState.stamina + option.impacts.stamina)); }
    if (typeof option.impacts.acv === 'number') { gameState.acv = Math.max(0, gameState.acv + option.impacts.acv); }
    const updateAEHearts = (aeName, change) => { if (gameState.aeRelationships.hasOwnProperty(aeName)) { gameState.aeRelationships[aeName] = Math.max(0, Math.min(gameState.maxHearts, gameState.aeRelationships[aeName] + change)); } };
    if (typeof option.impacts.aeRelationship === 'object') { for (const [ae, value] of Object.entries(option.impacts.aeRelationship)) { updateAEHearts(ae, value); } }

    gameState.situationHistory.push({ situationId: situation.id, optionSelected: optionIndex, impacts: option.impacts });
    updateUI(); // Update UI immediately after state change
    displayOutcome(situation, option); // Display outcome message
    checkGameOver(); // Check if game ended
}


function displayOutcome(situation, option) {
     if (!gameContent) cacheDOMElements();
    const selectedOptionElement = gameContent.querySelector(`.option[data-index="${situation.options.indexOf(option)}"]`);
    if (selectedOptionElement) { selectedOptionElement.classList.add('selected'); }

    let outcomeHTML = `<div class="outcome"> <div class="outcome-title">Resultado</div>`;
    outcomeHTML += `<div class="chat-bubble chat-se"> <div class="chat-name">Tú (Acción/Resultado)</div> ${option.outcome} </div>`;
    outcomeHTML += `<div class="impact">`;

    const impacts = option.impacts;
    // Stamina, ACV, Opportunity impacts display
    if (typeof impacts.stamina === 'number') { const change = impacts.stamina; const cl = change > 0 ? 'positive' : (change < 0 ? 'negative' : 'neutral'); const sign = change > 0 ? '+' : ''; const icon = change > 0 ? '🔋' : (change < 0 ? '😩' : '😐'); outcomeHTML += `<div class="impact-item"><span class="impact-icon ${cl}">${icon}</span><div><span class="tooltip">Estamina<span class="tooltiptext">Tu energía.</span></span>: <span class="${cl}">${sign}${change}%</span></div></div>`; }
    if (typeof impacts.acv === 'number' && impacts.acv !== 0) { const change = impacts.acv; const cl = change > 0 ? 'positive' : 'negative'; const sign = change > 0 ? '+' : ''; outcomeHTML += `<div class="impact-item"><span class="impact-icon ${cl}">💰</span><div><span class="tooltip">ACV<span class="tooltiptext">Valor del contrato anual.</span></span>: <span class="${cl}">${sign}${change}k</span></div></div>`; }
    if (typeof impacts.opportunity === 'string') { const val = parseInt(impacts.opportunity) || 0; const cl = val > 0 ? 'positive' : (val < 0 ? 'negative' : 'neutral'); const icon = val > 0 ? '📈' : (val < 0 ? '📉' : '📊'); outcomeHTML += `<div class="impact-item"><span class="impact-icon ${cl}">${icon}</span><div><span class="tooltip">Oportunidad<span class="tooltiptext">Probabilidad de cierre.</span></span>: <span class="${cl}">${impacts.opportunity}</span></div></div>`; }

    // Display heart changes using ❤️ and 💔
    const processAERelHearts = (ae, value) => {
        if (value === 0) return '';
        const cl = value > 0 ? 'positive' : 'negative';
        const sign = value > 0 ? '+' : '';
        const heartIcon = value > 0 ? '❤️' : '💔'; // Broken heart for loss
        return `<div class="impact-item"><span class="impact-icon ${cl}">${heartIcon}</span><div><span class="tooltip">Rel. ${ae}<span class="tooltiptext">Relación con ${ae}.</span></span>: <span class="${cl}">${sign}${Math.abs(value)} ${Math.abs(value) > 1 ? 'corazones' : 'corazón'}</span></div></div>`;
    };
    if (typeof impacts.aeRelationship === 'object') { for (const [ae, value] of Object.entries(impacts.aeRelationship)) { outcomeHTML += processAERelHearts(ae, value); } }

    outcomeHTML += `</div> `;

    const isLastSituation = gameState.currentSituation >= gameState.maxSituations;
    const isGameOver = gameState.stamina <= 0 || Object.values(gameState.aeRelationships).filter(h => h <= 0).length >= 2;

    if (!isGameOver) {
        outcomeHTML += `<button id="next-situation" class="button">${isLastSituation ? 'Ver Puntuación Final' : 'Siguiente Situación'}</button>`;
    } else {
         let gameOverMsg = isGameOver && gameState.stamina <= 0 ? "¡Estamina Agotada!" : "¡Relaciones rotas!";
         outcomeHTML += `<p style='margin-top:15px; text-align:center; color: var(--danger); font-weight:bold;'>${gameOverMsg}</p>`;
    }
    outcomeHTML += `</div> `;

    gameContent.insertAdjacentHTML('beforeend', outcomeHTML);

    const outcomeElement = gameContent.querySelector('.outcome:last-of-type');
    if (outcomeElement) { outcomeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }

    const nextButton = gameContent.querySelector('#next-situation');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            this.disabled = true;
            if (isLastSituation) { showGameComplete(); }
            else { gameState.currentSituation++; loadSituation(gameState.currentSituation); updateUI(); }
        });
    }
}


function updateUI() {
    // Ensure elements are cached
    if (!staminaBar || !acvBar || !ae1Hearts || !ae2Hearts || !ae3Hearts || !staminaValue || !acvValue || !situationCounter) cacheDOMElements();
    if (!staminaBar || !acvBar || !ae1Hearts || !ae2Hearts || !ae3Hearts) return; // Exit if still not found

    // Update Stamina and ACV
    staminaBar.style.width = `${gameState.stamina}%`;
    staminaValue.textContent = `${gameState.stamina}%`;
    if (gameState.stamina < 30) staminaBar.style.backgroundColor = 'var(--danger)'; else if (gameState.stamina < 60) staminaBar.style.backgroundColor = 'var(--warning)'; else staminaBar.style.backgroundColor = 'var(--success)';
    const acvPercentage = gameState.targetAcv > 0 ? Math.min(100, (gameState.acv / gameState.targetAcv) * 100) : 0;
    acvBar.style.width = `${acvPercentage}%`;
    acvValue.textContent = `$${gameState.acv}k / $${gameState.targetAcv}k`;

    // --- CORRECTED: Update AE Hearts (Always show 5 slots, use classes) ---
    const heartElements = { "Carlos": ae1Hearts, "Laura": ae2Hearts, "Miguel": ae3Hearts };
    for (const aeName in heartElements) {
        const container = heartElements[aeName];
        if (container) {
            const currentHearts = gameState.aeRelationships[aeName];
            let heartsHTML = "";
            // Loop always 5 times (for 5 slots)
            for (let i = 1; i <= gameState.maxHearts; i++) {
                // Determine if this slot should be active or inactive
                const heartClass = (i <= currentHearts) ? 'active' : 'inactive';
                // Generate the heart span with the correct class, using same character
                heartsHTML += `<span class="heart ${heartClass}">❤️</span>`;
            }
            // Update the container's content
            container.innerHTML = heartsHTML;
        }
    }

    // Update situation counter
    situationCounter.textContent = `${gameState.currentSituation}/${gameState.maxSituations}`;
}


function calculateFinalScore() {
    const staminaWeight = 0.40; const acvWeight = 0.35; const relationWeight = 0.25;
    const currentStamina = Math.max(0, gameState.stamina);
    const staminaScore = (currentStamina / 100) * staminaWeight * 100;
    const acvProgress = gameState.targetAcv > 0 ? Math.min(1, gameState.acv / gameState.targetAcv) : 0;
    const acvScore = acvProgress * acvWeight * 100;
    const avgHearts = (gameState.aeRelationships.Carlos + gameState.aeRelationships.Laura + gameState.aeRelationships.Miguel) / 3;
    const relationshipScore = (avgHearts / gameState.maxHearts) * relationWeight * 100;
    const totalScore = Math.max(0, Math.min(100, Math.round(staminaScore + acvScore + relationshipScore)));
    console.log(`Score Breakdown: Stamina=${staminaScore.toFixed(1)}, ACV=${acvScore.toFixed(1)}, Relation=${relationshipScore.toFixed(1)} -> Total: ${totalScore}`);
    return totalScore;
}


function checkGameOver() {
    let reason = "";
    let gameOver = false;

    if (gameState.stamina <= 0) {
        reason = "¡Agotado! Has consumido toda tu estamina. La aventura termina aquí. ¡Recuerda cuidarte!";
        gameOver = true;
    } else {
        const brokenRelationships = Object.values(gameState.aeRelationships).filter(h => h <= 0).length;
        if (brokenRelationships >= 2) {
            reason = `¡Relaciones rotas! Has perdido la confianza de ${brokenRelationships} Account Executives. ¡Necesitas mejorar la colaboración!`;
            gameOver = true;
        }
    }

    if (gameOver) {
        if (gameOverScreen && gameOverScreen.style.display !== 'flex') {
             setTimeout(() => { showGameOver(reason); }, 150);
        }
        return true;
    }
    return false;
}


function showGameOver(reason) {
     if (!finalTitle || !finalScoreValue || !gameOverScreen) cacheDOMElements();
     if (!finalTitle) return;

    const finalScore = calculateFinalScore();
    finalTitle.textContent = "¡Fin de la Jornada!";
    gameOverReason.textContent = reason;
    finalScoreValue.textContent = finalScore;
    outcomeEmoji.textContent = "☠️";

    finalAcv.textContent = `$${gameState.acv}k`;
    const finalSituationNum = Math.min(gameState.currentSituation, gameState.maxSituations);
    finalSituations.textContent = `${finalSituationNum}/${gameState.maxSituations}`;
    finalStamina.textContent = `${gameState.stamina}%`; // Show final stamina
    const avgHearts = ((gameState.aeRelationships.Carlos + gameState.aeRelationships.Laura + gameState.aeRelationships.Miguel) / 3).toFixed(1);
    finalAvgRelation.textContent = `${avgHearts}/${gameState.maxHearts}`;

    gameOverScreen.style.display = 'flex';
    if(gameContent) gameContent.style.display = 'none';
}


function showGameComplete() {
     if (!finalTitle || !finalScoreValue || !gameOverScreen) cacheDOMElements();
     if (!finalTitle) return;

     const finalScore = calculateFinalScore();
     let reason = ""; let emoji = "🤔";

     if (finalScore >= 90) { finalTitle.textContent = "¡Leyenda del Presales!"; reason = `¡Increíble! Has dominado cada aspecto del rol. ACV por las nubes, relaciones excelentes y energía de sobra. ¡Eres una máquina!`; emoji = "🏆"; }
     else if (finalScore >= 75) { finalTitle.textContent = "¡Excelente Desempeño!"; reason = `¡Muy bien hecho! Has logrado un gran equilibrio entre resultados, relaciones y bienestar. Un Solution Engineer muy valioso.`; emoji = "🎉"; }
     else if (finalScore >= 50) { finalTitle.textContent = "¡Trabajo Sólido!"; reason = `Has completado la aventura con resultados decentes. Hay áreas de mejora, pero has demostrado ser competente. ¡Sigue así!`; emoji = "👍"; }
     else { finalTitle.textContent = "¡Aventura Superada!"; reason = `Has llegado al final, ¡que no es poco! Sin embargo, los resultados generales son mejorables. ¡Cada día es una oportunidad para aprender!`; emoji = "😬"; }

     gameOverReason.textContent = reason;
     finalScoreValue.textContent = finalScore;
     outcomeEmoji.textContent = emoji;

     finalAcv.textContent = `$${gameState.acv}k`;
     finalSituations.textContent = `${gameState.maxSituations}/${gameState.maxSituations}`;
     finalStamina.textContent = `${gameState.stamina}%`;
     const avgHearts = ((gameState.aeRelationships.Carlos + gameState.aeRelationships.Laura + gameState.aeRelationships.Miguel) / 3).toFixed(1);
     finalAvgRelation.textContent = `${avgHearts}/${gameState.maxHearts}`; // Show avg hearts

     gameOverScreen.style.display = 'flex';
     if(gameContent) gameContent.style.display = 'none';
 }


// --- Initial Setup on DOM Load ---
document.addEventListener('DOMContentLoaded', () => {
    cacheDOMElements();
    setupEventListeners();
    initializeGame();
});