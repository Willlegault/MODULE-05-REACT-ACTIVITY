// illustrates forms, lists, etc.
// THE WHOLE POINT OF THIS IS THE ATTRIBUTE 'key' ON LINE

import * as React from 'react';
import { useState } from 'react';
import { Heading, VStack, Button, HStack, NumberInput, NumberInputField } from '@chakra-ui/react';

import { ToDoItem } from './types'
import { ToDoItemEntryForm } from './ToDoItemEntryForm'
import { ToDoListDisplay } from './ToDoListDisplay'
// import { ToDoListDisplay } from './ToDoListDisplayBad';

export default function ToDoApp () {
  const [todoList,setTodolist] = useState<ToDoItem[]>([])
  const [itemKey,setItemKey] = useState<number>(0)   // first unused key
  const [deleteThreshold, setDeleteThreshold] = useState<number | null>(null)

  function handleAdd (title:string, priority:number) {
    if (title === '') {return}   // ignore blank button presses
    setTodolist(todoList.concat({title: title, priority: priority, key: itemKey}))
    setItemKey(itemKey + 1)
  }

  function handleDelete(targetKey:number) {
    const newList = todoList.filter(item => item.key != targetKey)
    setTodolist(newList)
  }

  function handleDeleteGreaterThan() {
    if (deleteThreshold === null) { return }
    const newList = todoList.filter(item => item.priority <= deleteThreshold)
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
    <HStack w='100%'>
      <NumberInput
        value={deleteThreshold ?? ""}
        onChange={(valueString, valueNumber) => setDeleteThreshold(Number.isNaN(valueNumber) ? null : valueNumber)}
        min={0}
        flex={1}
      >
        <NumberInputField placeholder='delete items with priority greater than...' />
      </NumberInput>
      <Button bg='lightblue' onClick={handleDeleteGreaterThan}>Delete greater than</Button>
      <Button bg='lightblue' onClick={handleSortByPriority}>Sort by priority</Button>
    </HStack>
    <ToDoListDisplay items={todoList} onDelete={handleDelete}/>
  </VStack>
  )
}
