
import { IProduct } from '../../interfaces/types';
import {
	ADD_PLANT_CART,
    CLEAR_CART,
    REMOVE_CART_ITEM,
    PLUS_CART_ITEM,
    MINUS_CART_ITEM,
} from './../actions/cart';


interface CartProps {
    items: IProduct;
	totalPrice: number;
	totalCount: number;
}

const initialState = {
    items: {} ,
    totalPrice: 0,
    totalCount: 0,
} as CartProps;

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLANT_CART: {
            const currentPlantItems:IProduct[] = !state.items[action.payload.id]
            ? [action.payload]
            : [...state.items[action.payload.id].items, action.payload];

            const newItems:IProduct = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPlantItems,
                    totalPrice: getTotalPrice(currentPlantItems),
                },
            };

            // const items = Object.values(newItems).map(obj => obj.items);
            // const allPlants:IProduct[] = [].concat.apply([], items);
            // const totalPrice = getTotalPrice(allPlants);
            const totalCount =  Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
            const totalPrice =  Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0);
        
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            };
        }

        case REMOVE_CART_ITEM: {
            const newItems = {
                ...state.items,
            }
            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;
            delete newItems[action.payload];
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount,
            }
        };
        case PLUS_CART_ITEM: {
            const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                },
            };
            const totalCount =  Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
            const totalPrice =  Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0);
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            };
            // return { 
            //     ...state,
            //     items: {
            //         ...state.items,
            //         [action.payload]: {
            //             items: newItems,
            //             totalPrice: getTotalPrice(newItems),
            //         },
            //     },
            // }
        };

        case MINUS_CART_ITEM: {
            const oldItems = state.items[action.payload].items;
            const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                },
            };
            const totalCount =  Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
            const totalPrice =  Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0);
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            };
        };
        
        case CLEAR_CART:
            return { 
                items: {} as IProduct,
                totalPrice: 0, 
                totalCount: 0, 
        };

    default:
        return state;
    }

}



export default cartReducer;
