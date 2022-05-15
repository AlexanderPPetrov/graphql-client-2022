import {Cookies} from "react-cookie";

export const fetchData = <TData, TVariables>(query: string, variables?: TVariables, parsedToken?: string): (() => Promise<TData>) => {

    interface LooseObject {
        [key: string]: any
    }

    const cookies = new Cookies();
    const token: string = cookies.get('token') ? cookies.get('token') : parsedToken ?? '';
    let headers: LooseObject = {
        'Content-Type': 'application/json',
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return async () => {
        const res = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const json = await res.json();

        if (json.errors) {
            const {message} = json.errors[0] || 'Error..';
            throw new Error(message);
        }

        return json.data;
    };
};