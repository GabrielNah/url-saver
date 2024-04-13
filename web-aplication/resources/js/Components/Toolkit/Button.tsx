import React, {PropsWithChildren} from 'react';
import classNames from "../../utils/classNames";

type ButtonProps = {
    type?:"button" | "submit",
    onClick?:()=>void,
    className?:string,
    disabled?:boolean
}
const Button = ({type="button",onClick=()=>{},className="",disabled=false,children,...props}:PropsWithChildren<ButtonProps>) => {

    return (
        <button className={classNames("btn",className??"")}
                disabled={disabled}
                type={type}
                onClick={onClick}
                {...props}
        >
            { children }
        </button>
    );
};

export default Button;
