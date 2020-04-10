import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {SEARCH_USERS, GET_USER, GET_REPOS, CLEAR_USERS, SET_LOADING, SET_ALERT, REMOVE_ALERT, ALL_USERS} from "../../types";
const client_id = "f88c36400a1e75d9e468";
const secret_key = "2d1bba9d9889b2c3175a0ed63843ebdc56cbcae8";

const GithubState = (props) => {

    const initialState = {
        users : [] ,
        user : {},
        repos : [],
        loading : false,
        alert : null
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

      const allUsers = async () => {
		setLoading();
		const res = await axios.get(`https://api.github.com/users?client_id=${client_id}&client_secret=${secret_key}`);
		dispatch({
			type: ALL_USERS,
			payload: res.data
		});
    };
    
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS
        })
      };

        //Get Single User Method
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${secret_key}`
        );
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    };

      //get repos method
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${client_id}&client_secret=${secret_key}`
        );
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    };

    const showAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg: msg, type: type }
        });
    
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT
            })
        }, 3000);
      };

      const setLoading = ()=>{
          dispatch({
              type: SET_LOADING
          });
      };

    return ( 
        <GithubContext.Provider value={{...state, searchUsers, allUsers, 
                                clearUsers, getUser, getUserRepos, showAlert}}>
            {props.children}
        </GithubContext.Provider> );
}
 
export default GithubState;