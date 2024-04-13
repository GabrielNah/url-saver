import React, {ForwardedRef, forwardRef, PropsWithChildren, Ref, useId, useImperativeHandle} from 'react';


export type Modal = {
    open:()=>{},
    close:()=>{},
}
const Modal = forwardRef(({children,withCloseButton=true}:PropsWithChildren<{withCloseButton:boolean}>,ref:ForwardedRef<any>) => {
    const id = useId()

    useImperativeHandle(ref,()=>{
        return {
            open:()=>document.getElementById(id).showModal(),
            close:()=>document.getElementById(id).close(),
        }
    },[])



    return (
        <dialog ref={ref} id={id} className="modal">
            <div className="modal-box">
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
});

export default Modal;
