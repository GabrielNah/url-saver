import React, {useEffect, useRef, useState} from 'react';
import Collections from "@/Partials/Dashboard/Collections";
import Button from "@/Toolkit/Button";
import Modal from "@/Toolkit/Modal";
import $http from "@utils/$http"
import Input from "@/Toolkit/Input";
import Textarea from "./Toolkit/Textarea";
import {DynamicDataProvider, useCustomDataContext} from "./Utils/DynamicDataContext";
import {Collection} from "../Types";
import Label from "./Toolkit/Label";
import Loader from "./Toolkit/Loader";
import Confirm, {useConfirm} from "./Toolkit/Confirm";


const AddCollection = () => {
    const modal = useRef()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const {setLasInsertedCollection} = useCustomDataContext<{setLasInsertedCollection:(C:Collection)=>void}>()

    const onSubmit = (e) => {

        e.preventDefault();
        if (loading){
            return
        }
        setLoading(true)
        $http.instance().post("/collection/store", {
            name, description
        })
        .then(({data: {collection}}) => {
            modal.current.close()
            setLasInsertedCollection(collection)
            setName("")
            setDescription("")
        })
        .then(()=>{
            setLoading(false)
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
                <form onSubmit={onSubmit} className={"flex flex-col gap-2 relative"}>
                    <Loader loading={loading}/>
                    <Label alignment={"vertical"} value={"Name"} className={"!items-start"}>
                        <Input value={name} onChange={e => setName(e.target.value ?? "")}/>
                    </Label>
                    <Label alignment={"vertical"} value={"Description"} className={"!items-start"}>
                        <Textarea className={"w-full"} value={description} onChange={e => setDescription(e.target.value ?? "")}/>
                    </Label>
                    <Button type={"submit"}>
                        Save
                    </Button>
                </form>
            </Modal>
        </>
    )
}

const EditCollection = ({setCollections,collectionUnderEdition,setCollectionUnderEdition})=>{
    const [name,setName] = useState<string>(collectionUnderEdition?.name??"")
    const [description,setDescription] = useState<string>(collectionUnderEdition?.description??"")
    const modal = useRef()

    const save = (e)=>{
        e.preventDefault()
        $http.instance().put(`/collection/${collectionUnderEdition.id}/update`,{
            name,description
        })
            .then(()=>{
                setCollections((p)=>{
                    let index = p.findIndex(v=>v.id == collectionUnderEdition.id)
                    if (index!==-1){
                        p[index] = {...p[index],name,description}
                    }
                    return [...p]
                })
                setCollectionUnderEdition(null)
                closeModal()
            })
    }

    const closeModal = ()=>{
        setDescription("")
        setName("")
        modal.current.close()
    }
    useEffect(()=>{
        if (collectionUnderEdition){
            modal.current.open()
            setDescription(collectionUnderEdition.description)
            setName(collectionUnderEdition.name)
        }else {
            closeModal()
        }
    },[collectionUnderEdition])

    return (
        <>
            <Modal ref={modal} withCloseButton={false}>
                <form className={"flex flex-col gap-2"} onSubmit={save}>
                    <Input
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <Textarea
                        onChange={(e)=>setDescription(e.target.value)}
                        value={description}
                        rows={4}
                    />
                    <div className={"flex justify-center gap-2  items-center"}>
                        <Button type={"submit"} >
                            Save
                        </Button>
                        <Button variant={"secondary"} onClick={closeModal}>
                            Cancel
                        </Button>
                    </div>

                </form>
            </Modal>
        </>
    )
}
const Dashboard = () => {

    const [lastInsertedCollection,setLasInsertedCollection]=useState<Collection|null>(null)
    const [collectionUnderEdition,setCollectionUnderEdition]=useState<Collection|null>(null)
    const [editionType,setEditionType]=useState<"edit"|"remove"|"">("")
    const collections = useRef<{ setCollections:(C:(y:Collection[])=>Collection[])=>void }>({setCollections:()=>{}})
    const {confirm,controls} = useConfirm({
        intro:"Do you want to delete this collection?",
        description:"Are you sure ?",
        onConfirm:()=>{
            $http.instance().delete(`/collection/delete/${collectionUnderEdition?.id}`)
                .then(()=>{
                    collections.current.setCollections((p)=>{
                        let index = p.findIndex(v=>v.id == collectionUnderEdition?.id)
                        if (index!==-1){
                            p.splice(index,1)
                        }
                        return [...p]
                    })
                    setCollectionUnderEdition(null)
                    setEditionType("")
                })
        },
        onDismiss:()=>{
            setEditionType("")
            setCollectionUnderEdition(null)
        }
    })

    const putUnderRemoval = (C:Collection)=>{
        setCollectionUnderEdition(C)
        setEditionType("remove")
    }
    const putUnderEdition = (C:Collection)=>{
        setCollectionUnderEdition(C)
        setEditionType("edit")
    }

    useEffect(()=>{


        if (editionType === "remove" && collectionUnderEdition){
            controls.askToConfirm()
        }
    },[editionType,collectionUnderEdition])


    return (
        <>
            <EditCollection
                setCollections={collections.current.setCollections}
                collectionUnderEdition={collectionUnderEdition}
                setCollectionUnderEdition={setCollectionUnderEdition}
            />
            <Confirm ref={confirm}>
                <div className={"flex item-center gap-2 justify-center"}>
                    <Button
                        variant={"primary"}
                        onClick={()=>controls.confirm()}
                    >
                        Yes
                    </Button>
                    <Button variant={"secondary"}
                            onClick={()=>controls.dismiss()}
                    >
                        No
                    </Button>
                </div>

            </Confirm>
            <DynamicDataProvider value={{
                lastInsertedCollection,setLasInsertedCollection,
                putUnderEdition,putUnderRemoval
            }}>
                <div className={"p-2 bg-black flex-col"}>
                    <div className={"flex w-full justify-end"}>
                        <AddCollection />
                    </div>
                    <Collections ref={collections}/>
                </div>

            </DynamicDataProvider>
        </>


    );
};

export default Dashboard;
