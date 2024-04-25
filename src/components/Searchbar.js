import React from 'react';
import {useState} from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Row, Col, Modal, InputGroup, Dropdown } from "react-bootstrap";
import Cookies from 'js-cookie';
import "../styles/Searchbar.css";

export default function SearchBar() {
  const txt = Cookies.get('name');
  let user = "";
  if (txt) {
    const parts = txt.split(" ");
    user = parts[0];
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () =>{
    Cookies.remove('name');
    window.location = "http://localhost:3000";
  }

  return (
    <div>
      <Modal data-bs-theme="dark" show={show} onHide={handleClose}>
        <Modal.Header className="header-logout" closeButton>
          <Modal.Title>Loging out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={logout}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mb-3 mt-3 align-items-center">
        <Col>
        </Col>
        <Col xs={6} className="d-flex">
        <InputGroup className="searchbar">
          <Form.Control className="input-field" placeholder="Search..." aria-label="Search..." aria-describedby="basic-addon2"/>
          <Button variant="secondary" style={{width:70, fontWeight:'bolder'}}className="search-button">
          <svg fill="#13332D" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg>
          </Button>
          </InputGroup>
        </Col>
        <Col xs={3} className="d-flex justify-content-end align-items-center">
          {/* <Button className="button-logout" type="submit" onClick={handleShow} >
            <svg width="47" height="36" viewBox="0 0 37 26" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect width="37" height="26" fill="url(#pattern0_3_52)"/>
              <defs>
                <pattern id="pattern0_3_52" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_3_52" transform="matrix(0.00780781 0 0 0.0111111 0.148649 0)"/>
                </pattern>
                <image id="image0_3_52" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuklEQVR4nO2dwYoUMRCGSw+ugi+gvqGuHt03UPDiwZMn38GD+ASjHtaR1KDQsKmpAkHxpK6Ip5aMsoiwAzqdVE3n/6COk0m+KSrpTqabCAAAAAAAAADmwDAMBymv7yTRl5z1lMXGvYisp6XP6cQOV6vVJYrM0uxGEn3jLk12i5R1WcZCYTN5BpL5TLa9DpnZpVx4y+GJY7W2WxSNJPrKWwxPHVlfUDSS6Fd3MTJtlDFRNLylcKWgaHgLYYj2l8XIaH+RjNJhIYKi4S2EIdpfFiOj/UUySoeFCIqGtxCGaH9ZjIz2F8koHRYiKBreQhii/WUxMnoepWNhdoXFHv/e4P2URB+UrT2UDplW9Eby35/N+qyK7F4zehzHC+fuLtWQ3XPpSKJfzm1jatldi872cGs7U8ruWfQwDAdFZhPZPYsulMM2SezptraS6HMRuUy70LvoZrK9hXAA0U1kewvhIKKry/YWwoFEV5XtLYSDia4mu+Xgk9gPznb3ner1XUSEGde/LP2ais56VFtw83Flux+rQ2Lj2/X6WnXD7cf1IVqHxhYlo/W4Urb3oTrE8y0d90JOhinrESbDGQX1vLzjPRCNCxapLxqX4FI/o3FTSeqXDtwmlfo1Gjf+pf5kiK0sabPqYNFHW9vB5qztLHocx4uc9VsTyb9+1fZrXA4iOmX73kRyz6ILnO1JE8mbL+tY9Gr18WqRXTK7HA8rB2pwyFGmF/3nOTyqTc8Z3RRvIQzR/rIYGe0vklE6LERQNLyFMET7y2JktL9IRumwEEHR8BbCEO0vi5HR/iIZpcNCBEXDWwj3InqeD4G1zxSNzaPmA8jhKSPrgqKRst12FyOTx02K+RIFXc4nm+045KPnz16mMAfZ2Y5b/qvgv9gcjTqxw1Lf9mmCTKWvWRelXITNZAAAAAAAAAAgJ34CydxBJnVxQcUAAAAASUVORK5CYII="/>
              </defs>
            </svg>
            Log out
          </Button> */}
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle className="dropdown-profile" variant="success" id="dropdown-basic">
              <svg width="37" height="37" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect width="100" height="100" fill="url(#pattern0_163_2)"/>
                <defs>
                  <pattern id="pattern0_163_2" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_163_2" transform="scale(0.01)"/>
                  </pattern>
                  <image id="image0_163_2" width="100" height="100" xlinkHref="data:image/png;base64,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"/>
                </defs>
              </svg>
              <p>&nbsp;{user}&nbsp;</p>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>  <Link to="/pages/Edit.js" className="link">Edit your info</Link> </Dropdown.Item>
              <Dropdown.Item href="#" onClick={handleShow}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}
