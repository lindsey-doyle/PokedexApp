import React from 'react'
import {
  View, Text, StyleSheet,
} from 'react-native'
import type { IDetailsPokemonInfo } from '../interfaces'
import { heightToFeetAndInches, weightToLibra } from '../utils'

export default function DetailsPokemonAbout({ pokemon }: IDetailsPokemonInfo) {
  const {
    abilities, weight, height, description, habitat, version,
  } = pokemon

  const validateInfo = (info: string): boolean => info.length > 0

  const renderInfo = (label: string, value: string) => (
    <View style={styles.row}>
      <Text style={styles.field}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )

  return (
    <View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {description}
        </Text>
        <Text style={styles.version}>{`from Pokemon ${version}`}</Text>
      </View>
      {renderInfo('Height', `${heightToFeetAndInches(height)} (${height / 10} m)`)}
      {renderInfo('Weight', `${weightToLibra(weight)} (${weight} kg)`)}
      {validateInfo(habitat) && renderInfo('Habitat', habitat)}
      {renderInfo('Abilities', abilities.join(', '))}
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer: {
    marginBottom: 5,
  },
  description: {
    color: '#2c304f',
  },
  version: {
    textAlign: 'right',
    fontSize: 12,
    color: '#6e7278',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  field: {
    color: '#6e7278',
    marginRight: 45,
    width: 73,
  },
  value: {
    color: '#2c304f',
  },
})
