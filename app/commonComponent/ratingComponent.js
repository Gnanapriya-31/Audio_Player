import {Rating} from 'react-native-elements';

import React from 'react';

const RatingAudio = ({ratingValue, iconSize, isEditRating, updateRating}) => {
  const ratingCompleted = ratingData => {
    updateRating(ratingData);
  };

  return (
    <Rating
      type="custom"
      ratingCount={5}
      imageSize={iconSize}
      onFinishRating={ratingCompleted}
      style={{paddingVertical: 10}}
      startingValue={ratingValue}
      readonly={!isEditRating}
      ratingColor={'black'}
    />
  );
};

export default RatingAudio;
