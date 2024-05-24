document.addEventListener("DOMContentLoaded", function () {
    const rouletteSize = 360;
    const numberOfSlots = 8;
    const slotAngle = 360 / numberOfSlots;
    const degrees = (180 - slotAngle) / 2;
    const slotHeight = Math.tan(degrees * Math.PI / 180) * (rouletteSize / 2);

    const roulette = document.querySelector(".roulette");
    roulette.style.width = rouletteSize + 'px';
    roulette.style.height = rouletteSize + 'px';

    const styleTag = document.createElement('style');
    styleTag.id = 'afterNumber';
    document.head.appendChild(styleTag);

    const iconUnicode = [
        '\uf259',
        '\uf128',
        '\uf0b0',
        '\uf5c3'
    ];

    for (let i = 1; i <= numberOfSlots; i++) {
        const option = document.createElement('div');
        option.className = 'option option-' + i;
        roulette.appendChild(option);

        const classSelector = '.option-' + i;
        option.style.transform = 'rotate(' + slotAngle * i + 'deg)';
        option.style.borderBottomColor = getRandomColor();

        const styleContent = '.option-' + i + '::before {content: "' + iconUnicode[i % 4] + '";}';
        styleTag.innerHTML += styleContent;

        option.dataset.content = i;
        option.dataset.width = (rouletteSize / 2) + 'px';
        option.dataset.line = (rouletteSize / 2) + 'px';
    }

    const options = document.querySelectorAll(".option");
    options.forEach(function (option) {
        option.style.borderBottomWidth = slotHeight + 'px';
        option.style.borderRightWidth = (rouletteSize / 2) + 'px';
        option.style.borderLeftWidth = (rouletteSize / 2) + 'px';
    });

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const challenges = [
        'quizz',
        'diffusion',
        'classification',
        'pose'
    ]
    
    let stoppedValue = null;

    roulette.addEventListener('click', function () {
        let num;
        let numID = 'number-';
        num = 1 + Math.round(Math.random() * (numberOfSlots - 1));
        numID += num;

        stoppedValue = num;

        const animationRoulette = document.getElementById('animationRoulette');
        if (animationRoulette) animationRoulette.remove();

        const styleAnimation = document.createElement('style');
        styleAnimation.id = 'animationRoulette';
        styleAnimation.innerHTML =
            '#number-' + num + ' { animation-name: number-' + num + '; } ' +
            '@keyframes number-' + num + ' {' +
            'from { transform: rotate(0); } ' +
            'to { transform: rotate(' + (360 * (numberOfSlots - 1) - slotAngle * num) + 'deg); }' +
            '}';
        document.head.appendChild(styleAnimation);

        roulette.removeAttribute('id');
        roulette.id = numID;

        console.log('Roulette stopped at slot:', stoppedValue, challenges[(stoppedValue - 1)  % 4]);
        if (challenges[(stoppedValue - 1)  % 4] === 'diffusion') {
            setTimeout(() => {
                window.location.href = 'diffusion.html';
            }, 10000);
			
			// } else if(challenges[(stoppedValue - 1)  % 4] === 'pose') {
				//     setTimeout(() => {
        //         window.location.href = 'pose.html';
        //     }, 10000);
        
        } else if(challenges[(stoppedValue - 1)  % 4] === 'classification') {
            console.log('mandando...')
            let classes;
            fetch('http://localhost:8000/imagenet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slot: stoppedValue })
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);  // Print the returned data
                classes = data;
                const encodedObject = btoa(JSON.stringify(classes));
                const queryString = `?data=${encodeURIComponent(encodedObject)}`;
                window.location.href = 'classification.html' + queryString;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } else {
			setTimeout(() => {
				window.location.href = 'quiz.html';
			}, 10000);
        }
    });
});

