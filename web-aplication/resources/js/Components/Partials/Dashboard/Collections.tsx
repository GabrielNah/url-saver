import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import $http from "@utils/$http"
import {AxiosResponse} from "axios";
import {Collection} from "../../../Types";
import Card from "@/Toolkit/Card";
import Toggle from "@/Toolkit/Toggle";
import Label from "@/Toolkit/Label";
import Each from "@/Utils/Each";
import {useCustomDataContext} from "../../Utils/DynamicDataContext";
import Button from "@/Toolkit/Button";


const CollectionCard = ({item:C,additionalProps}:{item:Collection,additionalProps:{markAsDefault,setCollections,putUnderEdition,putUnderRemoval}})=>{

    const [isChecked,setIsChecked] = useState<boolean>(C.is_default)
    const [processing,setProcessing]=useState<boolean>(false)

    const markCollectionAsDefault = ()=>{
        if (processing){
            return
        }
        setProcessing(true)
        additionalProps.markAsDefault(C.id)
            .then(({data:{success}})=>{
               setProcessing(false)
                setIsChecked(true)
                additionalProps.setCollections(p=>(p.map(c=>({...c,is_default:c.id ==C.id}))))
            })
    }

    useEffect(()=>{
        setIsChecked(C.is_default)
    },[C.is_default])

    return (
        <Card title={C.name}
              description={C.description}
              buttonText={"Open"}
              buttonAction={()=>{}}
        >
            {
                {
                    addition:(
                            <Label value={"Is Default"} >
                                <Toggle checked={isChecked}
                                        onChange={markCollectionAsDefault}
                                        processing={processing}
                                />
                            </Label>
                    ),
                    footer:(
                        <div className={"flex gap-2 items-center justify-end p-2"}>
                            <Button
                                variant={"primary"}
                                onClick={()=>additionalProps.putUnderEdition(C)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant={"danger"}
                                onClick={()=>additionalProps.putUnderRemoval(C)}
                            >
                                Delete
                            </Button>
                        </div>
                    )
                }
            }
        </Card>
    )
}


const Collections = forwardRef((props,ref) => {

    const [collections,setCollections]=useState<Collection[]>([])
    const {lastInsertedCollection,putUnderRemoval,putUnderEdition} = useCustomDataContext<{lastInsertedCollection:Collection|null}>()

    const markAsDefault = (id)=>{
       return  $http.instance().post(`/collection/${id}/make-default`)
    }

    const fetchCollections = ()=>{
        $http.instance().get("/collection")
            .then(({data}:AxiosResponse<{collections:Collection[]}>)=>{
                setCollections(data.collections)
            })
    }

    useEffect(()=>{
        fetchCollections()
    },[])

    useEffect(()=>{
        if (lastInsertedCollection){
            setCollections(p=>([...(p??[]),lastInsertedCollection]))
        }
    },[lastInsertedCollection])


    useImperativeHandle(ref,()=>{
        return {
            setCollections
        }
    },[setCollections])

    return (
        <div ref={ref} className={"w-full flex flex-col"}>
            <div className={"w-full flex flex-wrap gap-3"}>
                <Each collection={collections}
                      template={CollectionCard}
                      propForEachTemplate={{markAsDefault,setCollections,putUnderRemoval,putUnderEdition}}
                />
            </div>
        </div>

    );
});

export default Collections;
