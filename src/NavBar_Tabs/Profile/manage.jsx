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
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import "./manage.css";

const Manage = () => {
  const [editModalVisible, setEditModalVisible] = useState(false); // For edit modal
  const [removeModalVisible, setRemoveModalVisible] = useState(false); // For remove modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityInput, setQuantityInput] = useState({}); // Use an object to track quantities by product ID

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

  const openEditModal = () => {
    // Initialize the quantityInput state with current quantities
    const initialQuantities = {};
    inventoryData.forEach((product) => {
      initialQuantities[product.id] = product.currentQty;
    });
    setQuantityInput(initialQuantities);
    setEditModalVisible(true);
  };

  const handleSaveChanges = () => {
    // Update all products with the edited quantities
    const updatedData = inventoryData.map((item) => {
      if (quantityInput[item.id] !== undefined) {
        return {
          ...item,
          initialQty: Number(quantityInput[item.id]), // Set the input number to initialQty
          currentQty: 0, // Reset currentQty
        };
      }
      return item;
    });

    console.log(updatedData); // You can set this updated data to state or handle it according to your data flow

    // Close the modal
    setEditModalVisible(false);
  };

  const handleRemoveStock = () => {
    // Implement the logic to remove stock
    console.log("Removing stock for:", selectedProduct.productName);

    setRemoveModalVisible(false); // Close the remove modal
    setSelectedProduct(null);
  };

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
            <button className="edit-stock-btn" onClick={openEditModal}>
              Edit Stocks
            </button>
            <Modal
              isOpen={editModalVisible} // Use new state variable
              onRequestClose={() => setEditModalVisible(false)}
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
                  width: "600px",
                  height: "400px",
                  margin: "auto",
                  borderRadius: "24px",
                  border: "none",
                  backgroundColor: "#f8f8ff",
                  color: "black",
                },
              }}
            >
              <div className="edit-stock-modal">
                <h3>Edit Product Quantities</h3>
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Current Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((product) => (
                      <tr key={product.id}>
                        <td>{product.productNo}</td>
                        <td>{product.productName}</td>
                        <td>
                          <input
                            type="number"
                            value={quantityInput[product.id]}
                            onChange={(e) =>
                              setQuantityInput({
                                ...quantityInput,
                                [product.id]: e.target.value,
                              })
                            }
                            className="quantity-input"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="stock-btn">
                  <button
                    className="close-btn"
                    onClick={() => setEditModalVisible(false)}
                  >
                    Close
                  </button>
                  <button
                    className="save-stock-btn"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Modal>
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
                    {/* Remove Stock Icon */}
                    <RemoveCircleRoundedIcon
                      onClick={() => {
                        setSelectedProduct(item);
                        setRemoveModalVisible(true);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "1vw",
                      }}
                    />
                    {/* Remove Modal Component */}
                    <Modal
                      isOpen={removeModalVisible} // State to control the modal's visibility
                      onRequestClose={() => setRemoveModalVisible(false)}
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
                          height: "200px",
                          margin: "auto",
                          marginLeft: "43vw",
                          borderRadius: "24px",
                          border: "none",
                          backgroundColor: "#f8f8ff",
                          color: "black",
                        },
                      }}
                    >
                      <div className="add-stock-modal">
                        <div className="stock-modal">
                          <p>Are you sure you want to remove stock?</p>
                          <h3>Product Name: {selectedProduct?.productName}</h3>
                          <label>
                            Quantity to Remove:
                            <input
                              type="number"
                              placeholder="Input number"
                              value={quantityInput[selectedProduct?.id] || ""} // Use the selected product's ID to manage its quantity input
                              onChange={(e) =>
                                setQuantityInput({
                                  ...quantityInput,
                                  [selectedProduct.id]: e.target.value,
                                })
                              }
                            />
                          </label>
                        </div>
                        <div className="stock-btn">
                          <button
                            className="close-btn"
                            onClick={() => setRemoveModalVisible(false)}
                          >
                            Close
                          </button>
                          <button
                            className="remove-stock-btn"
                            onClick={handleRemoveStock} // Keep the logic for removing stock
                          >
                            Remove
                          </button>
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
