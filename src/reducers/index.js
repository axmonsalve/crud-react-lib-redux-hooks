import {combineReducers} from 'redux';
import productosReducer from './productosReducer';
import validacionReducer from '../reducers/validacionReducer';

export default combineReducers({
    productos: productosReducer,
    error: validacionReducer
});