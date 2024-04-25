import '../styles/User.css';
import { Button, Table, Breadcrumb } from "react-bootstrap";
import SearchBar from '../components/Searchbar';
import Loader from '../components/Loading.js';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Newtask from '../components/Newtask.js';
import BackgroundUser from '../components/BackgroundUserAdmin.js';

function User() {

  // const user = Cookies.get('name') || '';
  // console.log(user);
  // console.log(user.endsWith('false'));

  const [loading, setLoading] = useState(true);
  const [infoUser, setInfoUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of records per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/projectx/task_info.php");
        const data = await response.json();
        setInfoUser(data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(infoUser.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = infoUser.slice(startIndex, endIndex);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="main-user">
      <Loader loading={loading} />
      <SearchBar />
      <Breadcrumb data-bs-theme="dark" className="location-user mb-3 mt-3">
        <Breadcrumb.Item>Tickets</Breadcrumb.Item>
        <Breadcrumb.Item active>Solutions</Breadcrumb.Item>
      </Breadcrumb>
      <Table responsive="md" striped bordered hover className="table-user">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>User name</th>
            <th>Status</th>
            <th>Create date</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(task => (
            <tr key={task.pk_task}>
              <td style={{ alignContent: 'center', alignItems: 'center', textAlign: 'center' }}>#{task.pk_task}</td>
              <td>{task.title}</td>
              <td>{task.login}</td>
              <td>{task.status}</td>
              <td>{task.date_create}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination d-flex justify-content-center align-items-center">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          <svg width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="100" height="100" fill="url(#pattern0_168_3)" transform="translate(100) scale(-1, 1)"/>
            <defs>
              <pattern id="pattern0_168_3" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_168_3" transform="scale(0.01)"/>
              </pattern>
              <image id="image0_168_3" width="100" height="100" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACnUlEQVR4nO3cu2pUQRzH8YMWCjaKregDqI2XB/DyCmLnE4S01lbaWnjFykawEYkRX0A78wAmEHb+m0uVnLn8t1BxJAmbNaIYk2zmf3a+HzikncmPmfmxe3aaBgAAAAAAAAAAAAAAAAAwsZy2V536Z6Lhg0v+yVJav1R6TNUS9dMu+e+iIQ8fl/wPp/754vr6ydLjq4qL8eLvYciOxy/3B/FW6XFWw6l/8PcwwuhJ4a2onik93oknyb/aVSAastMQnLZTOecjpcc9sVzyr3cbiIyC+cyhbygQ2dzC/NeN7W4x5+PjGluV9hyIbp8t8/0Yb5Sex8TYdyA6rMjhZd/706Xn03kHEYiMKvKKJH+n9Jw67WADCcND/93SYO1s6bl10jgCkc1tLCRJ4W7O+WjpOXbKuAKRUTCfejGeLz3Pzhh3ILLZxKjItgLRYTBUZFuBKBXZXCCy/VCRjQUStlaMhhkqsqFAhIpsa4XIzmA+Vl+RLQUiv1TkLzkfa2pkLhAdBhPmJcbrTW3MBqJbFVmSf1TVarEciIy2sTdNLToRiIYsMV5ratCZQNTfa2pAIMZ0JpDIlpXNPBzqoXwIw0+Gk39K7dXyYUgKC/0Ybza1sXaGuOS/uRQeruSVE02NLAXi1M9V/4qqhUBcCsobKkZWiNMwyxdUJrYsv8pbjgbOEMd7wIYO9VRplbUWiKu9ypp6lVSpsiYCcVRZOyvEaZhdHqyd2+OQ6nbAP9hZpcoaCMRRZU396HOBKmsgEEeVtXRxgJ/raXt5TEOq2/9erSHqp7laY4yc+vu7DGOGT2UPgYvxwj+uZ1rtDeLtwxgLhqFoO/WnC8xE/Yte257iH1VAT9srkvxjp+H9xl8ObQAAAAAAAAAAAAAAAABAs08/AXqHGq5I3vLBAAAAAElFTkSuQmCC"/>
            </defs>
          </svg>
        </Button>
        <span>{currentPage} of {totalPages}</span>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          <svg width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="100" height="100" fill="url(#pattern0_168_3)"/>
            <defs>
              <pattern id="pattern0_168_3" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_168_3" transform="scale(0.01)"/>
              </pattern>
              <image id="image0_168_3" width="100" height="100" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACnUlEQVR4nO3cu2pUQRzH8YMWCjaKregDqI2XB/DyCmLnE4S01lbaWnjFykawEYkRX0A78wAmEHb+m0uVnLn8t1BxJAmbNaIYk2zmf3a+HzikncmPmfmxe3aaBgAAAAAAAAAAAAAAAAAwsZy2V536Z6Lhg0v+yVJav1R6TNUS9dMu+e+iIQ8fl/wPp/754vr6ydLjq4qL8eLvYciOxy/3B/FW6XFWw6l/8PcwwuhJ4a2onik93oknyb/aVSAastMQnLZTOecjpcc9sVzyr3cbiIyC+cyhbygQ2dzC/NeN7W4x5+PjGluV9hyIbp8t8/0Yb5Sex8TYdyA6rMjhZd/706Xn03kHEYiMKvKKJH+n9Jw67WADCcND/93SYO1s6bl10jgCkc1tLCRJ4W7O+WjpOXbKuAKRUTCfejGeLz3Pzhh3ILLZxKjItgLRYTBUZFuBKBXZXCCy/VCRjQUStlaMhhkqsqFAhIpsa4XIzmA+Vl+RLQUiv1TkLzkfa2pkLhAdBhPmJcbrTW3MBqJbFVmSf1TVarEciIy2sTdNLToRiIYsMV5ratCZQNTfa2pAIMZ0JpDIlpXNPBzqoXwIw0+Gk39K7dXyYUgKC/0Ybza1sXaGuOS/uRQeruSVE02NLAXi1M9V/4qqhUBcCsobKkZWiNMwyxdUJrYsv8pbjgbOEMd7wIYO9VRplbUWiKu9ypp6lVSpsiYCcVRZOyvEaZhdHqyd2+OQ6nbAP9hZpcoaCMRRZU396HOBKmsgEEeVtXRxgJ/raXt5TEOq2/9erSHqp7laY4yc+vu7DGOGT2UPgYvxwj+uZ1rtDeLtwxgLhqFoO/WnC8xE/Yte257iH1VAT9srkvxjp+H9xl8ObQAAAAAAAAAAAAAAAABAs08/AXqHGq5I3vLBAAAAAElFTkSuQmCC"/>
            </defs>
          </svg>
        </Button>
      </div>
      <Newtask />
    </div>
  );
}

export default User;
