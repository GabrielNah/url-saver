import React, {forwardRef, PropsWithChildren, useId, useImperativeHandle} from 'react';

const Modal = forwardRef(({children},ref) => {
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
