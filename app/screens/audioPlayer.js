import React, {useEffect, useState} from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import RatingAudio from '../commonComponent/ratingComponent';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {updateAudioList, isIOS} from './audioUtil';
import {removeFavIcon, favourite} from '../data/audioData';
import Spinner from 'react-native-loading-spinner-overlay';

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
});

const AudioPlayer = props => {
  const progress = useProgress();
  const [audioData, setAudioData] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const [play, setPlay] = useState(false);
  const BACK_IMAGE = require('../assests/back.png');
  const navigation = useNavigation();

  const PLAY = require('../assests/play.png');
  const PAUSE = require('../assests/pause.png');

  const setUpTrackPlayer = async () => {
    try {
      if (props.route?.params?.audio && isIOS() === 'android') {
        await TrackPlayer.add(props.route?.params?.audio);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUpTrackPlayer();
    setAudioData(props?.route?.params?.audioList);
    if (isIOS()) {
      playCurrentSong(props?.route?.params?.audio?.id || 0);
    }
    setLoadingStatus(false);
    return () => {
      if (!isIOS()) {
        TrackPlayer.reset();
        TrackPlayer.clearNowPlayingMetadata();
      }
    };
  }, []);

  const updateRating = (audioRating, isFavouriteOrRating) => {
    var audioList = props.data;
    // Update Rating in the audio List
    if (isFavouriteOrRating === 'rating') {
      props.updateAudioList(
        updateAudioList(
          audioList,
          props.route.params.audioList,
          'rating',
          audioRating,
        ),
      );
    } else {
      // Update Favourite in the audio List
      props.updateAudioList(
        updateAudioList(
          audioList,
          props.route.params.audioList,
          'favourite',
          true,
        ),
      );
    }
  };

  const playAudio = () => {
    if (play) {
      // Pause Audio
      TrackPlayer.pause();
      setPlay(!play);
    } else {
      // Play Audio
      TrackPlayer.play();
      setPlay(!play);
    }
  };

  const playCurrentSong = async trackId => {
    // Play the current song based on track Id
    await TrackPlayer.skip(trackId);
  };

  const goBack = async () => {
    try {
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loadingStatus}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.HeaderBackButton}
          onPress={() => goBack()}>
          <Image source={BACK_IMAGE} style={styles.headerBackImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitleFont}>{audioData.title}</Text>
        <View />
      </View>
      <View style={styles.firstContainer}>
        <ImageBackground
          style={styles.coverImageContainer}
          source={{
            uri: audioData.cover,
          }}>
          <TouchableOpacity
            onPress={() => updateRating(audioData, 'favourite')}
            style={styles.textView}>
            <Image
              style={styles.favDetailIcon}
              source={{
                uri: audioData.isFavourite ? favourite : removeFavIcon,
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Slider
          style={styles.sliderStyle}
          value={progress.position}
          minimumValue={0}
          minimumTrackTintColor="black"
          maximumTrackTintColor="grey"
          maximumValue={progress.duration}
          onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
        />
        <View style={styles.timerContainer}>
          <Text>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}/
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => {
              playAudio();
            }}>
            <Image source={!play ? PLAY : PAUSE} style={styles.playIcon} />
          </TouchableOpacity>
        </View>
        <RatingAudio
          isEditRating={true}
          iconSize={42}
          ratingValue={audioData.rating}
          updateRating={data => updateRating(data, 'rating')}
        />
      </View>
    </SafeAreaView>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#ff0044',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 40,
  },
  HeaderBackButton: {
    justifyContent: 'center',
  },
  headerBackImage: {
    width: 20,
    height: 14,
    marginLeft: 15,
  },
  sliderStyle: {
    width: windowWidth - 50,
    height: 40,
  },
  playIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
  textView: {
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center',
    top: windowHeight / 5,
    left: 0,
    right: 0,
    bottom: windowWidth / 7,
    backgroundColor: 'rgba(237, 237, 237, 0.8)',
    height: 70,
  },
  coverImageContainer: {
    width: '100%',
    height: '60%',
  },
  firstContainer: {
    marginHorizontal: 20,
  },
  favDetailIcon: {
    width: 40,
    height: 40,
  },
  headerTitleFont: {
    fontSize: 30,
  },
  playButton: {
    marginVertical: 20,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
const mapStateToProps = state => {
  return {
    data: state.list.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateAudioList: UpdatedAudioList =>
      dispatch({
        type: 'UPDATE_AUDIO_LIST',
        value: UpdatedAudioList,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
