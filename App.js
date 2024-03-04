import React from 'react';

//imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Componentes de navegación (indicamos de donde traera las bainas)
import Index from './views/Index';
//import Lugar from './views/Lugar';
import { DestinationDetail } from './views/DestinationDetail';
import { AuthenticationScreen } from './views/AuthenticationScreen';


//var Stack
const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerTitle: '', headerTransparent: true, headerShadowVisible: false }} name="AuthenticationScreen" component={AuthenticationScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Index" component={Index} />
        <Stack.Screen options={{ headerTitle: '', headerTransparent: true, headerShadowVisible: false }} name="DestinationDetail" component={DestinationDetail} />
        {/* <Stack.Screen options={{ headerTitle: '', headerTransparent: true, headerShadowVisible: false }} name="Lugar" component={Lugar} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}