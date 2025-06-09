import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CityCount() {
    const navigate = useNavigate();

    const [list, setList] = useState([]);

    const fetchCityCount = () => {
        fetch('http://localhost:8080/customer/city-count')
            .then(response => response.json())
            .then(data => setList(data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchCityCount();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="float-end">


                    </div>
                    <h5>City Count</h5>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(row => (
                                <tr>
                                    <td>{row.city}</td>
                                    <td>{row.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
