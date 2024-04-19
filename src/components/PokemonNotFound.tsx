import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../styles'

export default function PokemonNotFound() {
  return (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundTitle}>Pokemon not found.</Text>
      <Text style={styles.notFoundSubtitle}>Try looking for another pokemon.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  notFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  notFoundTitle: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  notFoundSubtitle: {
    color: COLORS.secundary,
  },
})
