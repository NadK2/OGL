import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import Products from "./Pages/Products";
import Customers from "./Pages/Customers";
import AddProduct from "./Pages/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import UpdateCustomer from "./Pages/UpdateCustomer";
import AddCustomer from "./Pages/AddCustomer";
import CustomerMap from "./Pages/CustomerMap";
import CityCount from "./Pages/CityCount";

function App() {

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Dev App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customer">Customers</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<UpdateProduct />} />
          <Route path="/customer/add" element={<AddCustomer />} />
          <Route path="/customer/map" element={<CustomerMap />} />
          <Route path="/customer/city-count" element={<CityCount />} />
          <Route path="/customer/:id" element={<UpdateCustomer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
