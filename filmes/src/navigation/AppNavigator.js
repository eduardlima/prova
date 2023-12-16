
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddMovieScreen from '../components/screens/AddMovieScreen';
import MainScreen from '../components/screens/MainScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Melhores Filmes',
        }}
      />
      <Stack.Screen
        name="AddMovie"
        component={AddMovieScreen}
        options={{
          title: 'Adicionar Filmes',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;