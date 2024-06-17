import React, {ChangeEvent, forwardRef} from 'react';
import classNames from "../../utils/classNames";

const Toggle =  forwardRef((({checked,onChange,processing=false}:{checked:boolean,processing:boolean,onChange:(e:ChangeEvent<HTMLInputElement>)=>void},ref) => {


    return (
        <input type="checkbox"
               className={classNames("toggle" ,processing ? "!text-gray-600 !bg-sky-500" : "")}
               checked={checked}
               onChange={onChange}
               {...ref && {ref}}
        />
    );
}));

export default Toggle;
