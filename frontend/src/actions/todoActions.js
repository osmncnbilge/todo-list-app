import axios from "axios";
import {
  TODO_LIST_FAIL,
  TODO_LIST_REQUEST,
  TODO_LIST_SUCCESS,
} from "../constants/todoConstants";

const url = process.env.REACT_APP_API_URL || "http://localhost:5000/api/todos";

export const getTodoList = () => async (dispatch) => {
  try {
    dispatch({ type: TODO_LIST_REQUEST });
    const { data } = await axios.get(url);
    dispatch({ type: TODO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TODO_LIST_FAIL, payload: error.message });
  }
};
