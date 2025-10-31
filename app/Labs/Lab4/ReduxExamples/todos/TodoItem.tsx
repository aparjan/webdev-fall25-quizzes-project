'use client'
import { useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { deleteTodo, setTodo } from "./todoReducer";

interface Todo {
    id: string;
    title: string;
}

export default function TodoItem({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();
    
    return (
        <ListGroup.Item>
            <Button
                variant="danger"
                onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className="me-2">
                Delete
            </Button>
            <Button
                variant="primary"
                onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
                className="me-2">
                Edit
            </Button>
            {todo.title}
        </ListGroup.Item>
    );
}