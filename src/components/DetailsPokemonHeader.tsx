import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native'
import { PokemonFactory } from '../utils'

type DetailsPokemonHeaderProps = {
  id: number
  name: string
  handleBackButton(): void
}

export default function DetailsPokemonHeader(
  { id, name, handleBackButton }:DetailsPokemonHeaderProps,
) {
  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity
        style={styles.containerBackButton}
        onPress={handleBackButton}
      >
        <Ionicons name="chevron-back-sharp" style={styles.backButton} />
      </TouchableOpacity>
      <View style={styles.containerTitle}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>{`#${PokemonFactory.PokemonID(id)}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    paddingTop: 40,
    marginTop: 40,
    marginBottom: 10,
  },
  containerBackButton: {
    height: 28,
    width: 28,
    marginTop: 4,
  },
  backButton: {
    fontSize: 27,
    color: '#5e616f',
  },
  containerTitle: {
    width: '100%',
    flex: 1,
    marginRight: 28,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c304f',
  },
  id: {
    color: '#6a6e7a',
    fontSize: 16,
  },
})
