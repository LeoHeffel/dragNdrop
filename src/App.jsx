import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTodos = [
  {
    id: 1,
    text: "Todo 1",
    completed: false,
  },
  {
    id: 2,
    text: "Todo 2",
    completed: false,
  },
  {
    id: 3,
    text: "Todo 3",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startIndex = source.index;
    const endIndex = destination.index;

    let items = [...todos];

    const [reorderedItem] = items.splice(startIndex, 1);

    items.splice(endIndex, 0, reorderedItem);
  
    setTodos(items); 
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo app</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo,index) => (
              <Draggable
                key={todo.id}
                draggableId={`todo-${todo.id}`}
                index={index}
              >
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    {...draggableProvider.dragHandleProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
