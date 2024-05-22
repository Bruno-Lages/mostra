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

    roulette.addEventListener('click', function () {
        let num;
        let numID = 'number-';
        num = 1 + Math.round(Math.random() * (numberOfSlots - 1));
        numID += num;

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
    });
});

