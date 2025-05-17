import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ToDoItem from "./ToDoItem";

function ToDoList({ list, setTodoList, onStatus, onDelete, onEdit }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = list.findIndex((item) => item.id === active.id);
      const newIndex = list.findIndex((item) => item.id === over.id);

      setTodoList((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <>
      <div className="bg-gray-400 max-w-xl mx-auto py-4 px-6 my-6 rounded-xl">
        <p className="text-2xl font-bold text-center">To Do List</p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={list.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {list.map((item) => (
              <SortableTodoItem key={item.id} item={item} itemid={item.id} onStatus={onStatus} onDelete={onDelete} onEdit={onEdit}/>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

function SortableTodoItem({ item, itemid, onStatus, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className=""
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <div className="" {...listeners} style={{ cursor: 'grab', paddingRight: '8px' }}>☰</div>
        <ToDoItem item={item} itemid={itemid} onStatus={onStatus} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </>
  );
}

export default ToDoList;
