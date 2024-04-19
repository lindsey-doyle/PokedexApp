export type ITypesPokemon = 'grass' | 'fire' | 'water' | 'electric' | 'normal' | 'ice' |
'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' |
'dragon' | 'dark' | 'steel' | 'fairy'

export interface IPokemon {
  name: string,
  id: number
}

export interface IPokemonCard extends IPokemon {
  uri: string,
  types: ITypesPokemon[]
  color: ITypesPokemon
}

export interface IPokemonStats {
  base_stat: number,
  stat: {
    name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defensef' | 'speed',
  },
}

export interface IPokemonFormattedStats {
  hp: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number,
  total: number,
}

export interface IPokemonDetails extends IPokemon {
  sprites: {
    other: {
      'official-artwork': {
        front_default: string,
      },
    },
  },
  types: {
    type: {
      name: ITypesPokemon
    },
  }[],
  abilities: {
    ability: {
      name: string,
    },
  }[],
  weight: number,
  height: number,
  stats: IPokemonStats[],
  species: {
    url: string
  }
}

export interface IPokemonDetailsEvolution {
  id: number,
  name: string,
  image: string,
  color: ITypesPokemon,
  types: ITypesPokemon[],
  evolutions: IPokemonDetailsEvolution[]
  evolution: IEvolutionTriggerMethod
}

export interface IPokemonDetailsCard extends IPokemonCard {
  abilities: string[],
  weight: number,
  height: number,
  description: string,
  version: string,
  habitat: string,
  stats: IPokemonFormattedStats,
  evolution: IPokemonDetailsEvolution
}

export interface IPokemonSpecieFlavorText {
  flavor_text: string,
  language: {
    name: string,
  },
  version: {
    name: string,
  },
}

export interface IPokemonSpecie {
  color: {
    name: string,
  },
  evolution_chain: {
    url: string
  },
  flavor_text_entries: IPokemonSpecieFlavorText[],
  habitat: {
    name: string,
  },
}

export type EvolutionTriggerName =
  'level-up'
  | 'trade'
  | 'use-item'
  | 'shed'
  | 'spin'
  | 'tower-of-darkness'
  | 'tower-of-waters'
  | 'three-critical-hits'
  | 'take-damage'
  | 'other'
  | 'agile-style-move'
  | 'strong-style-move'
  | 'recoil-damage';

export interface IEvolutionDetails {
  item: {
    name: string,
  } | null,
  held_item: {
    name: string,
  } | null,
  min_level: number,
  min_happiness: number,
  relative_physical_stats: number | null,
  time_of_day: string,
  known_move_type: {
    name: string,
  } | null,
  location: {
    name: 'eterna-forest' | 'sinnoh-route-217',
  } | null,
  trigger: {
    name: EvolutionTriggerName,
  },
}

export interface IEvolutionTriggerMethod {
  trigger: string,
  method: string | number,
  css?: {
    [key:string]: string | number
  }
}

export interface IEvolution {
  evolution_details: [IEvolutionDetails] | [],
  species: {
    name: string,
    url: string
  },
  evolves_to: IEvolution[] | []
}

export interface IEvolutionChain {
  chain: IEvolution
}

export interface IDetailsPokemonInfo {
  pokemon: IPokemonDetailsCard,
  handleEvolution(id: number): void,
}

export interface IPokemonCompleteDetails extends
  IPokemonDetails, IPokemonSpecie, IEvolutionChain {}
