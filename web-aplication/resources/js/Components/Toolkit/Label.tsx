import React, {PropsWithChildren} from 'react';
import classNames from "@utils/classNames";

const Label = ({alignment="horizontal",value,children}:PropsWithChildren<{ alignment:"horizontal"|"vertical",value:string }>) => {
    return (
        <label className={classNames("flex flex-nowrap items-center gap-1",alignment === "horizontal" ? "" : "flex-col")}>
            { value }
            { children }
        </label>
    );
};

export default Label;
