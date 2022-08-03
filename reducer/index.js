// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import listReducer from './listReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  list: listReducer,
});
// Exports
export default rootReducer;
