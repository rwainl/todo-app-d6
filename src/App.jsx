import React from 'react'
import { useState, useEffect } from 'react'
import ToDoInput from './components/ToDoInput'
import ToDoList from './components/ToDoList'
import FilterButton from './components/FilterButton';
import './index.css';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const localSaved = localStorage.getItem('todoList');
    return localSaved ? JSON.parse(localSaved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const [filterMode, setFilterMode] = useState("Semua");

  const filteredList = todoList.filter(items => {
    if(filterMode === "Selesai") return items.completed;
    if(filterMode === "Belum Selesai") return !items.completed;
    return true;
  });

  const addHandler = (item) => {
    setTodoList([...todoList, {
      id: +new Date(), 
      item,
      completed: false,
    }]);
  }

  const statusHandler = (id) => {
    const newTodoList = todoList.map(item => 
      item.id === id ? {...item, completed: !item.completed} : item
    );
    setTodoList(newTodoList);
  }

  const deleteHandler = (id) => {
    const newTodoList = todoList.filter(items => items.id !== id);
    setTodoList(newTodoList);
  }

  const editHandler = (id, newText) => {
    if(newText.trim() === ""){
      alert('Teks tidak boleh kosong');
      return;
    }
    const updatedText = todoList.map(items => 
      items.id === id ? {...items, item: newText} : items
    );
    setTodoList(updatedText);
  }

  return (
    <>
    <div className="max-w-xl text-center my-6 mx-auto">
      <p className='text-4xl font-bold'>To Do App</p>
    </div>
      <ToDoInput onAdd={addHandler}/>
      <ToDoList list={filteredList} setTodoList={setTodoList} onStatus={statusHandler} onDelete={deleteHandler} onEdit={editHandler}/>
      <FilterButton setFilter={setFilterMode}/>
    </>
  )
}

export default App