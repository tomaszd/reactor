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

  function fetchData() {
    console.log("start fetching");
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      document.getElementById("response_val").innerHTML = xhr.responseText;
      document.getElementById("response_status").innerHTML = "STATUS: "+xhr.status;
      console.log(xhr.responseText)
    })
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all')
    xhr.send()

  }

  return (
    <>
      <h2>Daily Task Runner</h2>
      <h3>All tasks:</h3>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <p></p>
      <div>{todos.length} tasks total </div>
      <h3>Tasks to do:</h3>
      <TodoList todos={todos.filter(todo => !todo.completed)} toggleTodo={toggleTodo}/>
      <p></p>
      <div>{todos.filter(todo => !todo.completed).length} left to do </div>
      <h3>Already Completed:</h3>
      <TodoList todos={todos.filter(todo => todo.completed)} toggleTodo={toggleTodo}/>
      <p></p>
      <div>{todos.filter(todo => todo.completed).length} already done </div>
      <h3>Manage tasks</h3>
      <input ref={todoNameRef} type="text"/>
      <button class="button" onClick={handleAddTodo}>Add Task todo</button>
      <p></p>
      <button class="button" onClick={handleClearTodos}> Clear Completed Task</button>
      {/*<button onClick={fetchData}>Click to fetch current data</button>
      <div id="response_val">RESPONSE EMPTY</div>
      <div id="response_status">RESPONSE STATUS</div>*/}
    </> 
       )
}
  
export default App;
