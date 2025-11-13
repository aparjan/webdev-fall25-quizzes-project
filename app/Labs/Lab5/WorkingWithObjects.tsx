"use client"
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    const [module, setModule] = useState({
        id: "M101",
        name: "Introduction to Web Development",
        description: "Learn the basics of HTML, CSS, and JavaScript",
        course: "CS5610"
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            
            {/* Assignment Section */}
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${ASSIGNMENT_API_URL}`}
                target="_blank">
                Get Assignment
            </a>
            <hr />
            
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${ASSIGNMENT_API_URL}/title`}
                target="_blank">
                Get Title
            </a>
            <hr />
            
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
                target="_blank">
                Update Title
            </a>
            <FormControl 
                className="w-75 mb-3" 
                id="wd-assignment-title"
                defaultValue={assignment.title} 
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })}
            />
            
            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
                target="_blank">
                Update Score
            </a>
            <FormControl 
                className="w-75 mb-3" 
                id="wd-assignment-score"
                type="number"
                defaultValue={assignment.score} 
                onChange={(e) =>
                    setAssignment({ ...assignment, score: parseInt(e.target.value) })}
            />
            
            <a id="wd-update-assignment-completed"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
                target="_blank">
                Update Completed
            </a>
            <div className="form-check mb-3">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="wd-assignment-completed"
                    checked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="wd-assignment-completed">
                    Completed
                </label>
            </div>
            <hr />

            {/* Module Section */}
            <h4>Retrieving Module Objects</h4>
            <a id="wd-retrieve-module" className="btn btn-primary"
                href={`${MODULE_API_URL}`}
                target="_blank">
                Get Module
            </a>
            <hr />
            
            <h4>Retrieving Module Properties</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
                href={`${MODULE_API_URL}/name`}
                target="_blank">
                Get Module Name
            </a>
            <hr />
            
            <h4>Modifying Module Properties</h4>
            <a id="wd-update-module-name"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/name/${module.name}`}
                target="_blank">
                Update Module Name
            </a>
            <FormControl 
                className="w-75 mb-3" 
                id="wd-module-name"
                defaultValue={module.name} 
                onChange={(e) =>
                    setModule({ ...module, name: e.target.value })}
            />
            
            <a id="wd-update-module-description"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/description/${module.description}`}
                target="_blank">
                Update Module Description
            </a>
            <FormControl 
                className="w-75 mb-3" 
                id="wd-module-description"
                as="textarea"
                rows={3}
                defaultValue={module.description} 
                onChange={(e) =>
                    setModule({ ...module, description: e.target.value })}
            />
            <hr />
        </div>
    );
}