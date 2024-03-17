import React, {PropsWithChildren} from 'react';
import Show from "./Show";

const Card = ({
                    title,
                    description,
                    buttonText,
                    buttonAction=()=>{},
                    children
              }:PropsWithChildren<{
                    title:string | undefined,
                    description:string | undefined,
                    buttonText:string | undefined,
                    buttonAction:()=>void,
}>) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{ title }</h2>
                <p>{ description }</p>
                <Show>
                    <Show.When isTrue={ !!children?.addition }>
                        { children.addition }
                    </Show.When>
                </Show>
                <div className="card-actions justify-end" onClick={buttonAction}>
                    <button className="btn btn-primary"> { buttonText } </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
