import React, {ChangeEvent, useLayoutEffect, useRef} from 'react';
import classNames from "../../utils/classNames";

const Toggle = ({checked,onChange,processing=false}:{checked:boolean,processing:boolean,onChange:(e:ChangeEvent<HTMLInputElement>)=>void}) => {

    const toggle = useRef(null)

    useLayoutEffect(()=>{

            toggle.current.indeterminate=processing;

    },[processing])
    return (
        <input type="checkbox"
               className={classNames("toggle" ,processing ? "!text-gray-600" : "")}
               checked={checked}
               onChange={onChange}
               ref={toggle}
        />
    );
};

export default Toggle;
