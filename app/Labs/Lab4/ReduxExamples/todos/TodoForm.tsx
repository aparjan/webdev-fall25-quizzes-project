'use client'
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, Form } from "react-bootstrap";
import { addTodo, updateTodo, setTodo } from "./todoReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    
    return (
        <ListGroup.Item>
            <Button 
                variant="success"
                onClick={() => dispatch(addTodo(todo))} 
                id="wd-add-todo-click"
                className="me-2">
                Add
            </Button>
            <Button 
                variant="warning"
                onClick={() => dispatch(updateTodo(todo))} 
                id="wd-update-todo-click"
                className="me-2">
                Update
            </Button>
            <Form.Control
                value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                placeholder="Enter todo"
            />
        </ListGroup.Item>
    );
}