import React, {useRef, useState} from 'react';
import Collections from "@/Partials/Dashboard/Collections";
import Button from "./Toolkit/Button";
import Modal from "./Toolkit/Modal";
import $http from "@utils/$http"
import Input from "./Toolkit/Input";
import Textarea from "./Toolkit/Textarea";


const AddCollection = ({refetch}) => {
    const modal = useRef()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const onSubmit = (e) => {

        e.preventDefault();
        $http.instance().post("/collection/store", {
            name, description
        })
        .then(() => {
            modal.current.close()
            refetch()
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

    const collections = useRef<{fetchCollections:()=>void}>()
    return (
        <div className={"p-2 bg-black flex-col"}>
            <div className={"flex w-full justify-end"}>
                <AddCollection refetch={collections.current?.fetchCollections}/>
            </div>
            <Collections ref={collections}/>

        </div>
    );
};

export default Dashboard;
