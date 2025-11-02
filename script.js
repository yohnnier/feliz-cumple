$(document).ready(function() {
    const loveMessage = "¡Feliz cumpleaños te desea la ASENF!";
    const textElement = $("#love-text");
    let index = 0;

    const confettiColors = ['#FFD700', '#F472B6', '#81D4FA', '#B2DFDB', '#D1C4E9', '#FFFFFF'];
    
    const textColors = ['#E91E63', '#9C27B0', '#2196F3', '#00BCD4','#FFC107'];

    function type() {
        if (index < loveMessage.length) {
            textElement.append(loveMessage.charAt(index));
            index++;
            setTimeout(type, 150); 
        } else {
            animateTextColor();
        }
    }

    function animateTextColor() {
        let colorIndex = 0;
        gsap.to(textElement, {
            duration: 3, 
            color: textColors[0], 
            ease: "power1.inOut",
            onComplete: function() {
                function cycleColors() {
                    colorIndex = (colorIndex + 1) % textColors.length;
                    gsap.to(textElement, {
                        duration: 3,
                        color: textColors[colorIndex],
                        ease: "power1.inOut",
                        onComplete: cycleColors 
                    });
                }
                cycleColors(); 
            }
        });
    }

    setTimeout(type, 6000);

    const confettiContainer = $('.confetti-container');

    function createConfetti() {
        const confetti = $('<div class="confetti"></div>');
        const size = Math.random() * 12 + 8; 
        const x = Math.random() * 100;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        if (Math.random() > 0.9) {
            confetti.html('♥').css({
                'font-size': size * 1.5 + 'px',
                'border-radius': 0
            });
        } else {
             confetti.css({
                'width': size + 'px',
                'height': size + 'px',
             });
        }
        
        confetti.css({
            'background-color': color,
            'color': color,
            'left': x + '%'
        });

        confettiContainer.append(confetti);

        gsap.to(confetti, {
            y: '100vh',
            x: '+= ' + (Math.random() - 0.5) * 300,
            rotation: Math.random() * 360 - 180,
            duration: Math.random() * 5 + 6, 
            ease: 'none',
            onComplete: () => {
                confetti.remove();
            }
        });
    }

    setInterval(createConfetti, 80);
});
