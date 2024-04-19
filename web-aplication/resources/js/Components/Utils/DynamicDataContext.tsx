import {Context, createContext, PropsWithChildren, useContext} from "react";
type DynamicDataContextType<T>=T
const DynamicDataContext = createContext<any>(null)

export function useCustomDataContext<T>(): T {
    return useContext(DynamicDataContext);
}
export const DynamicDataProvider = ({children,value}:PropsWithChildren<{value:any}>)=>{

    return (
        <DynamicDataContext.Provider value={value}>
            { children }
        </DynamicDataContext.Provider>
    )
}
