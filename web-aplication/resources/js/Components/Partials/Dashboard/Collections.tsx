import React, { useEffect, useState} from 'react';
import $http from "@utils/$http"
import {AxiosResponse} from "axios";
import {Collection} from "../../../Types";
import Card from "@/Toolkit/Card";
import Toggle from "@/Toolkit/Toggle";
import Label from "@/Toolkit/Label";
import Each from "@/Utils/Each";


const CollectionCard = ({item:C,additionalProps}:{item:Collection,additionalProps:{markAsDefault}})=>{

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
               setIsChecked(p=>!p)
            })
    }

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
                    )
                }
            }
        </Card>
    )
}


const Collections = () => {

    const [collections,setCollections]=useState<Collection[]>([])


    const markAsDefault = (id)=>{
       return  $http.instance().post(`/collection/${id}/make-default`)
    }

    useEffect(()=>{
        $http.instance().get("/collection")
            .then(({data}:AxiosResponse<{collections:Collection[]}>)=>{
                setCollections(data.collections)
            })
    },[])

    return (
        <div className={"w-full flex flex-col"}>

            <div className={"w-full flex flex-wrap gap-3"}>
                <Each collection={collections}
                      template={CollectionCard}
                      propForEachTemplate={{markAsDefault}}
                />
            </div>
        </div>

    );
};

export default Collections;
