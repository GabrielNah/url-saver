import React, {PropsWithChildren} from 'react';
import classNames from "../../utils/classNames";

type ButtonProps = {
    type?:"button" | "submit",
    onClick?:()=>void,
    className?:string,
    disabled?:boolean,
    variant?:"primary" | "secondary" | "danger" | "success",
}

const bgColors = {
    primary:"btn-primary",
    secondary:"btn-secondary",
    danger:"btn-error",
    success:"btn-success",
}
const Button = ({type="button",variant="primary",onClick=()=>{},className="",disabled=false,children,...props}:PropsWithChildren<ButtonProps>) => {

    return (
        <button className={
                    classNames(
                        "btn",bgColors[variant],className??""
                    )
                }
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
