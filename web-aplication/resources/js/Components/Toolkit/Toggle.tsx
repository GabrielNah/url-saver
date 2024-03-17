import React, {ChangeEvent} from 'react';

const Toggle = ({checked,onChange}:{checked:boolean,onChange:(e:ChangeEvent<HTMLInputElement>)=>void}) => {
    return (
        <input type="checkbox"
               className="toggle"
               checked={checked}
               onChange={onChange}
        />
    );
};

export default Toggle;
