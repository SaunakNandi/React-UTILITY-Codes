import { useState } from "react";

interface UseSetReturn<T>{
    set:Readonly<Set<T> | null>
    add: (key: T) => void;
    remove: (key: T) => void;
    toggle: (key: T) => void;
    reset: () => void;
    clear: () => void;
}
export function useSet<T>(initialState:Set<T>=new Set<T>()):UseSetReturn<T>{
    const [state,setState]=useState<Set<T>>(initialState)

    function add(key:T){
        setState(prev=>prev.add(key))
    }
    function remove(key:T){
        setState(prev=> {
            prev.delete(key)
            return prev
        })
    }
    function clear(){
        setState(new Set<T>())
    }
    function reset(){
        setState(new Set<T>(initialState))
    }
    function toggle(key:T){
        setState(prev=>{
            const newSet=new Set<T>(prev)
            if(newSet.has(key))
                newSet.delete(key)
            else
                newSet.add(key)
            return newSet
        })
    }
    return {set:state,add,remove,clear,reset,toggle}
}