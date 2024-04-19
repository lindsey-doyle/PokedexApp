import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IDetailsPokemonInfo } from '../interfaces'

export default function DetailsPokemonBaseStats(
  { pokemon: { stats } }: IDetailsPokemonInfo,
) {
  const {
    hp, attack, defense, specialAttack, specialDefense, speed, total,
  } = stats

  const getBarWidth = (value: number) => {
    const maxValue = 100
    const width = (value / maxValue) * 100
    return width > 100 ? '100%' : `${width}%`
  }

  const getStatStyle = (value: number) => {
    const lowThreshold = 50
    const highThreshold = 70

    if (value < lowThreshold) {
      return styles.lowStat
    } if (value > highThreshold) {
      return styles.highStat
    }
    return styles.averageStat
  }

  function renderStat(label: string, value: number) {
    return (
      <View style={styles.row}>
        <Text style={styles.field}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        <View style={styles.bar}>
          <View
            style={[styles.statBar, { width: getBarWidth(value) }, getStatStyle(value)]}
          />
        </View>
      </View>
    )
  }

  return (
    <View>
      {renderStat('HP', hp)}
      {renderStat('Attack', attack)}
      {renderStat('Defense', defense)}
      {renderStat('Sp. Atk', specialAttack)}
      {renderStat('Sp. Def', specialDefense)}
      {renderStat('Speed', speed)}
      <View style={styles.row}>
        <Text style={[styles.field, { fontWeight: 'bold' }]}>Total</Text>
        <Text style={[styles.value, { fontWeight: 'bold' }]}>{total}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  field: {
    color: '#6e7278',
    marginRight: 30,
    width: 60,
  },
  value: {
    color: '#2c304f',
    marginRight: 25,
    textAlign: 'right',
    width: 28,
  },
  bar: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'rgb(228 228 231)',
    borderRadius: 10,
    height: 3,
  },
  statBar: {
    height: 3,
    borderRadius: 10,
  },
  lowStat: {
    backgroundColor: 'red',
  },
  averageStat: {
    backgroundColor: 'yellow',
  },
  highStat: {
    backgroundColor: 'green',
  },
})
