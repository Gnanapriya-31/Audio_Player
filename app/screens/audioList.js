import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {removeFavIcon, favourite} from '../data/audioData';
import {connect} from 'react-redux';
import RatingAudio from '../commonComponent/ratingComponent';
import {updateAudioList} from './audioUtil';
import Spinner from 'react-native-loading-spinner-overlay';

const AudioList = props => {
  const navigation = useNavigation();
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const audioList = props?.data;
    if (!!audioList && audioList.length === 0) {
      props.loadAudioList();
      setLoadingStatus(false);
    } else {
      setLoadingStatus(false);
    }
  }, []);

  const audioPlayer = async data => {
    const audioTrackFormat = {
      id: data.id,
      url: data.url,
      title: data.title,
      artist: data.title,
      artwork: data.cover,
    };

    navigation.navigate('AudioPlayer', {
      audio: audioTrackFormat,
      audioList: data,
    });
  };

  const updateFav = audioData => {
    var audioList = props.data;
    props.updateAudioList(
      updateAudioList(audioList, audioData, 'favourite', true),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.audioListContainer}>
        <TouchableOpacity onPress={() => audioPlayer(item)}>
          <ImageBackground style={styles.coverImage} source={{uri: item.cover}}>
            <View style={styles.ratingStyle}>
              <RatingAudio
                isEditRating={false}
                iconSize={22}
                ratingValue={item.rating}
              />
            </View>

            <View style={styles.textView}>
              <Text style={styles.imageText}>{item.title}</Text>
              <TouchableOpacity onPress={() => updateFav(item)}>
                <Image
                  style={styles.favIcon}
                  source={{
                    uri: item.isFavourite ? favourite : removeFavIcon,
                  }}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      <Spinner
        visible={loadingStatus}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.headerTitle}>Skoovin</Text>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  textView: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(237, 237, 237, 0.8)',
  },
  imageText: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  customRatingBarStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    margin: 2,
  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    margin: 30,
  },
  headerContainer: {
    marginHorizontal: 20,
  },
  audioListContainer: {
    margin: 10,
  },
  favIcon: {
    width: 30,
    height: 30,
  },
  ratingStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
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
    loadAudioList: () =>
      dispatch({
        type: 'LOAD_DATA_INIT',
      }),
    updateAudioList: UpdatedAudioList =>
      dispatch({
        type: 'UPDATE_AUDIO_LIST',
        value: UpdatedAudioList,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
