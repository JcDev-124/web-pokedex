const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 6;
let offset = 0;

function convertPokemonToHtml(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
    </li>
`
}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToHtml).join('')
    pokemonList.innerHTML += newHtml
    })

}

loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () =>{
    offset += limit
    const qtdRecord = offset + limit

    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else loadPokemonItens(offset, limit)


}
)

// Adiciona um evento de escuta ao campo de busca
document.getElementById('searchbar').addEventListener('input', function() {
    search();
});

function search() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let pokemons = document.querySelectorAll('.pokemon');

    pokemons.forEach(pokemon => {
        let pokemonName = pokemon.querySelector('.name').innerText.toLowerCase();

        // Verifica se o nome do Pokémon contém o texto digitado
        if (!pokemonName.includes(input)) {
            pokemon.style.display = 'none';
        } else {
            pokemon.style.display = 'list-item';
        }
    });
}
