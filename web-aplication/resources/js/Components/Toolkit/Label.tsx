import React, {HTMLProps, PropsWithChildren} from 'react';
import classNames from "@utils/classNames";

const Label = ({alignment="horizontal",value,children,...props}:PropsWithChildren<{ alignment:"horizontal"|"vertical",value:string } & HTMLProps<any>>) => {
    return (
        <label
            {...props}
            className={
                classNames(
                    "w-full flex flex-nowrap items-center gap-1",alignment === "horizontal" ? "" : "flex-col",
                    props?.className ?? ""
                )
            }
        >
            { value }
            { children }
        </label>
    );
};

export default Label;
