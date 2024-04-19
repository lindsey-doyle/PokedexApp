import React, { useState, useEffect, useCallback } from 'react'
import {
  FlatList, StyleSheet, View, Text, 
} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  fetchPokemons, 
  POKEMON_LIMIT, 
} from '../utils'
import type { IPokemonCard, IScreens } from '../interfaces'
import {
  PokemonCard, 
  SkeletonPokemonCard,
} from '../components'
import { BACKGROUND_COLOR, COLORS } from '../styles'

type HomeProps = {
  navigation: NativeStackNavigationProp<IScreens, 'Home'>,
}

export default function Home({ navigation }: HomeProps) {
  const [pokemons, setPokemons] = useState<IPokemonCard[]>([])
  const [loadingPokemons, setLoadingPokemons] = useState(true)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemons = await fetchPokemons()
      setPokemons(fetchedPokemons)
      setLoadingPokemons(false)
    }
    fetchData()
  }, [])

  const loadMorePokemons = async () => {
    if (loading || pokemons.length < POKEMON_LIMIT) return

    setLoading(true)
    const newOffset = offset + POKEMON_LIMIT
    const newPokemons = await fetchPokemons(POKEMON_LIMIT, newOffset)
    setPokemons([...pokemons, ...newPokemons])
    setOffset(newOffset)
    setLoading(false)
  }

  const handleDetailsPokemon = useCallback((id: number) => {
    navigation.navigate('DetailsPokemon', { id })
  }, [navigation])

  const renderPokemonCard = ({ item }: { item: IPokemonCard }) => (
    <PokemonCard
      name={item.name}
      id={item.id}
      uri={item.uri}
      types={item.types}
      color={item.color}
      handlePress={handleDetailsPokemon}
    />
  )

  const renderSkeletonPokemonCard = () => <SkeletonPokemonCard />

  const renderListFooter = () => {
    if (loading) {
      return renderSkeletonPokemonCard()
    }
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>
          A collection of Pokémons fetched from the PokéAPI. Click on a card to see more information!
        </Text>
      </View>
      {loadingPokemons ? renderSkeletonPokemonCard() : (
        <FlatList
          data={pokemons}
          numColumns={2}
          renderItem={renderPokemonCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.containerPokemons}
          ListFooterComponent={renderListFooter()}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePokemons}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,  
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 28,

  },
  containerTitle: {
    marginTop: 20,
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: COLORS.secundary,
  },
  containerPokemons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
