import React, {ChangeEvent,  useRef} from 'react';
import classNames from "../../utils/classNames";

const Toggle = ({checked,onChange,processing=false}:{checked:boolean,processing:boolean,onChange:(e:ChangeEvent<HTMLInputElement>)=>void}) => {

    const toggle = useRef(null)


    return (
        <input type="checkbox"
               className={classNames("toggle" ,processing ? "!text-gray-600 !bg-sky-500" : "")}
               checked={checked}
               onChange={onChange}
               ref={toggle}
        />
    );
};

export default Toggle;
