import React, {useEffect} from 'react';
import ScreenNavigator from './app/navigation/screenNavigator';
import {Provider} from 'react-redux';
import {store} from './store';
import TrackPlayer from 'react-native-track-player';
import {audioData} from './app/data/audioData';

function App() {
  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.add(audioData.data);
    } catch (e) {}
  };

  useEffect(() => {
    setUpTrackPlayer();

    return () => TrackPlayer.destroy();
  }, []);

  return (
    <Provider store={store}>
      <ScreenNavigator />
    </Provider>
  );
}

export default App;
