document.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('data');
    if (encodedData) {
        const myObject = JSON.parse(atob(decodeURIComponent(encodedData)));
        displayOptions(myObject);
    }
});

function displayOptions(obj) {
    const featDiv = document.getElementById('feat_map');

    // Create and append the image element
    const image = document.createElement('img');

    // this part ensures the image is always reloded to get the image update
    const timestamp = new Date().getTime();
    image.src = `img/feat_maps/block_{ix}_map.png?${timestamp}`;

    featDiv.appendChild(image);


    const container = document.getElementById('options');

    // Populate the options div with options and explanations
    for (const [option, explanation] of Object.entries(obj)) {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `<p>Option: ${option}</p><p class="explanation">${explanation}</p>`;
        container.appendChild(optionDiv);
    }
}

function showAllExplanations() {
    const explanations = document.querySelectorAll('.explanation');
    explanations.forEach(explanation => {
        explanation.style.display = 'block';
    });
}