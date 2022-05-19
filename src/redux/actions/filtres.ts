export const FIND_PLANT = 'FIND_PLANT';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SORT_BY = 'SET_SORT_BY';


export const findPlant = (title:string) => ({
  type: FIND_PLANT,
  payload: title,
});

export const clearSearch = (title:string) => ({
  type: CLEAR_SEARCH,
  payload: title,
});

export const setSortBy = ({ type, order }) => ({
    type: SET_SORT_BY,
    payload: { type, order },
  });
  
export const setCategory = (catIndex) => ({
  type: SET_CATEGORY,
  payload: catIndex,
});