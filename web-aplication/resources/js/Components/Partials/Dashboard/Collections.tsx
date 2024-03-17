import React, {useEffect, useState} from 'react';
import $http from "@utils/$http"
import {AxiosResponse} from "axios";
import {Collection} from "../../../Types";
import Card from "@/Toolkit/Card";
import Toggle from "@/Toolkit/Toggle";
import Label from "@/Toolkit/Label";


const Collections = () => {

    const [collections,setCollections]=useState<Collection[]>([])

    useEffect(()=>{
        $http.instance().get("/collection")
            .then(({data}:AxiosResponse<{collections:Collection[]}>)=>{
                setCollections(data.collections)
            })
    },[])

    return (
        <div>
            {
                collections.map(C=>(
                    <Card title={C.name}
                          description={C.description}
                          buttonText={"Open"}
                          buttonAction={()=>{}}
                    >
                        {
                            {
                                addition:(
                                    <Label value={"Is Default"} >

                                        <Toggle checked={C.is_default} onChange={()=>{}}/>
                                    </Label>
                                )
                            }
                        }
                    </Card>
                ))
            }
        </div>
    );
};

export default Collections;
