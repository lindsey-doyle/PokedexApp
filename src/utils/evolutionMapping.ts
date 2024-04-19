import {
  EvolutionTriggerName,
  IEvolutionDetails,
  IEvolutionTriggerMethod,
} from '../interfaces'
import { capitalizeFirstLetter, removeHyphenAndCapitalize } from './formatString'
import { LOCATION_MAPPING, LocationMapping } from './locationMapping'

const FONT_BOLD = { fontWeight: 'bold' }

type EvolutionMap = {
  [key in EvolutionTriggerName]: (pokemon: IEvolutionDetails) => IEvolutionTriggerMethod;
};

const verifyPhysicalStats = (physicalStat: number | null): string => {
  if (!physicalStat) {
    return ''
  } if (physicalStat > 0) {
    return 'Attack > Defense'
  } if (physicalStat < 0) {
    return 'Attack < Defense'
  }
  return 'Attack = Defense'
}

const verifyHappiness = (time: string | null): IEvolutionTriggerMethod | null => {
  if (!time) return null
  return {
    trigger: 'Happiness at',
    method: `${capitalizeFirstLetter({ name: time })}time`,
  }
}

const verifyLocation = (
  location: null |
  { name: LocationMapping },
): IEvolutionTriggerMethod | null => {
  if (!location || !location.name) return null
  return {
    trigger: 'Use',
    method: LOCATION_MAPPING[location.name],
    css: FONT_BOLD,
  }
}

const verifyMoveType = (
  move: null |
  { name: string },
): IEvolutionTriggerMethod | null => {
  if (!move || !move.name) return null
  return {
    trigger: 'Affection knowing move of type',
    method: move.name.toUpperCase(),
    css: FONT_BOLD,
  }
}

const getLevel = (pokemon: IEvolutionDetails): IEvolutionTriggerMethod => {
  const trigger = 'Level'
  let method: number | string = pokemon.min_level

  const physicalStatsMethod = verifyPhysicalStats(pokemon.relative_physical_stats)
  if (physicalStatsMethod) {
    method = physicalStatsMethod
  }

  const happinessMethod = verifyHappiness(pokemon.time_of_day)
  if (happinessMethod) {
    return happinessMethod
  }

  const moveTypeMethod = verifyMoveType(pokemon.known_move_type)
  if (moveTypeMethod) {
    return moveTypeMethod
  }

  const locationMethod = verifyLocation(pokemon.location)
  if (locationMethod) {
    return locationMethod
  }

  return {
    trigger,
    method,
  }
}

const getTrade = (pokemon: IEvolutionDetails): IEvolutionTriggerMethod => ({
  trigger: 'Trade holding',
  method: removeHyphenAndCapitalize(pokemon.held_item),
  css: FONT_BOLD,
})

const getUseItem = (pokemon: IEvolutionDetails): IEvolutionTriggerMethod => ({
  trigger: 'Use',
  method: removeHyphenAndCapitalize(pokemon.item),
  css: FONT_BOLD,
})

const getShed = (pokemon: IEvolutionDetails): IEvolutionTriggerMethod => ({
  trigger: 'Shed',
  method: removeHyphenAndCapitalize(pokemon.item),
  css: FONT_BOLD,
})

const getSpin = (pokemon: IEvolutionDetails): IEvolutionTriggerMethod => ({
  trigger: 'Use',
  method: removeHyphenAndCapitalize(pokemon.item),
  css: FONT_BOLD,
})

const getTowerOfDarkness = (pokemon: IEvolutionDetails): IEvolutionTriggerMethod => ({
  trigger: 'Use',
  method: removeHyphenAndCapitalize(pokemon.item),
  css: FONT_BOLD,
})

const evolutionMapping: EvolutionMap = {
  'level-up': getLevel,
  trade: getTrade,
  'use-item': getUseItem,
  shed: getShed,
  spin: getSpin,
  'tower-of-darkness': getTowerOfDarkness,
  'tower-of-waters': getTowerOfDarkness,
  'three-critical-hits': getTowerOfDarkness,
  'take-damage': getTowerOfDarkness,
  other: getTowerOfDarkness,
  'agile-style-move': getTowerOfDarkness,
  'strong-style-move': getTowerOfDarkness,
  'recoil-damage': getTowerOfDarkness,
}

const getEvolution = (
  pokemon: IEvolutionDetails,
): IEvolutionTriggerMethod => evolutionMapping[pokemon.trigger.name](pokemon)

export default getEvolution
