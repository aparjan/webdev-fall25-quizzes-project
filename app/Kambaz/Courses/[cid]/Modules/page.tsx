"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ModulesControls from "./ModuleControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons, { ModuleControlButtons } from "./LessonControlButton";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import * as coursesClient from "../../client";
import * as modulesClient from "./client";

// Define types
interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchModules = async () => {
    if (!cid) return;
    try {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    } catch (error: any) {
      console.error("Error fetching modules:", error);
      if (error.response?.status === 404) {
        dispatch(setModules([]));
      }
    }
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const createModuleForCourse = async () => {
    if (!cid || !moduleName) return;
    try {
      const newModule = await coursesClient.createModuleForCourse(cid as string, { name: moduleName });
      dispatch(addModule(newModule));
      setModuleName("");
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const removeModule = async (moduleId: string) => {
  try {
    await modulesClient.deleteModule(cid as string, moduleId);
    dispatch(deleteModule(moduleId));
  } catch (error) {
    console.error("Error deleting module:", error);
  }
};

const saveModule = async (module: Module) => {
  const { editing, lessons, ...moduleToSave } = module;
  try {
    await coursesClient.updateModule(cid as string, moduleToSave);
    dispatch(updateModule({ ...module, editing: false }));
  } catch (error) {
    console.error("Error updating module:", error);
  }
};

  return (
    <div className="wd-modules">
      {isFaculty && (
        <ModulesControls 
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={createModuleForCourse}
        />
      )}
      <br /><br /><br /><br />
      
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: Module) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.editing && isFaculty ? (
                <input
                  className="w-50 d-inline-block"
                  value={module.name || ""}
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule(module);
                    }
                  }}
                  autoFocus
                />
              ) : (
                module.name
              )}
              {isFaculty && (
                <ModuleControlButtons 
                  moduleId={module._id} 
                  deleteModule={() => removeModule(module._id)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>
            
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: Lesson) => (
                  <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}