import { useEffect, useState } from "react"

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
            value:task,
            isCompleted:false,
            id:new Date().getTime()
        })
        setTodos(exisiting_todo)
    }

    function handleComplete(id)
    {
        setTask('')
        const exisiting_todo=todos.map((todo)=>{
            if(todo.id==id)
            {
                return {...todo,isCompleted:!todo.isCompleted}
            }
            return {...todo}
        })
        
        setTodos(exisiting_todo)
    }

    const handleKeyDown=(e)=>{
        if(e.key=="Enter")
        {    
            setTask('')
            addTodo()
        }
    }

    const handleDelete=(id)=>{
        const updatedTodo=todos.filter((item)=>item.id!=id)
        setTodos(updatedTodo)
    }

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
                    <div className="">
                        <span style={{textDecoration:`${todo.isCompleted?'line-through':'none'}`}}>{todo.value}</span>
                        <span style={{marginRight:'0.5rem'}} 
                        onClick={()=>handleComplete(todo.id)}>✔️</span>
                        <span onClick={()=>handleDelete(todo.id)}>❌ </span>
                    </div>
                ))
            }
        </div>
    </div>
}