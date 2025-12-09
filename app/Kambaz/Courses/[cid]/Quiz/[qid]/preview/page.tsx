"use client";

import { Button, Form, Alert } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as quizzesClient from "../../client";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const quiz = quizzes.find((q: any) => q._id === qid);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [allAttempts, setAllAttempts] = useState<any[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (!quiz) {
      router.push(`/Kambaz/Courses/${cid}/Quiz`);
      return;
    }

    // Check if this is a faculty preview (from query param or path)
    const urlParams = new URLSearchParams(window.location.search);
    setIsPreviewMode(isFaculty);

    // Load student's previous attempts
    if (isStudent) {
      loadAttempts();
    }
  }, [quiz, isStudent, isFaculty]);

  const loadAttempts = async () => {
    try {
      const attempts = await quizzesClient.getAllAttempts(qid as string);
      setAllAttempts(attempts);
      setAttemptCount(attempts.length);

      const latest = await quizzesClient.getLatestAttempt(qid as string);
      if (latest) {
        setLatestAttempt(latest);
        setAnswers(latest.answers);
        setScore(latest.score);
        setSubmitted(true);
      }
    } catch (error: any) {
      // No attempts yet or error
      console.log("No previous attempts");
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const calculateScore = () => {
    if (!quiz?.questions) return 0;
    
    let totalScore = 0;
    quiz.questions.forEach((question: any) => {
      const userAnswer = answers[question._id];
      
      if (question.type === "fill-in-blank") {
        const correctAnswers = question.correctAnswers || [question.correctAnswer];
        const isCorrect = correctAnswers.some((ans: string) => 
          ans.toLowerCase().trim() === userAnswer?.toLowerCase().trim()
        );
        if (isCorrect) {
          totalScore += question.points;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      }
    });
    return totalScore;
  };

  const isAnswerCorrect = (question: any) => {
    const userAnswer = answers[question._id];
    
    if (question.type === "fill-in-blank") {
      const correctAnswers = question.correctAnswers || [question.correctAnswer];
      return correctAnswers.some((ans: string) => 
        ans.toLowerCase().trim() === userAnswer?.toLowerCase().trim()
      );
    }
    
    return userAnswer === question.correctAnswer;
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);

    // For students, save to database
    if (isStudent && !isPreviewMode) {
      try {
        const attempt = {
          answers,
          score: finalScore,
          course: cid,
        };
        await quizzesClient.submitQuizAttempt(qid as string, attempt);
        await loadAttempts(); // Reload to get updated attempt count
      } catch (error) {
        console.error("Error submitting attempt:", error);
      }
    }

    setSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const canRetake = () => {
    if (isPreviewMode) return true; // Faculty can always preview
    if (!quiz.multipleAttempts) return attemptCount === 0;
    const allowedAttempts = quiz.allowedAttempts || 1;
    return attemptCount < allowedAttempts;
  };

  if (!quiz) {
    return <div className="p-3">Loading quiz...</div>;
  }

  // Show results after submission
  if (submitted) {
    const percentage = quiz.points > 0 ? ((score / quiz.points) * 100).toFixed(2) : 0;
    
    return (
      <div className="p-3">
        {isPreviewMode && (
          <Alert variant="warning">
            This is a preview of the published version of the quiz
          </Alert>
        )}

        <div className="alert alert-success">
          <h4>Quiz Submitted!</h4>
          <p><strong>Score:</strong> {score} / {quiz.points}</p>
          <p><strong>Percentage:</strong> {percentage}%</p>
          {isStudent && !isPreviewMode && (
            <p><strong>Attempt:</strong> {attemptCount} of {quiz.allowedAttempts || 1}</p>
          )}
        </div>

        {/* Show questions with correct/incorrect indicators */}
        <div className="mb-4">
          <h5>Results</h5>
          {quiz.questions.map((question: any, index: number) => {
            const correct = isAnswerCorrect(question);
            const userAnswer = answers[question._id];

            return (
              <div key={question._id} className={`border p-3 mb-3 ${correct ? 'border-success' : 'border-danger'}`}>
                <div className="d-flex justify-content-between align-items-start">
                  <h6>
                    Question {index + 1} ({question.points} pts)
                  </h6>
                  {correct ? (
                    <FaCheckCircle className="text-success fs-4" />
                  ) : (
                    <FaTimes className="text-danger fs-4" />
                  )}
                </div>
                <p>{question.question}</p>
                
                <div className="mt-2">
                  <p className="mb-1"><strong>Your Answer:</strong> {userAnswer || "(No answer)"}</p>
                  {!correct && quiz.showCorrectAnswers && (
                    <p className="mb-1 text-success">
                      <strong>Correct Answer:</strong> {
                        question.type === "fill-in-blank" && question.correctAnswers
                          ? question.correctAnswers.join(", ")
                          : question.correctAnswer
                      }
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-between">
          <Link href={`/Kambaz/Courses/${cid}/Quiz`}>
            <Button variant="secondary">Back to Quizzes</Button>
          </Link>
          
          <div>
            {isFaculty && (
              <Link href={`/Kambaz/Courses/${cid}/Quiz/${qid}/questions`}>
                <Button variant="warning" className="me-2">Edit Quiz</Button>
              </Link>
            )}
            {canRetake() && !isPreviewMode && (
              <Button variant="primary" onClick={handleRetakeQuiz}>
                Retake Quiz
              </Button>
            )}
            {!canRetake() && isStudent && (
              <p className="text-muted mb-0">You have used all {quiz.allowedAttempts || 1} attempts</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Check if student can take quiz
  if (isStudent && !canRetake() && !isPreviewMode) {
    return (
      <div className="p-3">
        <Alert variant="warning">
          <h4>Maximum Attempts Reached</h4>
          <p>You have completed all {quiz.allowedAttempts || 1} allowed attempts for this quiz.</p>
          <p>Your score: {latestAttempt?.score || 0} / {quiz.points}</p>
        </Alert>
        <Link href={`/Kambaz/Courses/${cid}/Quiz`}>
          <Button variant="primary">Back to Quizzes</Button>
        </Link>
      </div>
    );
  }

  // Show quiz taking interface
  return (
    <div id="wd-quiz-preview" className="p-3">
      {isPreviewMode && (
        <Alert variant="warning">
          This is a preview of the published version of the quiz
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>{quiz.title}</h3>
          {isStudent && attemptCount > 0 && (
            <p className="text-muted">Attempt {attemptCount + 1} of {quiz.allowedAttempts || 1}</p>
          )}
        </div>
        {isFaculty && (
          <Link href={`/Kambaz/Courses/${cid}/Quiz/${qid}/questions`}>
            <Button variant="warning">Edit Quiz</Button>
          </Link>
        )}
      </div>

      {quiz.description && (
        <div className="alert alert-info mb-3">
          <strong>Quiz Instructions</strong>
          <p className="mb-0 mt-2">{quiz.description}</p>
        </div>
      )}

      <div className="mb-3 p-3 border">
        <p className="mb-1"><strong>Quiz Type:</strong> {quiz.quizType}</p>
        <p className="mb-1"><strong>Points:</strong> {quiz.points}</p>
        <p className="mb-1"><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
        <p className="mb-1"><strong>Number of Questions:</strong> {quiz.questions?.length || 0}</p>
        <p className="mb-0"><strong>Due Date:</strong> {quiz.dueDate}</p>
      </div>

      <hr />

      {quiz.questions && quiz.questions.length > 0 ? (
        <Form>
          {quiz.questions.map((question: any, index: number) => (
            <div key={question._id} className="mb-4 border p-3">
              <h5>
                Question {index + 1} ({question.points} pts)
              </h5>
              <p>{question.question}</p>

              {question.type === "multiple-choice" && (
                <div>
                  {question.choices?.map((choice: string, choiceIndex: number) => (
                    <Form.Check
                      key={choiceIndex}
                      type="radio"
                      name={`question-${question._id}`}
                      label={choice}
                      value={choice}
                      checked={answers[question._id] === choice}
                      onChange={(e) =>
                        handleAnswerChange(question._id, e.target.value)
                      }
                      disabled={submitted}
                    />
                  ))}
                </div>
              )}

              {question.type === "true-false" && (
                <div>
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="True"
                    value="True"
                    checked={answers[question._id] === "True"}
                    onChange={(e) =>
                      handleAnswerChange(question._id, e.target.value)
                    }
                    disabled={submitted}
                  />
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="False"
                    value="False"
                    checked={answers[question._id] === "False"}
                    onChange={(e) =>
                      handleAnswerChange(question._id, e.target.value)
                    }
                    disabled={submitted}
                  />
                </div>
              )}

              {question.type === "fill-in-blank" && (
                <Form.Control
                  type="text"
                  value={answers[question._id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question._id, e.target.value)
                  }
                  disabled={submitted}
                  placeholder="Enter your answer"
                />
              )}
            </div>
          ))}

          <div className="d-flex justify-content-between mt-4">
            <Link href={`/Kambaz/Courses/${cid}/Quiz`}>
              <Button variant="secondary">
                {submitted ? "Back to Quizzes" : "Cancel"}
              </Button>
            </Link>
            {!submitted && (
              <Button variant="danger" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            )}
          </div>
        </Form>
      ) : (
        <div className="alert alert-warning">
          This quiz has no questions yet.
        </div>
      )}

      {isFaculty && (
        <div className="mt-4 p-3 bg-light">
          <Button 
            variant="link" 
            onClick={() => router.push(`/Kambaz/Courses/${cid}/Quiz/${qid}/questions`)}
          >
            ← Keep Editing This Quiz
          </Button>
        </div>
      )}
    </div>
  );
}