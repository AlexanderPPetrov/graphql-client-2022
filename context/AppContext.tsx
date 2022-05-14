import React, { useContext } from 'react'

export interface AppContextType {
    user: any
    setUser: (user: any) => void | undefined
}

const defaultAppContext: AppContextType = {
    user: null,
    setUser: (user: any) => undefined,
}

export const AppContext = React.createContext<AppContextType>(defaultAppContext)
export const useAppContext = () => useContext(AppContext)