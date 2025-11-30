"use client";

import { Button, Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, updateQuiz as updateInStore } from "../reducer";
import * as quizzesClient from "../client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const existingQuiz = quizzes.find((q: any) => q._id === qid);
  const isNewQuiz = qid === "new";
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState({
    _id: "",
    title: "",
    course: cid,
    description: "",
    quizType: "Graded Quiz",
    points: 100,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-12-31",
    availableDate: "2024-01-01",
    availableUntilDate: "2024-12-31",
    published: false,
    questions: [],
  });

  useEffect(() => {
    if (existingQuiz && !isNewQuiz) {
      setQuiz(existingQuiz);
    }
  }, [existingQuiz, isNewQuiz]);

  useEffect(() => {
    if (!isFaculty) {
      router.push(`/Kambaz/Courses/${cid}/Quiz`);
    }
  }, [isFaculty]);

  const handleSave = async () => {
    try {
      if (isNewQuiz) {
        const newQuiz = await quizzesClient.createQuizForCourse(cid as string, quiz);
        dispatch(addQuiz(newQuiz));
      } else {
        const updatedQuiz = await quizzesClient.updateQuiz(quiz);
        dispatch(updateInStore(updatedQuiz));
      }
      router.push(`/Kambaz/Courses/${cid}/Quiz`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handlePublish = async () => {
    try {
      if (!isNewQuiz) {
        await quizzesClient.publishQuiz(quiz._id);
        const updatedQuiz = { ...quiz, published: true };
        dispatch(updateInStore(updatedQuiz));
        setQuiz(updatedQuiz);
      }
    } catch (error) {
      console.error("Error publishing quiz:", error);
    }
  };

  const handleUnpublish = async () => {
    try {
      if (!isNewQuiz) {
        await quizzesClient.unpublishQuiz(quiz._id);
        const updatedQuiz = { ...quiz, published: false };
        dispatch(updateInStore(updatedQuiz));
        setQuiz(updatedQuiz);
      }
    } catch (error) {
      console.error("Error unpublishing quiz:", error);
    }
  };

  if (!isFaculty) {
    return null;
  }

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-end mb-3">
        <span className="me-3">
          Points: {quiz.points}
        </span>
        {!isNewQuiz && (
          <span className="me-3">
            {quiz.published ? (
              <span className="badge bg-success">Published</span>
            ) : (
              <span className="badge bg-secondary">Not Published</span>
            )}
          </span>
        )}
      </div>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Details
          </a>
        </li>
        <li className="nav-item">
          <Link href={`/Kambaz/Courses/${cid}/Quiz/${qid}/questions`} className="nav-link">
            Questions
          </Link>
        </li>
      </ul>

      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            id="wd-quiz-title"
            placeholder="Quiz Title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quiz Instructions:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
        </Form.Group>

        <div className="row mb-3">
          <Form.Label column sm={2}>
            Quiz Type
          </Form.Label>
          <div className="col-sm-10">
            <Form.Select
              value={quiz.quizType}
              onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
            >
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Graded Survey</option>
              <option>Ungraded Survey</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <div className="col-sm-10">
            <Form.Control
              type="number"
              value={quiz.points}
              onChange={(e) => setQuiz({ ...quiz, points: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label column sm={2}>
            Assignment Group
          </Form.Label>
          <div className="col-sm-10">
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
            >
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>ASSIGNMENTS</option>
              <option>PROJECT</option>
            </Form.Select>
          </div>
        </div>

        <div className="border p-3 mb-3">
          <h5>Options</h5>
          
          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            className="mb-2"
          />

          <div className="row mb-2">
            <Form.Label column sm={3}>
              Time Limit (minutes)
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="number"
                value={quiz.timeLimit}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <Form.Check
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts}
            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
            className="mb-2"
          />

          <Form.Check
            type="checkbox"
            label="Show Correct Answers"
            checked={quiz.showCorrectAnswers}
            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
            className="mb-2"
          />

          <div className="row mb-2">
            <Form.Label column sm={3}>
              Access Code
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="text"
                value={quiz.accessCode}
                onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </div>

          <Form.Check
            type="checkbox"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
            className="mb-2"
          />

          <Form.Check
            type="checkbox"
            label="Webcam Required"
            checked={quiz.webcamRequired}
            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
            className="mb-2"
          />

          <Form.Check
            type="checkbox"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
          />
        </div>

        <div className="border p-3 mb-3">
          <h5>Assign</h5>

          <Form.Label className="fw-bold">Due Date</Form.Label>
          <Form.Control
            type="date"
            value={quiz.dueDate}
            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            className="mb-3"
          />

          <div className="row">
            <div className="col-md-6">
              <Form.Label className="fw-bold">Available from</Form.Label>
              <Form.Control
                type="date"
                value={quiz.availableDate}
                onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <Form.Label className="fw-bold">Until</Form.Label>
              <Form.Control
                type="date"
                value={quiz.availableUntilDate}
                onChange={(e) => setQuiz({ ...quiz, availableUntilDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-between">
          <div>
            {!isNewQuiz && (
              <>
                {quiz.published ? (
                  <Button
                    variant="warning"
                    onClick={handleUnpublish}
                    className="me-2"
                  >
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handlePublish}
                    className="me-2"
                  >
                    Publish
                  </Button>
                )}
              </>
            )}
          </div>
          <div>
            <Link href={`/Kambaz/Courses/${cid}/Quiz`}>
              <Button variant="secondary" className="me-2">
                Cancel
              </Button>
            </Link>
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}