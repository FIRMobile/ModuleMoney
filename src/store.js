import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { middleware } from './core/navigation';
import nav from './core/navigation/reducer';
import { profile, login } from './modules';

const rootReducer = combineReducers({
	profile,
	login,
	nav,
});

const persistConfig = {
	storage,
	key: 'root',
	stateReconciler: autoMergeLevel2,
	whitelist: ['profile'],
};

let enhacers;

// eslint-disable-next-line
if (__DEV__ === true) {
	enhacers = applyMiddleware(thunk, middleware, createLogger({ collapsed: true }));
} else {
	enhacers = applyMiddleware(thunk, middleware, createLogger({ collapsed: true }));
}

export default function configureStore() {
	const store = createStore(persistReducer(persistConfig, rootReducer), enhacers);
	const persistor = persistStore(store);
	return { store, persistor };
}
