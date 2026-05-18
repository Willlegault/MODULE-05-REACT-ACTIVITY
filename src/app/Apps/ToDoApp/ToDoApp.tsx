// illustrates forms, lists, etc.
// THE WHOLE POINT OF THIS IS THE ATTRIBUTE 'key' ON LINE

import * as React from 'react';
import { useState } from 'react';
import { Heading, VStack, Button } from '@chakra-ui/react';

import { ToDoItem } from './types'
import { ToDoItemEntryForm } from './ToDoItemEntryForm'
import { ToDoListDisplay } from './ToDoListDisplay'
// import { ToDoListDisplay } from './ToDoListDisplayBad';

export default function ToDoApp () {
  const [todoList,setTodolist] = useState<ToDoItem[]>([])
  const [itemKey,setItemKey] = useState<number>(0)   // first unused key

  function handleAdd (title:string, priority:number) {
    if (title === '') {return}   // ignore blank button presses
    setTodolist(todoList.concat({title: title, priority: priority, key: itemKey}))
    setItemKey(itemKey + 1)
  }

  function handleDelete(targetKey:number) {
    const newList = todoList.filter(item => item.key != targetKey)
    setTodolist(newList)
  }

  function handleSortByPriority() {
    const sortedList = [...todoList].sort((a, b) => a.priority - b.priority)
    setTodolist(sortedList)
  }

  return (
  <VStack>
    <Heading>TODO List</Heading>
    <ToDoItemEntryForm onAdd={handleAdd}/>
    <Button bg='lightblue' onClick={handleSortByPriority}>Sort by priority</Button>
    <ToDoListDisplay items={todoList} onDelete={handleDelete}/>
  </VStack>
  )
}
