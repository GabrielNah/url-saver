import React, {ChangeEventHandler, forwardRef} from 'react';
import classNames from "../../utils/classNames";

export type InputProps<T> = {
    type?:"password"|"text"|"email",
    placeholder?:string,
    value:string
    onChange:ChangeEventHandler<T>,
    disabled?:boolean,
    className?:string
}
const Input = forwardRef(({type="text",placeholder="",value,onChange,disabled=false,className=""}:InputProps<HTMLInputElement>,ref) => {

    return (
        <input  type={type}
               placeholder={placeholder}
               className={classNames("input input-bordered  w-full inline-block",className??"")}
               value={value}
               onChange={onChange}
               disabled={disabled}
               {...(ref && {ref} )}
        />
    );
});

export default Input;
