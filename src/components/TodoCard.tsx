import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Todo } from "../model";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type TodoCardProps = {
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoCard = ({ index, todo, todos, setTodos }: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleEdit = () => {
    if (!isEditing && !todo.isCompleted) {
      setIsEditing(true);
    }
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setIsEditing(false);
  };

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [isEditing]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className= {`todos__form ${snapshot.isDragging? 'drag' : ''}`}
          ref={provided.innerRef}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <input
              ref={editInputRef}
              type="text"
              className="todos__edit"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isCompleted ? (
            <s className="todos__task">{todo.todo}</s>
          ) : (
            <span className="todos__task">{todo.todo}</span>
          )}
          <div>
            <span className="icon" onClick={toggleEdit}>
              <FaEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <MdDelete />
            </span>
            <span className="icon" onClick={() => handleComplete(todo.id)}>
              <FaCheck />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
