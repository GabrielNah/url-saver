import React, {useRef, useState} from 'react';
import useAuthContext from "../customHooks/useAuthContext";
import Collections from "@/Partials/Dashboard/Collections";
import Button from "./Toolkit/Button";
import Modal from "./Toolkit/Modal";
import $http from "@utils/$http"


const AddCollection = ()=>{
    const modal = useRef()
    const [name,setName]=useState<string>("")
    const [description,setDescription]=useState<string>("")
    const onSubmit = (e)=>{
        e.preventDefault();

        $http.instance().post("/collection/store",{
            name,description
        })
            .then(()=>{
                modal.current.close()
            })
    }
    return (
        <>
            <Button type={"button"} onClick={()=>{
                modal.current.open()
            }}  disabled={false}>
                Add New
            </Button>
            <Modal ref={modal}>
                <form onSubmit={onSubmit}>
                    <input  value={name} onChange={e=>setName(e.target.value??"")}/>
                    <input value={description} onChange={e=>setDescription(e.target.value??"")}/>
                    <Button type={"submit"} >
                        Save
                    </Button>
                </form>
            </Modal>
        </>
    )
}
const Dashboard = () => {

    const user = useAuthContext()

    return (
        <div className={"p-2 bg-black flex-col"}>
            <div className={"flex w-full justify-end"}>
            <AddCollection/>
            </div>
            <Collections/>

        </div>
    );
};

export default Dashboard;
