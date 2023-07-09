import { combineReducers } from "redux";
import { FETCH_SEARCH, SAVE_SEARCH, DELETE_SEARCH } from "./constants";

const searchReducer = (state = [], action) => {
    console.log("state", state);
    switch (action.type) {
        case FETCH_SEARCH:
            return [action.payload];
        case SAVE_SEARCH:
            return [...state, action.payload];
        case DELETE_SEARCH:
            return state.filter(({ id }) => id !== action.payload.id);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    historySearch: searchReducer,
});

export default rootReducer;
