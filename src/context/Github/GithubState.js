import React, { useReducer } from "react";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {SEARCH_USERS, GET_USER, GET_REPOS, CLEAR_USERS, SET_LOADING, SET_ALERT, REMOVE_ALERT} 
            from "../../types";
const GithubState = (props) => {

    const initialState = {
        users : [] ,
        user : {},
        repos : [],
        loading : false 
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    return ( 
        <GithubContext.Provider value={{...initialState}}>
            {props.children}
        </GithubContext.Provider> );
}
 
export default GithubState;