import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AudioList from '../screens/audioList';
import AudioPlayer from '../screens/audioPlayer';

const Stack = createNativeStackNavigator();

function ScreenNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={AudioList}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AudioPlayer"
          component={AudioPlayer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ScreenNavigator;
