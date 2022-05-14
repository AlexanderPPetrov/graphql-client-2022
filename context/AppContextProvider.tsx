import React, {useEffect, useState} from 'react'
import { AppContext, AppContextType } from './AppContext'
import {useCurrentUserQuery} from "../generated/graphql";

interface Props {
    children: React.ReactNode
}

const AppContextProvider = (props: Props) => {
    const { data, isLoading, isError } = useCurrentUserQuery({}, {
        refetchOnWindowFocus: false,
        retry: 1,
    })
    const [user, setUser] = useState({})
    const context: AppContextType = {
        user,
        setUser,
    }
    useEffect(()=> {
        if(isLoading === false && data) {
            if(data?.currentUser){
                setUser(data?.currentUser)
            }
        }
    }, [isLoading])
    console.log('------->', isLoading)
    console.log('------->', isError)
    if(isLoading){
        return null;
    }
    return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
}

export default AppContextProvider