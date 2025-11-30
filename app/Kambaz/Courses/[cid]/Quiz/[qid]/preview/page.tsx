"use client";

import { Button, Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const quiz = quizzes.find((q: any) => q._id === qid);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (!quiz) {
      router.push(`/Kambaz/Courses/${cid}/Quiz`);
    }
  }, [quiz]);

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
      if (userAnswer === question.correctAnswer) {
        totalScore += question.points;
      }
    });
    return totalScore;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
  };

  if (!quiz) {
    return <div className="p-3">Loading quiz...</div>;
  }

  if (submitted) {
    return (
      <div className="p-3">
        <div className="alert alert-success">
          <h4>Quiz Submitted!</h4>
          <p>Your score: {score} / {quiz.points}</p>
          <p>Percentage: {((score / quiz.points) * 100).toFixed(2)}%</p>
        </div>
        <Link href={`/Kambaz/Courses/${cid}/Quiz`}>
          <Button variant="primary">Back to Quizzes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div id="wd-quiz-preview" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{quiz.title}</h3>
        {isFaculty && (
          <Link href={`/Kambaz/Courses/${cid}/Quiz/${qid}`}>
            <Button variant="secondary">Edit Quiz</Button>
          </Link>
        )}
      </div>

      {quiz.description && (
        <div className="alert alert-info mb-3">
          <strong>Instructions:</strong> {quiz.description}
        </div>
      )}

      <div className="mb-3">
        <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
        <p><strong>Points:</strong> {quiz.points}</p>
        <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
        <p><strong>Number of Questions:</strong> {quiz.questions?.length || 0}</p>
        <p><strong>Due Date:</strong> {quiz.dueDate}</p>
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
                    value="true"
                    onChange={(e) =>
                      handleAnswerChange(question._id, e.target.value)
                    }
                    disabled={submitted}
                  />
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="False"
                    value="false"
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
                  onChange={(e) =>
                    handleAnswerChange(question._id, e.target.value)
                  }
                  disabled={submitted}
                />
              )}
            </div>
          ))}

          <div className="d-flex justify-content-between">
            <Link href={`/Kambaz/Courses/${cid}/Quiz`}>
              <Button variant="secondary">Cancel</Button>
            </Link>
            {isStudent && !submitted && (
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
    </div>
  );
}