
import { useEffect, useState } from 'react';
import type { NewTask, Task, TasksProviderProps } from './../../types'
import { TasksContext } from './TasksContext';
import { useAuthentication } from '../auth/AuthenticationContext';
export default function TasksProvider({children}:TasksProviderProps){

    const { user , token } = useAuthentication()
    const [taskList , setTaskList] = useState<Task[]>([])
 


    useEffect(() =>{
        if (!user || !token) {
            setTaskList([])
            return
        }

        const controller = new AbortController()
        const currentUserId = user._id

        const gettaskList = async() => {
            console.log('nt yep')
            
            console.log('nt', token)
            
           
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`,{
                    
                    method:'GET',
                    headers: { Authorization: `Bearer ${token}`},
                    signal: controller.signal, 
                    
                })

                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.message)
                }
                const tasks = await res.json()
                if (currentUserId === user._id) {
                    setTaskList(tasks)
                }
            }catch(error){
                console.error(error);
            }
        }
        setTaskList([])
        gettaskList()
        return () => controller.abort()
    },[user, token])


    console.log('hello mother nt' , user)
    
    const addTask = async (task:NewTask) => {

        
        if(!user || !token) return

        console.log('nt', token)

        try {
            
             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`,{
                    
                    method:'POST',
                    headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                    body: JSON.stringify({
                        title: task.title,
                        area: task.area,
                        description: task.description,
                        todos: task.todos ?? [],
                        tags: task.tags ?? [],
                        dueDate: task.dueDate,
                        status:false,
                    })
                    
                })

                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.message)
                }
                const newTasks = await res.json()
                setTaskList(prev => [ ...prev , newTasks])
            console.log("Document successfully written!")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
    const deleteTask = async (taskId: string ) => {
        
        if(!token) return

        try {
            
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
                {
                    method: 'DELETE',
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            )
                
            

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.message)
            }

            setTaskList((prev) => prev.filter((task) => task._id !== taskId))
            
            console.log("Document successfully deleted!")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
    const updateStatus = async (taskId: string , status: boolean ) => {
        
        if (!token) return

        try {
            const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
            {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: status}),
            }
            )

            if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
            }

            const updatedTask = await res.json()

            setTaskList((prev) =>
            prev.map((task) =>
                task._id === taskId ? updatedTask : task
            )
            )
        } catch (error) {
            console.error('Error updating task status:', error)
        }
    }

    const toggleTodo = async (taskId: string, todoId: string) => {
        
        if(!token) return

        try{
            const task = taskList.find(t => t._id === taskId)
            if (!task) return
          
            console.log('NMCT' , todoId)
            const updatedTodos = task?.todos?.map(todo =>
                todo._id === todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ todos: updatedTodos }),
                }
            )
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.message)
            }

            const updatedTask = await res.json()

            setTaskList(prev =>
                prev.map(task =>
                    task._id === taskId ? updatedTask : task
                )
            )

        }catch (error) {
            console.error("Error toggling todo:", error)
        }
    }

    const addTodo = async (taskId:string , text:string) => {

        
        if(!user || !token) return

        const task = taskList.find(t => t._id === taskId)
        if (!task) return

        const updatedTodos = [...(task.todos ?? []),{ text, completed: false }]

        try {
            
             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,{
                    
                    method:'PATCH',
                    headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                    body: JSON.stringify({
                        todos: updatedTodos
                    })
                    
                })

                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.message)
                }
                const updatedTask = await res.json()
                setTaskList(prev => prev.map(task =>
                task._id === taskId ? updatedTask : task
            ))

            console.log("Document successfully written!")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const editTodo = async (
        taskId: string,
        todoId: string,
        text: string
    ) => {
        
        if(!user || !token) return

        const task = taskList.find(t => t._id === taskId)
        if ( !task) return

        const updatedTodos = task?.todos?.map(todo =>
        todo._id === todoId
            ? { ...todo, text }
            : todo
    )

        try {
            
             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,{
                    
                    method:'PATCH',
                    headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                    body: JSON.stringify({
                        todos: updatedTodos
                    })
                    
                })

                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.message)
                }
                const updatedTask = await res.json()
                setTaskList(prev => prev.map(task =>
                task._id === taskId ? updatedTask : task
            ))

            console.log("Document successfully edited!")
        } catch (e) {
            console.error("Error adding document: ", e);
        }}
    const deleteTodo = async (
        taskId: string,
        todoId: string,
    ) => {
        
        if(!user || !token) return

        const task = taskList.find(t => t._id === taskId)
        if ( !task) return

        const deletedTodo = task?.todos?.filter(todo =>
            todo._id !== todoId)

        try {
            
             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,{
                    
                    method:'PATCH',
                    headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                    body: JSON.stringify({
                        todos: deletedTodo
                    })
                    
                })

                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.message)
                }
                const updatedTask = await res.json()
                setTaskList(prev => prev.map(task =>
                task._id === taskId ? updatedTask : task
            ))

            console.log("Document successfully edited!")
        } catch (e) {
            console.error("Error adding document: ", e);
        }}

       

     return (
        <TasksContext.Provider value={{ taskList, addTask, deleteTask, updateStatus ,toggleTodo ,addTodo ,editTodo, deleteTodo}}>
            {children}
        </TasksContext.Provider>
    );
}