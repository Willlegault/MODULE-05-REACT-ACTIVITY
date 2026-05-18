import * as React from 'react';
import { useState } from 'react';
import { Button, Box, FormControl, FormLabel, Input, VStack, HStack } from '@chakra-ui/react';

export function ToDoItemEntryForm (props: {onAdd:(title:string, priority:string)=>void}) {
    // state variables for this form
    const [title,setTitle] = useState<string>("")
    const [priority,setPriority] = useState("")

    function handleClick(event: React.FormEvent) {
      event.preventDefault()  // magic, sorry.

      if (title === '') {return}   // ignore blank button presses
      props.onAdd(title, priority)    // tell the parent about the new item
      setTitle('')   // resetting the values redisplays the placeholder
      setPriority('')   // resetting the values redisplays the placeholder
    }
  
    return (    
      <VStack spacing={0} align='left' w='100%'>
        <form style={{width:'100%'}}>
          <FormControl>
            <VStack align='left' spacing={0} w='100%'>
            <FormLabel as="b">Add TODO item here:</FormLabel>
            {/* Inputs sized to align with table column widths: 50% / 25% / 25% */}
            <HStack w='100%' align='flex-start'>
              <Input
                name="title"
                value={title}
                placeholder='type item name here'
                onChange={(event => {
                  setTitle(event.target.value);
                  console.log('setting Title to:', event.target.value)
                })}
                flex={2}
              />
              <Input
                name="priority"
                value={priority}
                placeholder= 'type priority here'
                onChange={(event => setPriority(event.target.value))}
                flex={1}
              />
              <Box flex={1} display='flex'>
                <Button bg='lightblue' type="submit" onClick={handleClick} w='100%'> Add TODO item</Button>
              </Box>
            </HStack>
            </VStack>
          </FormControl>
        </form>
      </VStack>
    )

  }

  //<Box h='4'></Box>
