import React from 'react'
import { View, StyleSheet } from 'react-native'
import { POKEMON_LIMIT } from '../utils'

export default function SkeletonPokemonCard() {
  const skeletons = Array.from({ length: POKEMON_LIMIT })

  return (
    <View style={styles.skeletonContainer}>
      {skeletons.map((_, index) => (
        <View style={styles.skeletonCard} key={index}>
          <View style={styles.skeletonId} />
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonInfo}>
            <View style={styles.skeletonName} />
            <View style={styles.skeletonTypes}>
              <View style={[styles.skeletonType, { marginRight: 8 }]} />
              <View style={styles.skeletonType} />
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonCard: {
    marginBottom: 15,
    marginHorizontal: 7.5,
    borderRadius: 15,
    width: 150,
    height: 215,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  skeletonId: {
    alignSelf: 'flex-end',
    marginRight: 9,
    borderRadius: 5,
    marginTop: 4,
    height: 16,
    width: 20,
    backgroundColor: '#c7c7c7',
  },
  skeletonImage: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginTop: 6,
    backgroundColor: '#c7c7c7',
  },
  skeletonInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  skeletonName: {
    width: 90,
    height: 16,
    marginTop: 4,
    borderRadius: 5,
    backgroundColor: '#c7c7c7',
  },
  skeletonTypes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  skeletonType: {
    width: 50,
    height: 14,
    marginRight: 4,
    borderRadius: 5,
    backgroundColor: '#c7c7c7',
  },
})
