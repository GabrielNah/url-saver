import React from 'react';
import "../../../css/loader.css";
const Loader = ({loading=false}:{loading:boolean}) => {
    if (!loading){
        return null
    }
    return (
        <div className={"absolute opacity-75 flex -top-1 -left-1 -right-1 -bottom-1 bg-slate-200 justify-center items-center"}>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>

    );
};

export default Loader;
