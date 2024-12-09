const modeToggle = document.getElementById('mode-toggle');
const cursorToggle = document.getElementById('cursor-toggle');
const cursorHighlightCircle = document.querySelector('.cursor-highlight-circle');
const body = document.body;

let isCursorHighlightEnabled = false;

// Dark Mode Toggle
modeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
});

// Cursor Highlight Toggle
cursorToggle.addEventListener('click', function() {
    isCursorHighlightEnabled = !isCursorHighlightEnabled;
    if (isCursorHighlightEnabled) {
        body.classList.add('cursor-highlight-enabled');
        document.addEventListener('mousemove', updateCursorHighlightPosition);
    } else {
        body.classList.remove('cursor-highlight-enabled');
        document.removeEventListener('mousemove', updateCursorHighlightPosition);
    }
});

function updateCursorHighlightPosition(event) {
    cursorHighlightCircle.style.left = `${event.clientX - 25}px`;
    cursorHighlightCircle.style.top = `${event.clientY - 25}px`;
}

async function fetchPokemonData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await response.json();
    return {
        name: data.name,
        description: data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text
    };
}

function toggleFlashcard(flashcard) {
    flashcard.classList.toggle('flipped');
}

async function loadRandomPokemon(flashcardIndex) {
    const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokémon in the API
    const pokemonData = await fetchPokemonData(randomId);
    document.getElementById(`flashcardTitle${flashcardIndex}`).innerText = pokemonData.name;
    document.getElementById(`flashcardDescription${flashcardIndex}`).innerText = pokemonData.description;
}

async function shuffleFlashcards() {
    await loadRandomPokemon(1);
    await loadRandomPokemon(2);
    await loadRandomPokemon(3);
}

shuffleFlashcards();