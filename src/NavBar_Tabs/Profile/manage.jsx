import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Modal from "react-modal";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import "./manage.css";

const Manage = () => {
  const [visible, setVisible] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const inventoryData = [
    {
      id: 1,
      productNo: "P001",
      productName: "Paracetamol",
      initialQty: 50,
      currentQty: 40,
      status: "In Stock",
    },
    {
      id: 2,
      productNo: "P002",
      productName: "Medicol",
      initialQty: 30,
      currentQty: 0,
      status: "Out of Stock",
    },
    {
      id: 3,
      productNo: "P003",
      productName: "Diatabs",
      initialQty: 60,
      currentQty: 60,
      status: "In Stock",
    },
    {
      id: 4,
      productNo: "P004",
      productName: "Neozep",
      initialQty: 100,
      currentQty: 80,
      status: "In Stock",
    },
  ];

  const chartData = inventoryData.map((item) => ({
    name: item.productName,
    currentQty: item.currentQty,
  }));

  return (
    <div className="admin-inventory">
      <div className="back">
        <Link to="/admin">
          <button className="back-button">
            <ArrowBackRoundedIcon />
          </button>
        </Link>
      </div>
      <div className="inventory-status">
        <div className="chart">
          <h2>Stock Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="currentQty" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="inventory-table">
        {/* Inventory Management Section */}
        <div className="inventory-management">
          <h2>Stock Management</h2>
          {/* Stock Search Input */}
          <div className="stock-search">
            <input
              type="text"
              className="stock-search-input"
              placeholder="Search Product"
            />
            <SearchRoundedIcon />
          </div>
          <table>
            <thead>
              <tr>
                <th>Product No.</th>
                <th>Product Name</th>
                <th>Initial Qty.</th>
                <th>Current Qty. in Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id}>
                  <td>{item.productNo}</td>
                  <td>{item.productName}</td>
                  <td>{item.initialQty}</td>
                  <td>{item.currentQty}</td>
                  <td
                    style={{
                      color: item.currentQty === 0 ? "red" : "green", // Conditional color based on stock status
                    }}
                  >
                    {item.currentQty === 0 ? "Out of Stock" : "In Stock"}
                  </td>
                  <td>
                    {/* Add Stock Icon */}
                    <ControlPointRoundedIcon
                      onClick={() => {
                        setActionType("add"); // Set action to add
                        setSelectedProduct(item); // Set selected product
                        setVisible(true);
                      }}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "green",
                      }}
                    />
                    {/* Remove Stock Icon */}
                    <RemoveCircleRoundedIcon
                      onClick={() => {
                        setActionType("remove"); // Set action to remove
                        setSelectedProduct(item); // Set selected product
                        setVisible(true);
                      }}
                      style={{ cursor: "pointer", color: "red" }}
                    />
                    {/* Modal Component */}
                    <Modal
                      isOpen={visible}
                      onRequestClose={() => setVisible(false)}
                      style={{
                        overlay: {
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 1,
                          boxShadow: "none",
                        },
                        content: {
                          width: "500px",
                          height: "250px",
                          margin: "auto",
                          marginLeft: "43vw",
                          borderRadius: "24px",
                          border: "none",
                          backgroundColor: "#f8f8ff",
                          color: "black",
                        },
                      }}
                    >
                      <div className="modal-content">
                        <div className="stock-modal">
                          {/* Conditionally render based on actionType and selectedProduct */}
                          {actionType === "add" ? (
                            <>
                              <p>Are you sure you want to add stock?</p>
                              <h3>
                                Product Name: {selectedProduct?.productName}
                              </h3>
                              <label>
                                Quantity:
                                <input
                                  type="number"
                                  placeholder="Input number"
                                />
                              </label>
                            </>
                          ) : (
                            <>
                              <p>Are you sure you want to remove stock?</p>
                              <h3>
                                Product Name: {selectedProduct?.productName}
                              </h3>
                              <label>
                                Quantity:
                                <input
                                  type="number"
                                  placeholder="Input number"
                                />
                              </label>
                            </>
                          )}
                        </div>
                        <div className="stock-btn">
                          {/* Close Button */}
                          <button
                            className="close-btn"
                            onClick={() => setVisible(false)}
                          >
                            Close
                          </button>
                          {/* Action Button Changes Based on actionType */}
                          {actionType === "add" ? (
                            <button className="add-stock-btn">Add</button>
                          ) : (
                            <button className="remove-stock-btn">Remove</button>
                          )}
                        </div>
                      </div>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Manage;
