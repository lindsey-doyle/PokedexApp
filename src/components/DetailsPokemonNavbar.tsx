import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native'
import DetailsPokemonAbout from './DetailsPokemonAbout'
import DetailsPokemonBaseStats from './DetailsPokemonBaseStats'
import DetailsPokemonEvolution from './DetailsPokemonEvolution'
import { IDetailsPokemonInfo } from '../interfaces'

interface DetailsPokemonNavbarProps extends Pick<IDetailsPokemonInfo, 'handleEvolution'> {
  handlePokemonInformation(component: React.ComponentType<IDetailsPokemonInfo>): void;
}

const pokemonInformation = [
  {
    name: 'About',
    component: DetailsPokemonAbout,
  },
  {
    name: 'Base Stats',
    component: DetailsPokemonBaseStats,
  },
  {
    name: 'Evolution',
    component: DetailsPokemonEvolution,
  },
]

const firstInformation = pokemonInformation[0]

export default function DetailsPokemonNavbar({
  handlePokemonInformation,
}: DetailsPokemonNavbarProps) {
  const [
    informationDisplay,
    setInformationDisplay,
  ] = useState<string>(firstInformation.name)

  useEffect(() => {
    handleInformation(firstInformation.name, firstInformation.component)
  }, [])

  const handleInformation = (
    name: string,
    component: React.ComponentType<IDetailsPokemonInfo>,
  ): void => {
    handlePokemonInformation(component)
    setInformationDisplay(name)
  }

  return (
    <View style={styles.container}>
      {pokemonInformation.map(({ name, component }) => (
        <TouchableOpacity
          key={name}
          onPress={() => handleInformation(name, component)}
        >
          <Text
            style={[
              styles.textNavbar,
              informationDisplay === name ? styles.informationDisplay : {},
            ]}
          >
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 17,
  },
  textNavbar: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#91969c',
  },
  informationDisplay: {
    color: '#2c304f',
    borderBottomWidth: 2,
    borderBottomColor: '#2c304f',
    paddingBottom: 13,
  },
})
