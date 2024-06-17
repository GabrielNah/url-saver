import React, { forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Modal from "./Modal";
import Show from "./Show";
type ConfirmProps ={
    intro:string,
    description:string,
    icon?:any
}
export const useConfirm = (data:ConfirmProps & {onConfirm:()=>void,onDismiss:()=>void}) => {
    const ref = useRef<{
        askToConfirm:()=>void,
        confirm:()=>void,
        dismiss:()=>void,
    }>()
    return {
        confirm:ref,
        controls:{
            askToConfirm:()=>{
                ref.current.askToConfirm(data)
            },
            confirm:()=>{
                ref.current.confirm(data.onConfirm)
            },
            dismiss:()=>{
                ref.current.dismiss(data.onDismiss())
            }
        }

    }
}
const Confirm = forwardRef(({children,...props}, ref) => {
    const modal = useRef(null);
    const [confirmText,setConfirmText] = useState<ConfirmProps>()

    useImperativeHandle(ref,()=>{
        return {
            askToConfirm:(confirmData:ConfirmProps)=>{
                setConfirmText(confirmData)
                modal.current?.open?.()
            },
            confirm:(callback=()=>{})=>{
                callback()
                modal.current?.close?.()
            },
            dismiss:(callback=()=>{})=>{
                callback()
                setConfirmText(null)
                modal.current?.close?.()
            },
        }
    })
    return (
        <Modal ref={modal} withCloseButton={false}>
            <div ref={ref} className={"bg-red-200 p-2 rounded flex flex-col"}>
                <Show>
                    <Show.When isTrue={ !!confirmText?.icon }>
                        { confirmText?.icon }
                    </Show.When>
                </Show>
                <h1> {confirmText?.intro} </h1>
                <h3> {confirmText?.description} </h3>
                {children}
            </div>
        </Modal>
    );
});

export default Confirm;
