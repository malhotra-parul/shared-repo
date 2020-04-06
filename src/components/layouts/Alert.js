import React,{useContext} from "react";
import GithubContext from "../../context/GitHub/githubContext";

const Alert = ({alert})=>{
    const githubContext = useContext(GithubContext);
    return(
        githubContext.alert !== null && (
            <div className={`alert alert-${githubContext.alert.type}`}>
                <i className="fas fa-info-circle"/>{githubContext.alert.msg}
            </div>
        )
    );
};

export default Alert;