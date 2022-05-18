import { IProduct } from '../../interfaces/types';
import {
	LOAD_PLANTS,
	LOAD_PLANTS_FAILURE,
	LOAD_PLANTS_SUCCESS,
} from './../actions/plants';

interface PlantProps {
    items: IProduct[];
	isLoaded: boolean;
	error: null;
}

const initialState = {
items: [] as IProduct[],
isLoaded: false,
error: null,
} as PlantProps;

const plantReducer = (state = initialState, action) => {
switch (action.type) {
	case LOAD_PLANTS:
	return {
		...state,
		isLoaded: false,
	}
	case LOAD_PLANTS_SUCCESS:
	return {
		...state,
		isLoaded: true,
		items: action.payload,
	}
	case LOAD_PLANTS_FAILURE:
	return {
		...state,
		isLoaded: false,
		error: action.payload,
	};

	default:
	return state;
}
};

export default plantReducer;