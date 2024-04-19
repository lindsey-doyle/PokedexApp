import type { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  View, StyleSheet, StatusBar, Image, ScrollView,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { IDetailsPokemonInfo, IPokemonDetailsCard, IScreens } from '../interfaces'
import { TypesPokemons, fetchCompletePokemon } from '../utils'
import {
  DetailsPokemonHeader,
  DetailsPokemonNavbar,
  SkeletonDetailsPokemon,
} from '../components'

type DetailsPokemonsProps = {
  navigation: NativeStackNavigationProp<IScreens, 'DetailsPokemon'>,
  route: RouteProp<IScreens, 'DetailsPokemon'>;
}

export default function DetailsPokemons({ route, navigation }: DetailsPokemonsProps) {
  const [pokemon, setPokemon] = useState<IPokemonDetailsCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [pokemonInformation, setPokemonInformation] = useState<React.ReactNode>()

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemon = await fetchCompletePokemon(route.params.id)
      setPokemon(fetchedPokemon)
    }
    fetchData()
    setLoading(false)
  }, [])

  const handleBackButton = (): void => {
    navigation.navigate('Home')
  }

  const handleEvolution = async (id: number): Promise<void> => {
    if (id === route.params.id) return
    setLoading(true)
    const fetchedPokemon = await fetchCompletePokemon(id)
    setPokemon(fetchedPokemon)
    setLoading(false)
  }

  const handlePokemonInformation = (
    component: React.ComponentType<IDetailsPokemonInfo>,
  ): void => {
    setPokemonInformation(() => React.createElement(
      component,
      { pokemon, handleEvolution } as IDetailsPokemonInfo,
    ))
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5fbfb" />
      {
        loading || !pokemon ? <SkeletonDetailsPokemon /> : (
          <>
            <DetailsPokemonHeader
              id={pokemon.id}
              name={pokemon.name}
              handleBackButton={handleBackButton}
            />
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[
                styles.containerImage,
                { backgroundColor: TypesPokemons[pokemon.types[0]].color }]}
              >
                <Image source={{ uri: pokemon.uri }} style={styles.image} />
              </View>

              <View style={styles.containerContent}>
            
              </View>

              <View style={styles.containerContent}>
                <DetailsPokemonNavbar
                  handlePokemonInformation={handlePokemonInformation}
                  handleEvolution={handleEvolution}
                />
                {pokemonInformation}




              </View>
            </ScrollView>
          </>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#f5fbfb',
  },
  containerImage: {
    marginTop: 10,
    width: '100%',
    height: 225,
    marginLeft: 'auto',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 210,
    height: 210,
  },
  containerContent: {
    marginTop: 10,
  },
})
