import React, {PropsWithChildren} from 'react';
import Show from "./Show";

const Card = ({
                    title,
                    description,
                    children
              }:PropsWithChildren<{
                    title:string | undefined,
                    description:string | undefined,
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
                <Show>
                    <Show.When isTrue={ !!children?.footer }>
                        { children.footer }
                    </Show.When>
                </Show>

            </div>
        </div>
    );
};

export default Card;
