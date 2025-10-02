"use client";

import { useState } from "react";
import ModulesControls from "./ModuleControls";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

export default function Modules() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="wd-modules">
      <ModulesControls />
      <br /><br /><br /><br />
      
      <ul id="wd-modules" className="list-group rounded-0">
        {/* Week 1 Module */}
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
            <span className="float-end">
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </span>
          </div>
          
          <ul className="wd-lessons list-group rounded-0">
            {/* LEARNING OBJECTIVES */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div 
                onClick={() => toggleSection('week1-objectives')}
                style={{ cursor: 'pointer' }}
              >
                <BsGripVertical className="me-2 fs-3" />
                {expandedSections['week1-objectives'] ? (
                  <FaCaretDown className="me-2" />
                ) : (
                  <FaCaretRight className="me-2" />
                )}
                LEARNING OBJECTIVES
                <span className="float-end">
                  <GreenCheckmark />
                  <IoEllipsisVertical className="fs-4" />
                </span>
              </div>
              {expandedSections['week1-objectives'] && (
                <ul className="wd-content list-group rounded-0 mt-2">
                  <li className="wd-content-item list-group-item ps-5 border-0">
                    Introduction to the course
                  </li>
                  <li className="wd-content-item list-group-item ps-5 border-0">
                    Learn what is Web Development
                  </li>
                </ul>
              )}
            </li>

            {/* READING */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div 
                onClick={() => toggleSection('week1-reading')}
                style={{ cursor: 'pointer' }}
              >
                <BsGripVertical className="me-2 fs-3" />
                {expandedSections['week1-reading'] ? (
                  <FaCaretDown className="me-2" />
                ) : (
                  <FaCaretRight className="me-2" />
                )}
                READING
                <span className="float-end">
                  <GreenCheckmark />
                  <IoEllipsisVertical className="fs-4" />
                </span>
              </div>
              {expandedSections['week1-reading'] && (
                <ul className="wd-content list-group rounded-0 mt-2">
                  <li className="wd-content-item list-group-item ps-5 border-0">
                    Full Stack Developer - Chapter 1 - Introduction
                  </li>
                  <li className="wd-content-item list-group-item ps-5 border-0">
                    Full Stack Developer - Chapter 2 - Creating User
                  </li>
                </ul>
              )}
            </li>

            {/* SLIDES */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div 
                onClick={() => toggleSection('week1-slides')}
                style={{ cursor: 'pointer' }}
              >
                <BsGripVertical className="me-2 fs-3" />
                {expandedSections['week1-slides'] ? (
                  <FaCaretDown className="me-2" />
                ) : (
                  <FaCaretRight className="me-2" />
                )}
                SLIDES
                <span className="float-end">
                  <GreenCheckmark />
                  <IoEllipsisVertical className="fs-4" />
                </span>
              </div>
              {expandedSections['week1-slides'] && (
                <ul className="wd-content list-group rounded-0 mt-2">
                  <li className="wd-content-item list-group-item ps-5 border-0">
                    Introduction to Web Development
                  </li>
                  <li className="wd-content-item list-group-item ps-5 border-0">
                    Creating an HTTP server with Node.js
                  </li>
                  <li className="wd-content-item list-group-item ps-5 border-0">
                    Creating a React Application
                  </li>
                </ul>
              )}
            </li>

            {/* LESSON 1 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 1
              <span className="float-end">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
              </span>
            </li>

            {/* LESSON 2 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 2
              <span className="float-end">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
              </span>
            </li>
          </ul>
        </li>

        {/* Week 2 Module */}
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 2, Lecture 2 - Formatting User Interfaces with HTML
            <span className="float-end">
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </span>
          </div>
          
          <ul className="wd-lessons list-group rounded-0">
            {/* LEARNING OBJECTIVES */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretRight className="me-2" />
              LEARNING OBJECTIVES
              <span className="float-end">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
              </span>
            </li>

            {/* LESSON 1 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 1
              <span className="float-end">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
              </span>
            </li>

            {/* LESSON 2 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 2
              <span className="float-end">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}