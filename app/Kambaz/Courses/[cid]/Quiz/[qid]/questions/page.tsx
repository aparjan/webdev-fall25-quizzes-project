"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateQuiz } from "../../reducer";
import * as quizzesClient from "../../client";
import { Button, Form, Modal } from "react-bootstrap";
import { FaPlus, FaTrash, FaPencil } from "react-icons/fa6";
import Link from "next/link";

interface Question {
  _id: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank";
  question: string;
  points: number;
  choices: string[];
  correctAnswer: string;
  correctAnswers?: string[];
}

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const quiz = quizzes.find((q: any) => q._id === qid);
  const isFaculty = currentUser?.role === "FACULTY";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    _id: "",
    type: "multiple-choice",
    question: "",
    points: 1,
    choices: ["", "", "", ""],
    correctAnswer: "",
    correctAnswers: [],
  });

  useEffect(() => {
    if (!isFaculty) {
      router.push(`/Kambaz/Courses/${cid}/Quiz`);
    }
  }, [isFaculty]);

  useEffect(() => {
    if (quiz?.questions) {
      setQuestions(quiz.questions);
    }
  }, [quiz]);

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setCurrentQuestion({
      _id: `Q-${Date.now()}`,
      type: "multiple-choice",
      question: "",
      points: 1,
      choices: ["", "", "", ""],
      correctAnswer: "",
      correctAnswers: [],
    });
    setShowModal(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setCurrentQuestion({ ...question });
    setShowModal(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter((q) => q._id !== questionId);
      setQuestions(updatedQuestions);
    }
  };

  const handleSaveQuestion = () => {
    if (!currentQuestion.question.trim()) {
      alert("Please enter a question");
      return;
    }

    if (currentQuestion.type === "multiple-choice" && currentQuestion.choices.some(c => !c.trim())) {
      alert("Please fill in all answer choices");
      return;
    }

    if (currentQuestion.type === "fill-in-blank") {
      if (!currentQuestion.correctAnswers || currentQuestion.correctAnswers.length === 0 || 
          currentQuestion.correctAnswers.every(a => !a.trim())) {
        alert("Please add at least one correct answer");
        return;
      }
    } else {
      if (!currentQuestion.correctAnswer) {
        alert("Please select the correct answer");
        return;
      }
    }

    if (editingQuestion) {
      // Update existing question
      const updatedQuestions = questions.map((q) =>
        q._id === editingQuestion._id ? currentQuestion : q
      );
      setQuestions(updatedQuestions);
    } else {
      // Add new question
      setQuestions([...questions, currentQuestion]);
    }

    setShowModal(false);
    setCurrentQuestion({
      _id: "",
      type: "multiple-choice",
      question: "",
      points: 1,
      choices: ["", "", "", ""],
      correctAnswer: "",
      correctAnswers: [],
    });
  };

  const handleSaveAllQuestions = async () => {
    try {
      const updatedQuiz = {
        ...quiz,
        questions,
        points: totalPoints,
      };
      await quizzesClient.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
      alert("Questions saved successfully!");
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("Error saving questions");
    }
  };

  const handleAddChoice = () => {
    setCurrentQuestion({
      ...currentQuestion,
      choices: [...currentQuestion.choices, ""],
    });
  };

  const handleRemoveChoice = (index: number) => {
    if (currentQuestion.choices.length <= 2) {
      alert("Must have at least 2 choices");
      return;
    }
    
    dispatch(updateQuiz(updateQuiz));

    const newChoices = currentQuestion.choices.filter((_, i) => i !== index);
    setCurrentQuestion({
      ...currentQuestion,
      choices: newChoices,
    });
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...currentQuestion.choices];
    newChoices[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      choices: newChoices,
    });
  };

  if (!isFaculty || !quiz) {
    return null;
  }

  return (
    <div id="wd-quiz-questions-editor" className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>Questions</h4>
          <p className="text-muted mb-0">Points: {totalPoints}</p>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <Link 
            href={`/Kambaz/Courses/${cid}/Quiz/${qid}/details`} 
            className="nav-link"
          >
            Details
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Questions
          </a>
        </li>
      </ul>

      {/* Add Question Button */}
      <div className="text-center mb-4">
        <Button variant="outline-secondary" onClick={handleAddQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="alert alert-info text-center">
          No questions yet. Click "New Question" to add your first question.
        </div>
      ) : (
        <div className="mb-4">
          {questions.map((question, index) => (
            <div key={question._id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <h6>
                      Question {index + 1} ({question.points} pts)
                    </h6>
                    <p className="mb-2">{question.question}</p>
                    <small className="text-muted">Type: {question.type}</small>
                    
                    {question.type === "multiple-choice" && (
                      <ul className="mt-2">
                        {question.choices.map((choice, idx) => (
                          <li key={idx} className={choice === question.correctAnswer ? "text-success fw-bold" : ""}>
                            {choice} {choice === question.correctAnswer && "✓"}
                          </li>
                        ))}
                      </ul>
                    )}

                    {question.type === "true-false" && (
                      <p className="mt-2">
                        Correct Answer: <span className="text-success fw-bold">{question.correctAnswer}</span>
                      </p>
                    )}

                    {question.type === "fill-in-blank" && (
                      <div className="mt-2">
                        <strong>Correct Answers:</strong>
                        <ul className="mb-0">
                          {(question.correctAnswers || [question.correctAnswer]).map((ans: string, idx: number) => (
                            <li key={idx} className="text-success">{ans}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    <Button
                      variant="link"
                      className="text-primary p-1 me-2"
                      onClick={() => handleEditQuestion(question)}
                    >
                      <FaPencil />
                    </Button>
                    <Button
                      variant="link"
                      className="text-danger p-1"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save and Cancel Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Link href={`/Kambaz/Courses/${cid}/Quiz`}>
          <Button variant="secondary">Cancel</Button>
        </Link>
        <Button variant="danger" onClick={handleSaveAllQuestions}>
          Save
        </Button>
      </div>

      {/* Question Editor Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingQuestion ? "Edit Question" : "New Question"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Question Type */}
            <Form.Group className="mb-3">
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                value={currentQuestion.type}
                onChange={(e) => {
                  const newType = e.target.value as Question["type"];
                  setCurrentQuestion({
                    ...currentQuestion,
                    type: newType,
                    choices: newType === "true-false" ? ["True", "False"] : 
                             newType === "fill-in-blank" ? [] : ["", "", "", ""],
                    correctAnswer: "",
                    correctAnswers: newType === "fill-in-blank" ? [""] : [],
                  });
                }}
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-in-blank">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>

            {/* Points */}
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={currentQuestion.points}
                onChange={(e) => {
                  const value = e.target.value;
                  setCurrentQuestion({
                    ...currentQuestion,
                    points: value === "" ? "" : parseInt(value),
                  } as any);
                }}
                onBlur={(e) => {
                  if (e.target.value === "" || isNaN(parseInt(e.target.value))) {
                    setCurrentQuestion({
                      ...currentQuestion,
                      points: 1,
                    });
                  }
                }}
                style={{
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                  appearance: "textfield"
                }}
              />
              <style jsx>{`
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              `}</style>
            </Form.Group>

            {/* Question Text */}
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: e.target.value,
                  })
                }
                placeholder="Enter your question here"
              />
            </Form.Group>

            {/* Multiple Choice Answers */}
            {currentQuestion.type === "multiple-choice" && (
              <div className="mb-3">
                <Form.Label>Answers</Form.Label>
                {currentQuestion.choices.map((choice, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Check
                      type="radio"
                      name="correctAnswer"
                      checked={currentQuestion.correctAnswer === choice}
                      onChange={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswer: choice,
                        })
                      }
                      className="me-2"
                      label=""
                    />
                    <Form.Control
                      type="text"
                      value={choice}
                      onChange={(e) => handleChoiceChange(index, e.target.value)}
                      placeholder={`Possible Answer ${index + 1}`}
                      className="me-2"
                    />
                    {currentQuestion.choices.length > 2 && (
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => handleRemoveChoice(index)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="link"
                  className="text-danger p-0"
                  onClick={handleAddChoice}
                >
                  + Add Another Answer
                </Button>
                <div className="text-muted small mt-2">
                  <small>Select the radio button to mark the correct answer</small>
                </div>
              </div>
            )}

            {/* True/False Answer */}
            {currentQuestion.type === "true-false" && (
              <div className="mb-3">
                <Form.Label>Correct Answer</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="True"
                    name="tfAnswer"
                    checked={currentQuestion.correctAnswer === "True"}
                    onChange={() =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: "True",
                      })
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name="tfAnswer"
                    checked={currentQuestion.correctAnswer === "False"}
                    onChange={() =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: "False",
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* Fill in the Blank Answer */}
            {currentQuestion.type === "fill-in-blank" && (
              <div className="mb-3">
                <Form.Label>Possible Correct Answers</Form.Label>
                <p className="text-muted small">Add all acceptable answers (case insensitive)</p>
                {(currentQuestion.correctAnswers || []).map((answer, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      value={answer}
                      onChange={(e) => {
                        const newAnswers = [...(currentQuestion.correctAnswers || [])];
                        newAnswers[index] = e.target.value;
                        setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswers: newAnswers,
                        });
                      }}
                      placeholder={`Possible Answer ${index + 1}`}
                      className="me-2"
                    />
                    {(currentQuestion.correctAnswers || []).length > 1 && (
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => {
                          const newAnswers = (currentQuestion.correctAnswers || []).filter((_, i) => i !== index);
                          setCurrentQuestion({
                            ...currentQuestion,
                            correctAnswers: newAnswers,
                          });
                        }}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="link"
                  className="text-danger p-0"
                  onClick={() => {
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswers: [...(currentQuestion.correctAnswers || []), ""],
                    });
                  }}
                >
                  + Add Another Answer
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSaveQuestion}>
            {editingQuestion ? "Update Question" : "Save Question"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}