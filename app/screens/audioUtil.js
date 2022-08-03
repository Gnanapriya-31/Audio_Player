import {Platform} from 'react-native';

export const isIOS = () => {
  return Platform.OS;
};

export const updateAudioList = (
  audioList,
  audioData,
  updateParams,
  updateValue,
) => {
  const updateAudioList = [];
  for (var x in audioList) {
    if (audioList[x].id === audioData.id) {
      if (updateParams === 'rating') {
        audioList[x].rating = updateValue;
        updateAudioList.push(audioList[x]);
      } else {
        if (updateParams === 'favourite') {
          audioList[x].isFavourite = true;
          updateAudioList.push(audioList[x]);
        }
      }
    } else {
      if (updateParams === 'rating') {
        updateAudioList.push(audioList[x]);
      } else {
        if (updateParams === 'favourite') {
          audioList[x].isFavourite = false;
          updateAudioList.push(audioList[x]);
        }
      }
    }
  }
  return updateAudioList;
};
