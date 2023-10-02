const pokemonList = document.getElementById('pokemonList')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li  class="pokemon ${pokemon.type}">
            <div  id="pokemondetalhes">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
            </div>
            <div class="caracteristicas" id="caracteristicas">
                
                <div class="habilidades">

                    <ol class="listadimensoes" >
                    <p class="titulo">Dimensões</p>

                        <li class="dimensoes">
                            altura:${pokemon.height}
                        </li>
                        <li class="dimensoes">
                            largura:${pokemon.weight}
                        </li>
                    </ol>
                   
                </div>
                <div class="listadimensoes">

                    <ol class="abilities">
                    <p class="titulo">Habilidades</p>

                    ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                    </ol>
                   
                </div>
             </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})