import { collection, getDocs } from "firebase/firestore";
import { IProduct } from "../../interfaces/types";
import { db } from "../../utils/firebase";

export const LOAD_PLANTS = 'LOAD_PLANTS';
export const LOAD_PLANTS_FAILURE = 'LOAD_PLANTS_FAILURE';
export const LOAD_PLANTS_SUCCESS = 'LOAD_PLANTS_SUCCESS';

export const loadPlantsStart = () => ({
    type: LOAD_PLANTS,
});

export const loadPlantsFailure = () => ({
    type: LOAD_PLANTS_FAILURE,
});

export const loadPlantsSuccess = (items)  => ({
    type: LOAD_PLANTS_SUCCESS,
    payload: items,
})
  
export const loadPlants = () => (dispatch) => {
        dispatch(loadPlantsStart());
        const q = collection(db, "products");
        try {
        const getProducts = async () => {
            const data = await getDocs(q);
            console.log(q);
            dispatch(loadPlantsSuccess (
              data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IProduct))
            ));
          };
          getProducts();
        } catch (err) {
            dispatch(loadPlantsFailure());
        }
}
