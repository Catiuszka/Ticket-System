import '../styles/Admin.css';
import { Button, Table, Breadcrumb } from "react-bootstrap";
import SearchBar from '../components/Searchbar';
import Loader from '../components/Loading.js';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Admin() {
  console.log(Cookies.get('name'));

  const [loading, setLoading] = useState(true);
  const [infoAdmin, setInfoAdmin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of records per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/projectx/solution_info.php");
        const data = await response.json();
        setInfoAdmin(data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(infoAdmin.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = infoAdmin.slice(startIndex, endIndex);

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
    <div className="main-admin">
      <Loader loading={loading} />
      <SearchBar />
      <Breadcrumb data-bs-theme="dark" className="location-admin mb-3 mt-3">
        <Breadcrumb.Item>Tickets</Breadcrumb.Item>
        <Breadcrumb.Item active>Solutions</Breadcrumb.Item>
      </Breadcrumb>
      <Table responsive="md" striped bordered hover className="table-admin">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Reporter</th>
            <th>Create date</th>
            <th>Update date</th>
            <th>End date</th>
            <th>Respond</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(task => (
            <tr key={task.pk_task}>
              <td style={{ alignContent: 'center', alignItems: 'center', textAlign: 'center' }}>#{task.pk_solutions}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.login}</td>
              <td>{task.date_create}</td>
              <td>{task.date_update}</td>
              <td>{task.date_end}</td>
              <td style={{ alignContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Button className="button-admin">
                <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect width="28" height="30" fill="url(#pattern0_11_53)"/>
                <defs>
                  <pattern id="pattern0_11_53" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_11_53" transform="matrix(0.0111111 0 0 0.0103704 0 0.0333333)"/>
                  </pattern>
                  <image id="image0_11_53" width="90" height="90" xlinkHref="data:image/png;base64,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"/>
                </defs>
            </svg>
                </Button>
              </td>
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
    </div>
  );
}

export default Admin;
