export type UserType = {
    name:string|null,
    email:string,
}

export type Collection = {
    id:number,
    description:string,
    is_default:boolean,
    name:string,
    url_count:number
}
