import React, {forwardRef} from 'react';
import classNames from "../../utils/classNames";
import {InputProps} from "./Input";

const Textarea = forwardRef(({type="text",placeholder="",value,onChange,disabled=false,className="",...props}:InputProps<HTMLTextAreaElement>,ref) => {
    return <textarea
        placeholder={placeholder}
        className={classNames("textarea textarea-bordered",className??"")}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
        {...(ref && {ref} )}
        />;
});

export default Textarea;
