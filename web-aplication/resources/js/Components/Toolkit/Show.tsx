import React, {Children, PropsWithChildren} from 'react';

const Show = ({children}) => {
    let when = [];
    let Otherwise = null;

    Children.forEach(children,(Child)=>{
        if (Child.props.isTrue){
               when.push(Child)
               return;
        }
        Otherwise = Child
    })

    return when.length ? when : Otherwise
};

Show.When=({isTrue,children}:PropsWithChildren<{isTrue:boolean}>)=>{
    return isTrue ? children : null
}

Show.Else=({children}:PropsWithChildren) => children

export default Show;
