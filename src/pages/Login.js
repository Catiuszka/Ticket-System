import '../styles/Login.css';
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Background from '../components/Background.js';
import Loader from '../components/Loading.js';
import Footer from '../components/Footer.js';
import Cookies from 'js-cookie';

function Login() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [alert_error, setAlert_error] = useState("");
  let privileges = false;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async function(e) {
    e.preventDefault();
	  setLoading(true);
    
    const currentUser = {
      login: login,
      password: password,
    };
  
    const response = await fetch("http://localhost/projectx/server.php");
    const data = await response.json();
    
    const found = data.filter(record => record.login === currentUser.login && record.password === currentUser.password);
  
    console.log(found);
  
    if (found.length === 0) {
      setAlert_error("Wrong login or password");
      setPassword("");
    } 
      else {
      const isAdmin = found.some(record => record.privileges === "1");
      if (isAdmin) {
        privileges = true;
        Cookies.set('name', login+" "+privileges, { expires: 1 });
        window.location = "http://localhost:3000/pages/Admin.js";
      } else {
        Cookies.set('name', login+" "+privileges, { expires: 1 });
        window.location = "http://localhost:3000/pages/User.js";
      }
    }
    setLoading(false); // Set loading to false after fetching data
  };

  useEffect(() => {
    document.title = "ticket system";
  }, []);

  return (
    <div className="main-login">
      <Loader loading={loading} />
      <Container>
        <Row>
          <Col>
            <div className="text-login">
              <h1 className="fw-bold">Log in or Sign up to start</h1>
            </div>
          </Col>
          <Col>
            <div className="panel-login">
              <Form 
                action="http://localhost:8000/server.php" 
                method="post"
                onSubmit={(event) => handleSubmit(event)}>
              
                <Form.Group className="mb-3" controlId="login">
                  <Form.Label>Login</Form.Label>
                  <Form.Control type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <p className='alert_error'>{alert_error}</p>
                <div className="d-grid gap-2">
                  <Button className="button-login" type="Submit" size="lg">Log in</Button>
                </div>

                <Form.Text muted>
                  Don’t have an account?&nbsp;
                  <Link className="link-login" to="pages/Register.js">
                      <b>Sign up</b>
                  </Link>
                </Form.Text>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer/>
      <Background className="background-login" />
    </div>
  );
}

export default Login;
