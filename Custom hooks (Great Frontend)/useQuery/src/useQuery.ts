import { useCallback, useEffect, useState } from "react";

interface useQueryResult<T>{
    data: T|null,
    error:unknown,
    loading:boolean
}
export function useQuery<T>(queryFn:()=>Promise<T>,dependency:any[]):useQueryResult<T>{

    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(true)
    const [data,setData]=useState<T | null>(null)
    const callApi=useCallback(async()=>{
        try {
            const response=await queryFn()
            setData(response)
        } catch (error:any) {
            setError(error)
        }finally{
            setLoading(false)
        }
        
    },[queryFn])
    useEffect(()=>{
        callApi()
    },dependency)

    return {data,loading,error}
}