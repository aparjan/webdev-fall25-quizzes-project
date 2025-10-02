"use client";

import Link from "next/link";
import { Card, Row, Col, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {/* Course 1 - React JS */}
          <Col className="wd-dashboard-course">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src="/images/reactjs.jpg" 
                style={{ height: "160px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="wd-dashboard-course-title">
                  CS1234 React JS
                </Card.Title>
                <Card.Text className="wd-dashboard-course-description flex-grow-1">
                  Full Stack software developer
                </Card.Text>
                <Link href="/Kambaz/Courses/1234/Home" className="text-decoration-none">
                  <Button variant="primary" className="w-100">Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Course 2 - AWS */}
          <Col className="wd-dashboard-course">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src="/images/aws.jpg" 
                style={{ height: "160px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="wd-dashboard-course-title">
                  CS1234 AWS
                </Card.Title>
                <Card.Text className="wd-dashboard-course-description flex-grow-1">
                  Full Stack software developer
                </Card.Text>
                <Link href="/Kambaz/Courses/1234/Home" className="text-decoration-none">
                  <Button variant="primary" className="w-100">Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Course 3 - Python */}
          <Col className="wd-dashboard-course">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src="/images/python.jpg" 
                style={{ height: "160px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="wd-dashboard-course-title">
                  CS1234 Python
                </Card.Title>
                <Card.Text className="wd-dashboard-course-description flex-grow-1">
                  Full Stack software developer
                </Card.Text>
                <Link href="/Kambaz/Courses/1234/Home" className="text-decoration-none">
                  <Button variant="primary" className="w-100">Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Course 4 - Java */}
          <Col className="wd-dashboard-course">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src="/images/java.jpg" 
                style={{ height: "160px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="wd-dashboard-course-title">
                  CS1234 Java
                </Card.Title>
                <Card.Text className="wd-dashboard-course-description flex-grow-1">
                  Full Stack software developer
                </Card.Text>
                <Link href="/Kambaz/Courses/1234/Home" className="text-decoration-none">
                  <Button variant="primary" className="w-100">Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Course 5 - Docker */}
          <Col className="wd-dashboard-course">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src="/images/docker.jpg" 
                style={{ height: "160px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="wd-dashboard-course-title">
                  CS1234 Docker
                </Card.Title>
                <Card.Text className="wd-dashboard-course-description flex-grow-1">
                  Full Stack software developer
                </Card.Text>
                <Link href="/Kambaz/Courses/1234/Home" className="text-decoration-none">
                  <Button variant="primary" className="w-100">Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Course 6 - Node.js */}
          <Col className="wd-dashboard-course">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src="/images/nodejs.jpg" 
                style={{ height: "160px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="wd-dashboard-course-title">
                  CS1234 Node.js
                </Card.Title>
                <Card.Text className="wd-dashboard-course-description flex-grow-1">
                  Full Stack software developer
                </Card.Text>
                <Link href="/Kambaz/Courses/1234/Home" className="text-decoration-none">
                  <Button variant="primary" className="w-100">Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Course 7 - C++ */}
          <Col className="wd-dashboard-course">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src="/images/cplus.jpg" 
                style={{ height: "160px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="wd-dashboard-course-title">
                  CS1234 C++
                </Card.Title>
                <Card.Text className="wd-dashboard-course-description flex-grow-1">
                  Full Stack software developer
                </Card.Text>
                <Link href="/Kambaz/Courses/1234/Home" className="text-decoration-none">
                  <Button variant="primary" className="w-100">Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}