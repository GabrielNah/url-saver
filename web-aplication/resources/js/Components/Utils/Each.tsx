import React, {FC} from 'react';

type DomNodeReturnFunction<T> = (props:{item:T})=>HTMLElement

type EachFunctionProps<T> = {collection:T[],propForEachTemplate:any,template:FC<{ item:T}> | DomNodeReturnFunction<T>}

const Each = ({collection,template:Template,propForEachTemplate}:EachFunctionProps<typeof collection[0]>) => {
    return (
        <>
            {
                collection.map((item,index)=>{
                    return <Template item={item}
                                     key={index}
                                     additionalProps={propForEachTemplate}
                            />
                })
            }
        </>
    );
};

export default Each;
