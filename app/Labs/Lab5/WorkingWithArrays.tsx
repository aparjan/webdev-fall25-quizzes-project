"use client"
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API} target="_blank">
                Get Todos
            </a>
            <hr />
            <h4>Retrieving an Item from an Array by ID</h4>
            <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end"
                href={`${API}/${todo.id}`} target="_blank">
                Get Todo by ID
            </a>
            <FormControl 
                id="wd-todo-id" 
                className="w-50"
                defaultValue={todo.id}
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
            />
            <hr />
            <h4>Filtering Array Items</h4>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary"
                href={`${API}?completed=true`} target="_blank">
                Get Completed Todos
            </a>
            <hr />
            <h4>Creating new Items in an Array</h4>
            <a id="wd-create-todo" className="btn btn-primary"
                href={`${API}/create`} target="_blank">
                Create Todo
            </a>
            <hr />
            <h4>Removing from an Array</h4>
            <a id="wd-remove-todo" className="btn btn-primary float-end"
                href={`${API}/${todo.id}/delete`} target="_blank">
                Remove Todo with ID = {todo.id}
            </a>
            <FormControl 
                defaultValue={todo.id} 
                className="w-50"
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
            />
            <hr />
            <h4>Updating an Item in an Array</h4>
            <a id="wd-update-todo" className="btn btn-primary float-end"
                href={`${API}/${todo.id}/title/${todo.title}`} target="_blank">
                Update Todo
            </a>
            <FormControl 
                defaultValue={todo.id} 
                className="w-50 mb-2"
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
            />
            <FormControl 
                defaultValue={todo.title} 
                className="w-50 mb-2"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })} 
            />
            
            <a id="wd-update-todo-description" className="btn btn-primary float-end"
                href={`${API}/${todo.id}/description/${todo.description}`} target="_blank">
                Update Description
            </a>
            <FormControl 
                defaultValue={todo.description} 
                className="w-50 mb-2"
                as="textarea"
                rows={3}
                onChange={(e) => setTodo({ ...todo, description: e.target.value })} 
            />
            
            <a id="wd-update-todo-completed" className="btn btn-primary float-end"
                href={`${API}/${todo.id}/completed/${todo.completed}`} target="_blank">
                Update Completed
            </a>
            <div className="form-check mb-2">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                />
                <label className="form-check-label">
                    Completed
                </label>
            </div>
            <hr />
        </div>
    );
}