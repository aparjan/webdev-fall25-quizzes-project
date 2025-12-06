"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes, deleteQuiz as deleteFromStore, updateQuiz as updateInStore } from "./reducer";
import * as quizzesClient from "./client";
import { BsRocketTakeoff, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical, IoSearchSharp } from "react-icons/io5";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import { Button, Dropdown } from "react-bootstrap";

export default function Quiz() {
  const { cid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const fetchQuizzes = async () => {
    if (!cid) return;
    try {
      const quizzes = await quizzesClient.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.availableUntilDate);

    if (now < availableDate) {
      return `Not available until ${quiz.availableDate}`;
    } else if (now > untilDate) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  const handleAddQuiz = async () => {
    try {
      const newQuiz = {
        title: "Unnamed Quiz",
        course: cid,
        description: "",
        quizType: "Graded Quiz",
        points: 0,
        assignmentGroup: "QUIZZES",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: false,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: new Date().toISOString().split('T')[0],
        availableDate: new Date().toISOString().split('T')[0],
        availableUntilDate: new Date().toISOString().split('T')[0],
        published: false,
        questions: [],
      };
      const createdQuiz = await quizzesClient.createQuizForCourse(cid as string, newQuiz);
      dispatch(setQuizzes([...quizzes, createdQuiz]));
      router.push(`/Kambaz/Courses/${cid}/Quiz/${createdQuiz._id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleDelete = async (quizId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await quizzesClient.deleteQuiz(quizId);
        dispatch(deleteFromStore(quizId));
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const handlePublishToggle = async (quiz: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      if (quiz.published) {
        await quizzesClient.unpublishQuiz(quiz._id);
        dispatch(updateInStore({ ...quiz, published: false }));
      } else {
        await quizzesClient.publishQuiz(quiz._id);
        dispatch(updateInStore({ ...quiz, published: true }));
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const filteredQuizzes = quizzes
    .filter((quiz: any) => quiz.course === cid)
    .filter((quiz: any) => 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((quiz: any) => {
      // Students only see published quizzes
      if (isStudent) {
        return quiz.published;
      }
      return true;
    });

  return (
    <div id="wd-quizzes" className="p-3">
      {/* Search and Action Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <span className="input-group-text bg-white">
            <IoSearchSharp />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for Quiz"
            id="wd-search-quiz"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isFaculty && (
          <Button 
            variant="danger" 
            id="wd-add-quiz"
            onClick={handleAddQuiz}
          >
            <BsPlus className="fs-4" /> Quiz
          </Button>
        )}
      </div>

      {/* Quiz List */}
      <ul className="list-group rounded-0">
        {/* Assignment Quizzes Header */}
        <li className="list-group-item p-3 bg-secondary border">
          <div className="d-flex align-items-center">
            <div className="me-2">▼</div>
            <strong>Assignment Quizzes</strong>
          </div>
        </li>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <li className="list-group-item p-4 text-center">
            <p className="text-muted mb-3">
              {isFaculty 
                ? "No quizzes yet. Click the '+ Quiz' button to create your first quiz!"
                : "No quizzes available at this time."}
            </p>
            {isFaculty && (
              <Button 
                variant="primary" 
                onClick={handleAddQuiz}
              >
                <BsPlus className="fs-5" /> Add Quiz
              </Button>
            )}
          </li>
        )}

        {/* Quiz Items - Dynamic */}
        {filteredQuizzes.map((quiz: any) => (
          <li key={quiz._id} className="list-group-item p-3">
            <div className="d-flex align-items-start">
              <BsRocketTakeoff className="me-3 fs-4 text-success" />
              <div className="flex-grow-1">
                <Link
                  href={`/Kambaz/Courses/${cid}/Quiz/${quiz._id}/details`}
                  className="wd-quiz-link text-decoration-none text-dark fw-bold"
                >
                  {quiz.title}
                </Link>
                <div className="text-muted small">
                  <span className="fw-bold">{getAvailabilityStatus(quiz)}</span>
                  {" | "}
                  <span>Due {quiz.dueDate}</span>
                  {" | "}
                  <span>{quiz.points} pts</span>
                  {" | "}
                  <span>{quiz.questions?.length || 0} Questions</span>
                  {isStudent && quiz.lastScore !== undefined && (
                    <>
                      {" | "}
                      <span className="fw-bold">Score: {quiz.lastScore}/{quiz.points}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Publish/Unpublish Icon */}
              {isFaculty && (
                <div 
                  onClick={(e) => handlePublishToggle(quiz, e)}
                  style={{ cursor: "pointer" }}
                  className="me-2"
                  title={quiz.published ? "Published - Click to unpublish" : "Unpublished - Click to publish"}
                >
                  {quiz.published ? (
                    <FaCheckCircle className="text-success fs-5" />
                  ) : (
                    <FaBan className="text-danger fs-5" />
                  )}
                </div>
              )}

              {/* Context Menu (3 dots) */}
              {isFaculty && (
                <Dropdown align="end">
                  <Dropdown.Toggle 
                    as="span"
                    id={`dropdown-${quiz._id}`}
                    style={{ cursor: "pointer" }}
                    bsPrefix="custom-dropdown"
                  >
                    <IoEllipsisVertical className="fs-4" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/Kambaz/Courses/${cid}/Quiz/${quiz._id}`);
                      }}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(quiz._id, e);
                      }}
                      className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      as="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePublishToggle(quiz, e);
                      }}
                    >
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}