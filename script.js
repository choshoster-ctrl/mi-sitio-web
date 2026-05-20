const answers = {
    q1: 'Núcleo',
    q2: 'Membrana',
    q3: 'Citoplasma'
};

let correctCount = 0;
const answered = {
    q1: false,
    q2: false,
    q3: false
};

function checkAnswer(questionId, selectedAnswer) {
    if (answered[questionId]) return; // Si ya la respondió bien, no hace nada

    const questionDiv = document.getElementById(questionId);
    const buttons = questionDiv.querySelectorAll('button');
    const feedbackP = questionDiv.querySelector('.feedback');
    const correctAnswer = answers[questionId];

    buttons.forEach(btn => {
        // Encontramos el botón que el usuario clickeó
        if (btn.getAttribute('onclick').includes(`'${selectedAnswer}'`)) {
             if (selectedAnswer === correctAnswer) {
                btn.classList.add('correct');
                feedbackP.innerText = '¡Correcto! 🌟';
                feedbackP.className = 'feedback correct-text';
                answered[questionId] = true;
                correctCount++;
                checkAllDone();
             } else {
                btn.classList.add('incorrect');
                feedbackP.innerText = 'Casi... ¡Inténtalo de nuevo! 💡';
                feedbackP.className = 'feedback incorrect-text';
                
                // Quitamos el color rojo después de 1.5 segundos
                setTimeout(() => {
                    btn.classList.remove('incorrect');
                    feedbackP.innerText = '';
                }, 1500);
             }
        }
    });
}

function checkAllDone() {
    if (correctCount === 3) {
        document.getElementById('success-message').classList.remove('hidden');
        createConfetti();
    }
}

// Función para crear efecto de confeti cuando ganan
function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#1dd1a1', '#5f27cd', '#54a0ff'];
    for(let i=0; i<80; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '12px';
        confetti.style.height = '12px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'; // Círculos o cuadrados
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);

        const duration = Math.random() * 2 + 1.5; // Entre 1.5 y 3.5s
        const delay = Math.random() * 1.5;

        confetti.animate([
            { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${Math.random()*200 - 100}px, 100vh, 0) rotate(${Math.random()*720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'ease-in',
            fill: 'forwards'
        });
        
        // Limpiamos el DOM
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}
