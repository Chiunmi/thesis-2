import React, { useState } from "react";
import Modal from "react-modal";
import { useLocation, Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const EditStockPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const location = useLocation();
  const {
    inventoryData = [],
    suppliesData = [],
    equipmentData = [],
  } = location.state || {};

  const [activeTab, setActiveTab] = useState("medicine");
  const [medicineStocks, setMedicineStocks] = useState(inventoryData);
  const [suppliesStocks, setSuppliesStocks] = useState(suppliesData);
  const [equipmentStocks, setEquipmentStocks] = useState(equipmentData);

  const handleInputChange = (index, value, field, category) => {
    if (category === "medicine") {
      const updatedStocks = [...medicineStocks];
      updatedStocks[index][field] = value;
      setMedicineStocks(updatedStocks);
    } else if (category === "supplies") {
      const updatedStocks = [...suppliesStocks];
      updatedStocks[index][field] = value;
      setSuppliesStocks(updatedStocks);
    } else if (category === "equipment") {
      const updatedStocks = [...equipmentStocks];
      updatedStocks[index][field] = value;
      setEquipmentStocks(updatedStocks);
    }
  };

  const renderTable = (data, category) => (
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Current Quantity</th>
          <th>New Quantity</th>
          {category === "medicine" && <th>Expiration Date</th>}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <input
                type="text"
                value={item.productName}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    e.target.value,
                    "productName",
                    category
                  )
                }
              />
            </td>
            <td>{item.currentQty}</td>
            <td>
              <input
                type="number"
                value={item.newStockQty}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    e.target.value,
                    "newStockQty",
                    category
                  )
                }
              />
            </td>
            {category === "medicine" && (
              <td>
                <input
                  type="date"
                  value={item.newStockExp}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      e.target.value,
                      "newStockExp",
                      category
                    )
                  }
                />
              </td>
            )}
            <td>
              <button
                className="edit-stock-delete-btn"
                onClick={() => openDeleteModal(item)}
              >
                Delete
              </button>

              <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                style={{
                  overlay: {
                    backgroundColor: "rgba(225, 225, 225, 0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  },
                  content: {
                    width: "fit-content",
                    minWidth: "25vw",
                    height: "fit-content",
                    margin: "auto",
                    borderRadius: "24px",
                    border: "none",
                    backgroundColor: "#f8f8ff",
                    color: "black",
                  },
                }}
              >
                <div className="right-delete-modal-content">
                  <h3>{selectedProduct?.productName}</h3>
                  <p>Are you sure you want to delete this product?</p>
                  <div className="delete-modal-buttons">
                    <button className="close-btn" onClick={closeDeleteModal}>
                      Close
                    </button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              </Modal>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="edit-stock">
      <div className="back-to-admin">
        <ArrowBackRoundedIcon style={{ color: "white", marginTop: "0.3vh" }} />
        <Link to="/manage" className="back-to-admin-btn-link">
          <h3 className="back-to-admin-btn">Back to Stocks</h3>
        </Link>
      </div>
      <h2>Edit Stocks</h2>

      <div className="inventory-tabs">
        <button
          className={`tab-button ${activeTab === "medicine" ? "active" : ""}`}
          onClick={() => setActiveTab("medicine")}
        >
          Medicine
        </button>
        <button
          className={`tab-button ${activeTab === "supplies" ? "active" : ""}`}
          onClick={() => setActiveTab("supplies")}
        >
          Supplies
        </button>
        <button
          className={`tab-button ${activeTab === "equipment" ? "active" : ""}`}
          onClick={() => setActiveTab("equipment")}
        >
          Equipment
        </button>
      </div>

      <div className="edit-stock-table">
        {activeTab === "medicine" && renderTable(medicineStocks, "medicine")}
        {activeTab === "supplies" && renderTable(suppliesStocks, "supplies")}
        {activeTab === "equipment" && renderTable(equipmentStocks, "equipment")}
      </div>
      <div className="save-stock">
        <button className="save-edit-stock-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default EditStockPage;
