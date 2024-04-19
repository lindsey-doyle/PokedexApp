import React, { Dispatch, SetStateAction } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../styles'

type PokemonSearchInputProps = {
  searchPokemon: string,
  setSearchPokemon: Dispatch<SetStateAction<string>>,
}

export default function PokemonSearchInput({
  searchPokemon,
  setSearchPokemon,
}:PokemonSearchInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons style={styles.icon} name="search" />
      <TextInput
        style={styles.input}
        value={searchPokemon}
        onChangeText={setSearchPokemon}
        placeholder="Name or number"
        placeholderTextColor="#6a6d80"
        selectionColor="#6a6d80"
        underlineColorAndroid="transparent"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#ebf3f5',
    marginBottom: 22,
  },
  icon: {
    marginRight: 12,
    fontSize: 22,
    color: COLORS.primary,
  },
  input: {
    color: '#6a6d80',
    flex: 1,
    fontSize: 15,
  },
})
