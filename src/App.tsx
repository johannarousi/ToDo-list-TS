import React, { useState } from 'react';
import './App.css';
import { number, string } from 'prop-types';

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string
  complete: boolean
}

function App() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

const handleSubmit = (e: FormElem):void => {
  e.preventDefault() // prevents the page from refreshing
  addTodo(value);
  setValue("");

}
const addTodo = (text: string):void => {
  const newTodos: ITodo[] = [...todos, {text, complete: false}];
  setTodos(newTodos);
}

const completeTodo = (index: number):void => {
  const newTodos: ITodo[] = [...todos];
  newTodos[index].complete = !newTodos[index].complete; // sets the complete to opposite what it was
  setTodos(newTodos);
}

const deleteTodo = (index: number): void => {
  const newTodos: ITodo[] = [...todos]
  newTodos.splice(index, 1);
  setTodos(newTodos);
}

  return (
    <div className="TodoList_container">
     <h1 className="TodoList_header">To Do List</h1>
     <form onSubmit={handleSubmit}>
       <input className="TodoList_formInput" type="text"required value={value} onChange={e => setValue(e.target.value)}/>
       <button className="TodoList_button" type="submit"><i className="fas fa-plus TodoList_icon"></i></button>
     </form>
     <ul className="TodoList_list">{todos.map((todo:ITodo, index:number) => {
       return (
       <div key={index} className="TodoList_listItem">
         <li className={`${todo.complete ? "completed" : "doing"}`}>{todo.text}</li>
         <button className="TodoList_button" type="button" onClick={()=>completeTodo(index)}>
           <i className={`fas fa-check-circle TodoList_icon ${todo.complete && "iconCompleted"}`}></i>
         </button>
         <button className="TodoList_button" type="button" onClick={()=>deleteTodo(index)}>
           <i className="fas fa-trash-alt TodoList_icon"></i>
         </button>
         </div>
         )
        } 
      )}
      </ul>    
    </div>
  );
}

export default App;
