import React from 'react'
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native'
import type { IPokemonCard } from '../interfaces'
import { TypesPokemons, PokemonFactory } from '../utils'
import { COLORS } from '../styles'

interface PokemonCardProps extends IPokemonCard {
  handlePress(id: number): void;
}

const PokemonCard = React.memo(({
  name, id, uri, types, handlePress, color,
}: PokemonCardProps) => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={() => handlePress(id)}
  >
    <View
      style={[styles.container, { backgroundColor: TypesPokemons[color].color }]}
    >
      <View style={styles.containerId}>
        <Text style={styles.id}>{`#${PokemonFactory.PokemonID(id)}`}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image
          source={{
            uri,
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.containerTypes}>
        {
          types.map((type) => (
            <View key={type} style={styles.containerType}>
              <Text style={styles.type}>{type}</Text>
            </View>
          ))
        }
      </View>
    </View>
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginHorizontal: 7.5,
    borderRadius: 15,
    width: 150,
    height: 215,
    alignItems: 'center',
  },
  containerId: {
    alignSelf: 'flex-end',
    marginRight: 9,
    marginTop: 4,
  },
  id: {
    fontSize: 12,
    color: '#6a6d80',
    fontWeight: '500',
  },
  containerImage: {
    marginTop: 6,
    marginBottom: 7,
  },
  image: {
    width: 120,
    height: 120,
  },
  name: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 17,
  },
  containerTypes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  containerType: {
    width: 70,
    alignItems: 'center',
    height: 30,
  },
  type: {
    fontSize: 13,
    color: COLORS.primary,
  },
})

export default PokemonCard
