import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CipherScreen} from './cipher/cipher';
import { styles } from './styles';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={CipherScreen}
        options={{title: 'Home Page'}}
        />
        <Stack.Screen
        name="History"
        component={}
        options={{title: 'History Page'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
