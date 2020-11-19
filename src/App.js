import React,  { useState} from 'react'
import './App.css';
import TodoList from './TodoList'


function App() {
  const[todos,setTodos]= useState(['Taskk1 ','Tasdk2 '])
  return (
    <>
      <TodoList todos={todos} />
      <input type="text"/>
      <button>Add Task todo</button>
      <button>Clear Completed Task</button>
      <div>0 left to do </div>
  
    </>
       )
}

export default App;
  