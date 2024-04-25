import '../styles/Register.css';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Background from '../components/Background.js';
import Cookies from 'js-cookie';
import Loader from '../components/Loading.js';

function Register() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert_error, setAlert_error] = useState("");
  const [alert_success, setAlert_success] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const Redirect = () => {
    window.location = "http://localhost:3000/pages/User.js";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password1 !== password2){
      setAlert_error("Passwords do not match");
      setPassword1("");
      setPassword2("");
      setLoading(false);
      return;
    }

    if (login.length < 5){
      setAlert_error("the login should contain at least 5 characters");
      setLogin("");
      setLoading(false);
      return;
    }

    if (password1.length < 8){
      setAlert_error("the password should contain at least 8 characters");
      setPassword1("");
      setPassword2("");
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password1', password1); 

    try {
      const response = await fetch('http://localhost/projectx/register.php', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAlert_success(data.success);
        Cookies.set('name', login+' false', { expires: 1 });
        setTimeout(Redirect, 1000);
        setLoading(false);
      } 
      
      else if (data.error) {
        setAlert_error(data.error);
        setLoading(false);
      }

      } catch (error) {
        console.error('There was an error:', error);
        setLoading(false);
      }
  };

  useEffect(() => {
    document.title = "ticket system";
  }, []);

  return (
    <div className="main-register">
      <Loader loading={loading} />
      <Container>
        <Row>
          <Col>
            <div className="text-register">
              <h1 className="fw-bold">Create a new account to start</h1>
            </div>
          </Col>

          <Col>
            <div className="panel-register">
              <Form
              action="http://localhost:8000/register.php" 
              method="post"
              onSubmit={(event) => handleSubmit(event)}
              >

                <Form.Group className="mb-3" controlId="login">
                  <Form.Label>Login</Form.Label>
                  <Form.Control name="login" type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password2">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control name="password2" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                </Form.Group>

                <p className='alert_error'>{alert_error}</p>
                <p className='alert_success'>{alert_success}</p>
                <div className="d-grid gap-2">
                  <Button type="submit" size="lg">Register</Button>
                </div>

                <Form.Text id="passwordHelpBlock" muted>
                  Have an account?&nbsp;
                  <Link to={-1} className="link-register">
                      Log in
                  </Link>
                </Form.Text>

              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Background className="background-register" />
    </div>
  );
}

export default Register;
