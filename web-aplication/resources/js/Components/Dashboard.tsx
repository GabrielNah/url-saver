import React, {useRef, useState} from 'react';
import Collections from "@/Partials/Dashboard/Collections";
import Button from "./Toolkit/Button";
import Modal from "./Toolkit/Modal";
import $http from "@utils/$http"
import Input from "./Toolkit/Input";
import Textarea from "./Toolkit/Textarea";
import {DynamicDataProvider, useCustomDataContext} from "./Utils/DynamicDataContext";
import {Collection} from "../Types";


const AddCollection = () => {
    const modal = useRef()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const {setLasInsertedCollection} = useCustomDataContext<{setLasInsertedCollection:(C:Collection)=>void}>()

    const onSubmit = (e) => {

        e.preventDefault();
        $http.instance().post("/collection/store", {
            name, description
        })
        .then(({data: {collection}}) => {
            modal.current.close()
            setLasInsertedCollection(collection)
        })
    }
    return (
        <>
            <Button
                onClick={() => {
                    modal.current.open()
                }}>
                Add New
            </Button>
            <Modal ref={modal}>
                <form onSubmit={onSubmit} className={"flex flex-col gap-2"}>
                    <Input value={name} onChange={e => setName(e.target.value ?? "")} className={""}/>
                    <Textarea value={description} onChange={e => setDescription(e.target.value ?? "")}/>
                    <Button type={"submit"}>
                        Save
                    </Button>
                </form>
            </Modal>
        </>
    )
}
const Dashboard = () => {

    const [lastInsertedCollection,setLasInsertedCollection]=useState<Collection|null>(null)

    return (
        <DynamicDataProvider value={{lastInsertedCollection,setLasInsertedCollection}}>

            <div className={"p-2 bg-black flex-col"}>
                <div className={"flex w-full justify-end"}>
                    <AddCollection />
                </div>
                <Collections />
            </div>

        </DynamicDataProvider>

    );
};

export default Dashboard;
