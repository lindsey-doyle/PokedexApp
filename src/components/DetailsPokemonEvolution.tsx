import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native'
import { IDetailsPokemonInfo, IPokemonDetailsEvolution } from '../interfaces'
import { PokemonFactory, TypesPokemons } from '../utils'

interface RenderPokemonProps extends IPokemonDetailsEvolution {
  position?: {
    index: number,
    total: number,
  },
}

export default function DetailsPokemonEvolution(
  { pokemon: { evolution }, handleEvolution }: IDetailsPokemonInfo,
) {
  const getArrowRotation = (position: { index: number, total: number }): string => {
    const arrowRotationMapping: { [key: number]: { [key: number]: string } } = {
      2: {
        0: '-30deg',
        1: '30deg',
      },
      3: {
        0: '-45deg',
        1: '0deg',
        2: '45deg',
      },
    }

    const rotation = arrowRotationMapping[position.total]?.[position.index]
    return rotation ?? '0deg'
  }

  const validateEvolution = (
    level: string | number | undefined,
  ): boolean => !level

  const renderPokemonCard = ({
    id, color, image, name, types,
  }: RenderPokemonProps) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => handleEvolution(id)}
      key={id}
      style={[
        styles.pokemonCard,
        {
          backgroundColor: TypesPokemons[color].color,
          height: types.length > 1 ? 155 : 135,
        },
      ]}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.id}>{`#${PokemonFactory.PokemonID(id)}`}</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.typesContainer}>
        {types.map((type) => (
          <Text style={styles.type} key={type}>
            {type}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  )

  const renderPokemon = (pokemon: RenderPokemonProps) => {
    const { evolution: { trigger, method, css }, position } = pokemon
    return (
      <View style={styles.containerPokemon}>
        {!validateEvolution(method) && (
          <View style={styles.nextEvolutionContainer}>
            <Ionicons
              name="arrow-forward-sharp"
              style={[
                styles.arrowForward,
                position ? { transform: [{ rotate: getArrowRotation(position) }] } : {},
              ]}
            />
            <View style={styles.triggerContainer}>
              <Text style={styles.trigger}>
                {trigger}
                <Text style={css}>
                  {' '}
                  {method}
                </Text>
              </Text>
            </View>
          </View>
        )}
        {renderPokemonCard(pokemon)}
      </View>
    )
  }

  const renderEvolutions = (evolutions: IPokemonDetailsEvolution[]) => {
    if (evolutions.length > 1) {
      return (
        <View style={styles.evolutionsColumn}>
          {evolutions.map((pokemon, index) => (
            <View
              key={pokemon.id}
              style={[styles.evolutionContainer, { marginBottom: 12 }]}
            >
              {renderPokemon({
                ...pokemon,
                position: { index, total: evolutions.length },
              })}
              {pokemon.evolutions.length > 0 && renderEvolutions(pokemon.evolutions)}
            </View>
          ))}
        </View>
      )
    }

    return evolutions.map((pokemon) => (
      <View key={pokemon.id} style={styles.evolutionContainer}>
        {renderPokemon(pokemon)}
        {pokemon.evolutions.length > 0 && renderEvolutions(pokemon.evolutions)}
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      {renderPokemon(evolution)}
      {evolution.evolutions.length > 0 && renderEvolutions(evolution.evolutions)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  containerPokemon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  evolutionsColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  evolutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokemonCard: {
    borderRadius: 15,
    paddingHorizontal: 3,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginTop: 6,
    marginBottom: 7,
  },
  id: {
    fontSize: 12,
    color: '#6a6e7a',
  },
  name: {
    fontSize: 11,
    marginBottom: 3,
    color: '#2c304f',
    fontWeight: 'bold',
  },
  typesContainer: {
    marginBottom: 10,
  },
  type: {
    fontSize: 12,
    color: '#2c304f',
  },
  nextEvolutionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 61,
  },
  arrowForward: {
    fontSize: 23,
    color: '#6a6e7a',
  },
  triggerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trigger: {
    fontSize: 11,
    textAlign: 'center',
  },
})
