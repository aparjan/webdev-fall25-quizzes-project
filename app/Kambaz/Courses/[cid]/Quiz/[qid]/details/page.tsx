"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const quiz = quizzes.find((q: any) => q._id === qid);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  useEffect(() => {
    if (!quiz) {
      router.push(`/Kambaz/Courses/${cid}/Quiz`);
    }
  }, [quiz]);

  if (!quiz) {
    return <div className="p-3">Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div id="wd-quiz-details" className="p-4">
      {/* Header with buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quiz Details Screen</h2>
        <div>
          {isFaculty && (
            <>
              <Link href={`/Kambaz/Courses/${cid}/Quiz/${qid}/preview`}>
                <Button variant="outline-secondary" className="me-2">
                  Preview
                </Button>
              </Link>
              <Link href={`/Kambaz/Courses/${cid}/Quiz/${qid}`}>
                <Button variant="outline-secondary">
                  Edit
                </Button>
              </Link>
            </>
          )}
          {isStudent && (
            <Link href={`/Kambaz/Courses/${cid}/Quiz/${qid}/preview`}>
              <Button variant="danger">
                Take Quiz
              </Button>
            </Link>
          )}
        </div>
      </div>

      <hr />

      {/* Quiz Title */}
      <h3 className="mb-4">{quiz.title}</h3>

      {/* Quiz Details Table */}
      <table className="table">
        <tbody>
          <tr>
            <td className="text-end fw-bold" style={{ width: "30%" }}>Quiz Type</td>
            <td>{quiz.quizType || "Graded Quiz"}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Points</td>
            <td>{quiz.points}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Assignment Group</td>
            <td>{quiz.assignmentGroup || "QUIZZES"}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Time Limit</td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          
          {quiz.multipleAttempts && (
            <tr>
              <td className="text-end fw-bold">How Many Attempts</td>
              <td>{quiz.allowedAttempts || 1}</td>
            </tr>
          )}
          
          <tr>
            <td className="text-end fw-bold">View Responses</td>
            <td>{quiz.showCorrectAnswers ? "Always" : "Never"}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers ? "Immediately" : "Never"}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Access Code</td>
            <td>{quiz.accessCode || ""}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          
          <tr>
            <td className="text-end fw-bold">Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      {/* Assignment Details */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>Everyone</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.availableUntilDate)}</td>
          </tr>
        </tbody>
      </table>

      {/* Action Buttons at Bottom - Removed for students since button is in header */}
      {isFaculty && (
        <div className="mt-4">
          <Link href={`/Kambaz/Courses/${cid}/Quiz/${qid}/preview`}>
            <Button variant="secondary">
              Preview as Student
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}