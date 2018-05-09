import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// './profileReducer'; import postReducer from './postReducer';

export default combineReducers({auth: authReducer, errors: errorReducer});
