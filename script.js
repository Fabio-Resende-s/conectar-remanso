document.addEventListener('DOMContentLoaded', function() {
    // Atualizar relógio em tempo real
    function updateClock() {
        const now = new Date();
        const clock = document.getElementById('clock');
        const date = document.getElementById('date');
        
        // Formatar hora
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Formatar data em português
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        date.textContent = now.toLocaleDateString('pt-BR', options);
    }
    
    // Inicializar relógio
    updateClock();
    setInterval(updateClock, 1000);
    
    // Botão secreto
    const secretBtn = document.getElementById('secret-btn');
    const secretMessage = document.getElementById('secret-message');
    
    secretBtn.addEventListener('click', function() {
        secretMessage.classList.toggle('hidden');
        
        if (!secretMessage.classList.contains('hidden')) {
            secretBtn.innerHTML = '<i class="fas fa-lock-open"></i> Mensagem Revelada!';
            createConfetti();
        } else {
            secretBtn.innerHTML = '<i class="fas fa-lock"></i> Clique para uma surpresa!';
        }
    });
    
    // Contador animado
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target === 1000 ? "∞" : target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Iniciar animação dos contadores
    setTimeout(() => {
        animateCounter(document.getElementById('love-days'), 365, 2000);
        animateCounter(document.getElementById('hearts'), 1000, 2500);
    }, 1000);
    
    // Controle de música
    const music = document.getElementById('background-music');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    
    playBtn.addEventListener('click', function() {
        music.play();
        playBtn.innerHTML = '<i class="fas fa-volume-up"></i> Tocando...';
    });
    
    pauseBtn.addEventListener('click', function() {
        music.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i> Tocar Música';
    });
    
    // Efeito de digitação na mensagem principal
    const mainMessage = document.getElementById('main-message');
    const originalText = "Que este novo dia seja repleto de alegrias, conquistas e motivos para sorrir.";
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            mainMessage.textContent = originalText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Iniciar efeito de digitação após 1 segundo
    setTimeout(typeWriter, 1000);
    
    // Efeitos nas memórias
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            this.style.background = 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
                this.style.background = 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)';
            }, 300);
        });
    });
    
    // Sistema de confete
    function createConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confettiPieces = [];
        const colors = ['#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#f1c40f'];
        
        // Criar partículas de confete
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 10 + 5,
                d: Math.random() * 10 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
                tiltAngle: 0
            });
        }
        
        // Função para desenhar confete
        function drawConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confettiPieces.forEach((p, i) => {
                ctx.beginPath();
                ctx.lineWidth = p.r / 2;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
                ctx.stroke();
                
                // Atualizar posição
                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                p.x += Math.sin(p.d);
                p.tilt = Math.sin(p.tiltAngle) * 15;
                
                // Se a partícula sair da tela, reiniciar no topo
                if (p.y > canvas.height) {
                    confettiPieces[i] = {
                        x: Math.random() * canvas.width,
                        y: -20,
                        r: p.r,
                        d: p.d,
                        color: p.color,
                        tilt: p.tilt,
                        tiltAngleIncremental: p.tiltAngleIncremental,
                        tiltAngle: p.tiltAngle
                    };
                }
            });
            
            requestAnimationFrame(drawConfetti);
        }
        
        drawConfetti();
        
        // Limpar confete após 5 segundos
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 5000);
    }
    
    // Mensagem aleatória de bom dia (pode expandir essa lista)
    const goodMorningMessages = [
        "Que seu dia seja tão brilhante quanto seu sorriso!",
        "Bom dia, meu amor! Você é a razão do meu sorriso hoje.",
        "Que cada momento do seu dia seja especial, assim como você é para mim.",
        "Bom dia, princesa! Hoje é um novo dia para ser incrível.",
        "Acordar pensando em você já faz meu dia melhor. Bom dia, amor!"
    ];
    
    // Alterar mensagem de bom dia periodicamente
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * goodMorningMessages.length);
        mainMessage.textContent = goodMorningMessages[randomIndex];
        
        // Efeito de transição
        mainMessage.style.opacity = '0';
        setTimeout(() => {
            mainMessage.style.opacity = '1';
        }, 500);
    }, 10000); // Muda a cada 10 segundos
    
    // Efeito de digitação nas mensagens pessoais
    const personalMessages = document.querySelectorAll('.personal-message p');
    personalMessages.forEach((msg, index) => {
        const originalMsg = msg.textContent;
        msg.textContent = '';
        
        setTimeout(() => {
            let charIndex2 = 0;
            function typePersonal() {
                if (charIndex2 < originalMsg.length) {
                    msg.textContent += originalMsg.charAt(charIndex2);
                    charIndex2++;
                    setTimeout(typePersonal, 30);
                }
            }
            typePersonal();
        }, 1500 + (index * 1000)); // Delay entre mensagens
    });
});