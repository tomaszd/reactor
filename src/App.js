import React,  { useState , useRef, useEffect} from 'react'
import './App.css';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos]= useState([{id:1,name:"Taski1",completed:false},
                                     {id:2,name:"Taski2",completed:true}])
  const todoNameRef = useRef()


  useEffect(() => {
     const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
     if (storedTodos) {setTodos(storedTodos)
      console.log("useEffect storedTools"+localStorage.getItem(LOCAL_STORAGE_KEY))
    }
    
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log("useEffect set item "+ JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
    const newTodos = [ ...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name=todoNameRef.current.value
    if(name === '') return 
    console.log(name)
    setTodos(prevTodos =>{
      return [...prevTodos,{id:uuidv4(), name: name,completed:false}]
    })
    todoNameRef.current.value=null     
  }

  function handleClearTodos(){
    const newTodos= todos.filter(todo => !todo.completed )
    setTodos(newTodos)
  }
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Task todo</button>
      <button onClick={handleClearTodos}> Clear Completed Task</button>
      <div>{todos.filter(todo => !todo.completed).length} left to do </div>
      <div>{todos.filter(todo => todo.completed).length} already done </div>
    </> 
       )
}
  
export default App;
    