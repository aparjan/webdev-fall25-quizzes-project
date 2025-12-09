"use client";

import Link from "next/link";
import { Button } from "react-bootstrap";
import { FaGithub, FaEnvelope } from "react-icons/fa";

export default function TeamDetails() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">Team Details</h1>
              
              {/* Project Information */}
              <div className="mb-5">
                <h3 className="border-bottom pb-2">Project Information</h3>
                <div className="mt-3">
                  <p><strong>Project Name:</strong> Kambaz Quizzes</p>
                  <p><strong>Course:</strong> CS 5610 - Web Development</p>
                  <p><strong>Section:</strong>Grad - 05</p>
                  <p><strong>Semester:</strong> Fall 2025</p>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-5">
                <h3 className="border-bottom pb-2">Team Members</h3>
                
                {/* Member 1 */}
                <div className="card mb-3 mt-3">
                  <div className="card-body">
                    <h5 className="card-title">Aparnaa Rajan</h5>
                    <p className="mb-2">
                      <FaEnvelope className="me-2" />
                      rajan.apa@northeastern.edu
                    </p>
                  </div>
                </div>

                {/* Member 2 */}
                <div className="card mb-3 mt-3">
                  <div className="card-body">
                    <h5 className="card-title">Anjali Naineni</h5>
                    <p className="mb-2">
                      <FaEnvelope className="me-2" />
                      naineni.a@northeastern.edu
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Github Links */}
              <div className="mb-5">
                <h3 className="border-bottom pb-2">Project Github Links</h3>

                <div className="card mb-3 mt-3">
                  <div className="card-body">
                    <h5 className="card-title">Server Git Link</h5>
                    <p className="mb-0">
                      <FaGithub className="me-2" />
                      <a href="https://github.com/aparjan/webdev-fall25-quizzes-project-server.git" target="_blank" rel="noopener noreferrer">
                        github.com/aparjan
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="card mb-3 mt-3">
                  <div className="card-body">
                    <h5 className="card-title">Client Git Link</h5>
                    <p className="mb-0">
                      <FaGithub className="me-2" />
                      <a href="https://github.com/aparjan/webdev-fall25-quizzes-project.git" target="_blank" rel="noopener noreferrer">
                        github.com/aparjan
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center mt-4">
                <Link href="/Kambaz/Account/Signin">
                  <Button variant="primary" size="lg">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}