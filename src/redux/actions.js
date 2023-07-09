import http from "../apis/http";
import { FETCH_SEARCH, SAVE_SEARCH, DELETE_SEARCH } from "./constants";

export const fetchHistory = () => async (dispatch) => {
    const response = await http.get("/places");
    dispatch({ type: FETCH_SEARCH, payload: response.data });
};

export const saveSearch = (data) => async (dispatch) => {
    const response = await http.post("/places", data);
    dispatch({ type: SAVE_SEARCH, payload: response.data });
};

export const deleteSearch = (id) => async (dispatch) => {
    const response = await http.delete(`/places/${id}`);
    dispatch({ type: DELETE_SEARCH, payload: response.data });
};
