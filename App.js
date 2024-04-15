import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'

import { useFonts } from 'expo-font'

import storeConfig from './src/store/storeConfig'

import Navigator from './src/Navigator'
import axios from 'axios'

export default function App() {
  const store = storeConfig
  axios.defaults.baseURL =
    'https://instagram-f2446-default-rtdb.firebaseio.com/'

  const [fontsLoaded] = useFonts({
    shelter: require('./assets/fonts/shelter.otf')
  })
  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  )
}
