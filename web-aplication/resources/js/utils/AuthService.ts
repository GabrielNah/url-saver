export const ACCESS_TOKEN="a_t";

export const getAccessToken = ():string|null =>localStorage.getItem(ACCESS_TOKEN)

export const setAccessToken = (token:string):void=>{localStorage.setItem(ACCESS_TOKEN,token)}

export const removeAccessToken = ():void=>{localStorage.removeItem(ACCESS_TOKEN)}
