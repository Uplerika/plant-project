import { FIND_PLANT, CLEAR_SEARCH, SET_CATEGORY } from "../actions/filtres";

const initialState = {
    category: null as null,
    searchValue: "" as string,
  };
  
const filters = (state = initialState, action) => {
  switch (action.type) {

case FIND_PLANT: {
	return {
		...state,
		searchValue: action.payload,
	}
}
case CLEAR_SEARCH: {
  return {
    ...state,
    searchValue: "",
  }
}
case SET_CATEGORY: {
  return {
    ...state,
    category: action.payload,
    }
}

  default:
	  return state;
}
};

export default filters;