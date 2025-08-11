import React from "react";
import { Container, Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./searchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { motion } from "framer-motion";

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <Navbar 
        bg="gradient" 
        variant="dark" 
        expand="lg" 
        collapseOnSelect
        className="modern-navbar"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container>
          <LinkContainer to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navbar.Brand className="brand-text">
                <i className="fas fa-home me-2"></i>
                Smart Hostel
              </Navbar.Brand>
            </motion.div>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            
            <Nav className="ms-auto">
              <LinkContainer to="/attendance">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Nav.Link className="nav-link-modern">
                    <i className="fas fa-calendar-check me-1"></i> 
                    Attendance
                    <Badge bg="success" className="ms-1">Live</Badge>
                  </Nav.Link>
                </motion.div>
              </LinkContainer>
              
              <LinkContainer to="/addStudent">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Nav.Link className="nav-link-modern">
                    <i className="fas fa-user-plus me-1"></i> 
                    Add Student
                  </Nav.Link>
                </motion.div>
              </LinkContainer>
              
              <LinkContainer to="/analysis">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Nav.Link className="nav-link-modern">
                    <i className="fas fa-chart-bar me-1"></i> 
                    Analytics
                  </Nav.Link>
                </motion.div>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown 
                  title={
                    <motion.span whileHover={{ scale: 1.05 }}>
                      <i className="fas fa-user-circle me-1"></i>
                      {userInfo.name}
                    </motion.span>
                  } 
                  id="username"
                  className="nav-dropdown-modern"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user-cog me-2"></i>Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin && (
                    <LinkContainer to="/userList">
                      <NavDropdown.Item>
                        <i className="fas fa-users me-2"></i>Users List
                        <Badge bg="warning" className="ms-2">Admin</Badge>
                      </NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link className="nav-link-modern">
                      <i className="fas fa-sign-in-alt me-1"></i> 
                      Sign In
                    </Nav.Link>
                  </motion.div>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.header>
  );
};

export default Header;
