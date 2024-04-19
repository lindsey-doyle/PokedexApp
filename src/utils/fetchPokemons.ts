import type {
  IEvolutionChain,
  IPokemonCard,
  IPokemonDetails,
  IPokemonDetailsCard,
  IPokemonSpecie,
  IEvolution,
  IPokemonDetailsEvolution,
} from '../interfaces'
import PokemonFactory from './PokemonFactory'

const URL_BASE = 'https://pokeapi.co/api/v2/'
export const POKEMON_LIMIT = 20
const POKEMON_URL = `${URL_BASE}/pokemon`
const REGEX_URL_ID = /\/(\d+)\//

type ResponsePokemon = {
  results: {
    url: string
  }[]
}

export const fetchPokemon = async (
  pokemon: number | string,
): Promise<IPokemonDetails | undefined> => {
  try {
    const response = await fetch(`${POKEMON_URL}/${pokemon}`)
    const json = await response.json() as IPokemonDetails
    return json
  } catch (_error) {
    return undefined
  }
}

const fetchPokemonSpecie = async (url: string): Promise<IPokemonSpecie> => {
  const response = await fetch(url)
  const json = await response.json() as IPokemonSpecie
  return json
}

const fetchEvolutionDetails = async (
  evolution: IEvolution,
  evolutionChain: IPokemonDetailsEvolution,
): Promise<void> => {
  const matches = evolution.species.url.match(REGEX_URL_ID) as RegExpMatchArray
  const pokemon = await fetchPokemon(Number(matches[1])) as IPokemonDetails
  const formattedEvolution = PokemonFactory.EvolutionCard(pokemon, evolution)

  evolutionChain.evolutions.push(formattedEvolution)

  if (evolution.evolves_to.length > 0) {
    for (const subEvolution of evolution.evolves_to) {
      await fetchEvolutionDetails(subEvolution, formattedEvolution)
    }
  }
}

const fetchEvolutionChain = async (url: string): Promise<IPokemonDetailsEvolution> => {
  const response = await fetch(url)
  const json = await response.json() as IEvolutionChain

  const { chain } = json
  const matches = chain.species.url.match(REGEX_URL_ID) as RegExpMatchArray
  const firstPokemon = await fetchPokemon(Number(matches[1])) as IPokemonDetails
  const evolutionChain = PokemonFactory.EvolutionCard(firstPokemon, chain)

  if (chain.evolves_to.length > 0) {
    for (const evolution of chain.evolves_to) {
      await fetchEvolutionDetails(evolution, evolutionChain)
    }
  }

  return evolutionChain
}

const fetchPokemonsDetails = async (url: string): Promise<IPokemonCard> => {
  const response = await fetch(url)
  const pokemons = await response.json() as IPokemonDetails
  return PokemonFactory.PokemonCard(pokemons) as IPokemonCard
}

export const fetchPokemons = async (
  limit = POKEMON_LIMIT,
  offset = 0,
): Promise<IPokemonCard[]> => {
  const url = `${POKEMON_URL}?limit=${limit}&offset=${offset}`
  const response = await fetch(url)
  const json = await response.json() as ResponsePokemon
  const pokemons = await Promise.all(
    json.results.map(async (pokemon) => fetchPokemonsDetails(pokemon.url)),
  )
  return pokemons
}

export const fetchCompletePokemon = async (id: number): Promise<IPokemonDetailsCard> => {
  const pokemon = await fetchPokemon(id) as IPokemonDetails
  const pokemonSpecie = await fetchPokemonSpecie(pokemon.species.url)
  const evolutionChain = await fetchEvolutionChain(pokemonSpecie.evolution_chain.url)
  return PokemonFactory.PokemonDetailsCard(pokemon, pokemonSpecie, evolutionChain)
}
