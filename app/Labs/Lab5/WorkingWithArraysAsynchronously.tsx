"use client"
import React, { useEffect, useState } from "react";
import * as client from "./client";
import { FaTrash, FaPlusCircle, FaTimesCircle, FaPencilAlt } from "react-icons/fa";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
    };

    const removeTodo = async (todo: any) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
    };

    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };

    const postNewTodo = async () => {
        const newTodo = await client.postNewTodo({ 
            title: "New Posted Todo", 
            completed: false 
        });
        setTodos([...todos, newTodo]);
    };

    const updateTodo = async (todo: any) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };

    const editTodo = (todo: any) => {
        const updatedTodos = todos.map((t) => 
            t.id === todo.id ? { ...todo, editing: true } : t
        );
        setTodos(updatedTodos);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            {errorMessage && (
                <div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">
                    {errorMessage}
                </div>
            )}
            <h4>
                Todos 
                <FaPlusCircle 
                    onClick={postNewTodo}
                    className="text-success float-end fs-3"
                    id="wd-post-todo"
                    style={{ cursor: "pointer" }}
                />
            </h4>
            <ul className="list-group">
                {todos.map((todo) => (
                    <li className="list-group-item" key={todo.id}>
                        <FaPencilAlt 
                            onClick={() => editTodo(todo)}
                            className="text-primary float-end me-3 mt-1"
                            style={{ cursor: "pointer" }}
                        />
                        <input 
                            type="checkbox" 
                            className="form-check-input me-2 float-start"
                            defaultChecked={todo.completed}
                            onChange={(e) => {
                                const updatedTodo = { ...todo, completed: e.target.checked };
                                updateTodo(updatedTodo);
                            }}
                        />
                        {!todo.editing ? (
                            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                {todo.title}
                            </span>
                        ) : (
                            <input 
                                className="form-control w-50 float-start"
                                defaultValue={todo.title}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={(e) => 
                                    updateTodo({ ...todo, title: e.target.value })
                                }
                            />
                        )}
                        <FaTimesCircle 
                            onClick={() => deleteTodo(todo)}
                            className="text-danger float-end mt-1 ms-2"
                            id="wd-delete-todo"
                            style={{ cursor: "pointer" }}
                        />
                        <FaTrash 
                            onClick={() => removeTodo(todo)}
                            className="text-danger float-end mt-1"
                            id="wd-remove-todo"
                            style={{ cursor: "pointer" }}
                        />
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}