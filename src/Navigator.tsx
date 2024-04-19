import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, DetailsPokemon } from './screens'
import type { IScreens } from './interfaces'

const Stack = createNativeStackNavigator<IScreens>()

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailsPokemon" component={DetailsPokemon} />
    </Stack.Navigator>
  )
}
