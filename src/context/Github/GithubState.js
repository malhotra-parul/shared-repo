import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {SEARCH_USERS, GET_USER, GET_REPOS, CLEAR_USERS, SET_LOADING, SET_ALERT, REMOVE_ALERT} from "../../types";
const client_id = "f88c36400a1e75d9e468";
const secret_key = "2d1bba9d9889b2c3175a0ed63843ebdc56cbcae8";

const GithubState = (props) => {

    const initialState = {
        users : [] ,
        user : {},
        repos : [],
        loading : false 
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(
          `https://api.github.com/search/users?q=${text}&client_id=${client_id}&client_secret=${secret_key}`
        );
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
      };

      const setLoading = ()=>{
          dispatch({
              type: SET_LOADING
          });
      };

    return ( 
        <GithubContext.Provider value={{...state, searchUsers}}>
            {props.children}
        </GithubContext.Provider> );
}
 
export default GithubState;