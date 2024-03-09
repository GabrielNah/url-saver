import {useOutletContext} from "react-router-dom";
import {UserType} from "../Types";


export default function useAuthContext():UserType|null {

    let { user } = useOutletContext<{ user: UserType | null }>()

    return user

}
