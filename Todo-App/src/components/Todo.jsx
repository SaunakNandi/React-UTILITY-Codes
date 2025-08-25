import { useCallback, useEffect, useState } from "react"
import Item from "./Item"

export default function Todo(){
    const [task,setTask]=useState("")
    const savedTodo=localStorage.getItem('todos')
    const [todos,setTodos]=useState(savedTodo?JSON.parse(savedTodo) : [])

    const handleChange=(e)=>{
        setTask(e.target.value)
    }
    const addTodo=()=>{
        setTask('')
        const exisiting_todo=todos.map((todo)=>{
            return {...todo}
        })
        exisiting_todo.push({
            value:task.trim(),
            isCompleted:false,
            id:new Date().getTime()
        })
        setTodos(exisiting_todo)
    }

    // Your callback doesn’t include todos in the dependency array ([]).

    // This means the function closes over the initial todos value (usually an empty array) and never sees updates. So every time you toggle, it works on stale data.    

    const handleComplete=useCallback((id)=>{
        setTask('')
        setTodos((prev)=>{
            const exisiting_todo=prev.map((todo)=>{
                if(todo.id==id)
                {
                    return {...todo,isCompleted:!todo.isCompleted}
                }
                return {...todo}
            })
            return exisiting_todo
        })
    },[])

    const handleKeyDown=(e)=>{
        if(e.key=="Enter")
        {    
            setTask('')
            addTodo()
        }
    }

    const handleUpdate=useCallback((id,updatedValue)=>{
        setTodos((prev)=>{
            const updated_todo=prev.map((todo)=>{
                if(todo.id==id)
                {
                    return {
                        ...todo,
                        value:updatedValue.trim()
                    }
                }
                return {...todo}
            })
            return updated_todo
        })
    })

    const handleDelete=useCallback((id)=>{
        setTodos((prev)=>{
            const updatedTodo=prev.filter((item)=>item.id!=id)
            return updatedTodo
        })
    },[])

    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos))
    },[todos])

    return <div>
        <div className="">
            <input type="text" onChange={handleChange} value={task} onKeyDown={handleKeyDown}/>
            <button onClick={addTodo}>Add Task</button>
        </div>
        <div className="">
            {
                todos.map((todo)=>(
                    <Item key={todo.id} handleComplete={handleComplete} handleDelete={handleDelete} todo={todo} handleUpdate={handleUpdate}/>
                ))
            }
        </div>
    </div>
}