// Initial State
import {audioData} from '../app/data/audioData';
const initialState = {
  data: audioData.data,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_DATA_INIT': {
      return {
        ...state,
      };
    }
    case 'UPDATE_AUDIO_LIST': {
      return {
        ...state,
        data: action.value,
      };
    }
    default: {
      return state;
    }
  }
};

export default listReducer;
