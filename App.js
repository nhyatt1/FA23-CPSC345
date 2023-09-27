import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { CipherScreen } from './cipher/cipher';
import { styles } from './styles';
import { HistoryScreen } from './history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ActivityIndicator } from 'react-native';

const persistor = persistStore(store)
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store = {store}>
      <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={CipherScreen}
              options={{title: 'Home Page'}}
            />
            <Stack.Screen
              name="History"
              component={HistoryScreen}
              options={{title: 'History Page'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
