import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DisasterMapScreen from './screens/DisasterMapScreen';

export type RootStackParamList = {
  DisasterMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DisasterMap"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="DisasterMap" component={DisasterMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

