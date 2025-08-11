import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Student from "../components/student";
import Loading from "../components/loader.jsx";
import Message from "../components/message.jsx";
import { listStudents } from "../actions/studentActions";
import Paginate from "../components/paginate";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Container,
  Card,
  Badge,
} from "react-bootstrap";
import StudentsTableView from "./studentTableView";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HomeView = ({ match, history }) => {
  const [isGrid, setIsGrid] = useState(true);
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, userInfo } = userLogin;

  const dispatch = useDispatch();

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students, page, pages } = studentsList;

  useEffect(() => {
    if (!userLoading && !userInfo) {
      history.push("/login");
    }
    dispatch(listStudents(keyword, pageNumber));
  }, [keyword, pageNumber]);

  // Parallax effect hook
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section with Parallax */}
      <motion.div
        className="hero-section"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="hero-content text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="display-4 fw-bold mb-3">
            <i className="fas fa-home me-3"></i>
            Smart Hostel Management
          </h1>
          <p className="lead mb-4">
            Efficiently manage student accommodation with real-time tracking and analytics
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
              <i className="fas fa-users me-2"></i>
              {students ? students.length : 0} Students Registered
            </Badge>
          </motion.div>
        </motion.div>
        
        {/* Floating elements for parallax effect */}
        <motion.div
          className="floating-element"
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            fontSize: '3rem',
            opacity: 0.1,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <i className="fas fa-graduation-cap"></i>
        </motion.div>
        
        <motion.div
          className="floating-element"
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            fontSize: '2.5rem',
            opacity: 0.1,
          }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <i className="fas fa-book"></i>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <Container className="py-5">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <Row className="justify-content-md-center mb-4">
            <Col xs lg="2"></Col>
            <Col md="auto">
              <ButtonGroup toggle>
                {["Grid", "Table"].map((type) => (
                  <ToggleButton
                    key={type}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={type}
                    checked={(isGrid ? "Grid" : "Table") === type}
                    onChange={(e) =>
                      setIsGrid(e.target.value === "Grid" ? true : false)
                    }
                    className="modern-toggle"
                  >
                    <i className={`fas fa-${type === "Grid" ? "th-large" : "table"} me-2`}></i>
                    {type}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
        </motion.div>

        <motion.h2
          className="text-center mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <i className="fas fa-users me-3 text-primary"></i>
          Student Directory
        </motion.h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : isGrid ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Row>
            {students.map((student, index) => (
              <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <Student stuentDetails={student} />
                </motion.div>
              </Col>
            ))}
          </Row>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <StudentsTableView keyword={keyword} pageNumber={pageNumber} />
        </motion.div>
      )}
      </Container>
    </motion.div>
  );
};

export default HomeView;
