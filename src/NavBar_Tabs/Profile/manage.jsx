import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import "./manage.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Manage = () => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityInput, setQuantityInput] = useState({});

  const inventoryData = [
    {
      productName: "Alaxan FR 200/325mg cap",
      initialQty: "500 pcs",
      currentQty: "341 pcs", // Total (new + old)
      oldStockQty: "133 pcs",
      oldStockExp: "Mar-25",
      newStockQty: "208 pcs",
      newStockExp: "Feb-27",
    },
    {
      productName: "Ambroxol HCl RM 30mg tab",
      initialQty: "239 pcs",
      currentQty: "239 pcs",
      oldStockQty: "239 pcs",
      oldStockExp: "Aug-24",
      newStockQty: "0",
      newStockExp: "-",
    },
    {
      productName: "Amoxicillin Trihydrate RM 500mg cap",
      initialQty: "0",
      currentQty: "0",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "0",
      newStockExp: "-",
    },
    {
      productName: "Antamin 4mg tab",
      initialQty: "5 bottles",
      currentQty: "5 bottles",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "5 bottles",
      newStockExp: "Aug-26",
    },
    {
      productName: "Asmalin 1mg/ml Soln for inhalation",
      initialQty: "5 bottles",
      currentQty: "5 bottles",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "5 bottles",
      newStockExp: "-",
    },
    {
      productName: "Biogesic 120mg/5ml susp",
      initialQty: "3,000 pcs",
      currentQty: "3,000 pcs",
      oldStockQty: "2 bottles",
      oldStockExp: "Jul-24",
      newStockQty: "3,000 pcs",
      newStockExp: "Jan-25",
    },
    {
      productName: "Biogesic 250mg/5ml susp",
      initialQty: "500 pcs",
      currentQty: "460 pcs",
      oldStockQty: "700 pcs",
      oldStockExp: "Oct-26",
      newStockQty: "460 pcs",
      newStockExp: "Sep-24",
    },
    {
      productName: "Biogesic 500mg tab",
      initialQty: "500 pcs",
      currentQty: "462 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "462 pcs",
      newStockExp: "Apr-27",
    },
    {
      productName: "Buscopan 10mg tab",
      initialQty: "0",
      currentQty: "0",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "0",
      newStockExp: "-",
    },
    {
      productName: "Buscopan Venus 10/500mg tab",
      initialQty: "500 pcs",
      currentQty: "500 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "500 pcs",
      newStockExp: "Dec-25",
    },
    {
      productName: "Calcisaph 500mg tab",
      initialQty: "500 pcs",
      currentQty: "479 pcs",
      oldStockQty: "77 pcs",
      oldStockExp: "Oct-24",
      newStockQty: "479 pcs",
      newStockExp: "Jan-26",
    },
    {
      productName: "Cinnarizine RM 25mg tab",
      initialQty: "0",
      currentQty: "0",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "0",
      newStockExp: "-",
    },
    {
      productName: "Cloxacillin Na RM 500mg cap",
      initialQty: "1,000 pcs",
      currentQty: "820 pcs",
      oldStockQty: "1 pc",
      oldStockExp: "Sep-25",
      newStockQty: "820 pcs",
      newStockExp: "Mar-26",
    },
    {
      productName: "Daktarin Oral Gel 20mg",
      initialQty: "500 pcs",
      currentQty: "478 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "478 pcs",
      newStockExp: "Mar-25",
    },
    {
      productName: "Decolgen ND 25/500mg cap",
      initialQty: "500 pcs",
      currentQty: "484 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "484 pcs",
      newStockExp: "Apr-28",
    },
    {
      productName: "Diatabs 2mg cap",
      initialQty: "0",
      currentQty: "0",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "0",
      newStockExp: "-",
    },
    {
      productName: "Dolfenal 500mg tab",
      initialQty: "100 pcs",
      currentQty: "99 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "99 pcs",
      newStockExp: "Dec-27",
    },
    {
      productName: "Domperidone RM 10mg tab",
      initialQty: "30 pcs",
      currentQty: "30 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "30 pcs",
      newStockExp: "Jan-26",
    },
    {
      productName: "Gastrifar 10mg tab",
      initialQty: "20 pcs",
      currentQty: "15 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "15 pcs",
      newStockExp: "Feb-26",
    },
    {
      productName: "Hivent 1mg/ml neb",
      initialQty: "0",
      currentQty: "0",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "0",
      newStockExp: "-",
    },
    {
      productName: "Kathrex 960mg tab",
      initialQty: "500 pcs",
      currentQty: "500 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "500 pcs",
      newStockExp: "Oct-25",
    },
    {
      productName: "Kremil-S 178/233/30mg tab",
      initialQty: "100 pcs",
      currentQty: "96 pcs",
      oldStockQty: "300 pcs",
      oldStockExp: "Dec-25",
      newStockQty: "96 pcs",
      newStockExp: "Mar-26",
    },
    {
      productName: "Kremil-S Advance 10/800/165mg tab",
      initialQty: "500 pcs",
      currentQty: "350 pcs",
      oldStockQty: "46 pcs",
      oldStockExp: "Jun-25",
      newStockQty: "350 pcs",
      newStockExp: "Jun-25",
    },
    {
      productName: "Medicol Advance 200mg cap",
      initialQty: "500 pcs",
      currentQty: "160 pcs",
      oldStockQty: "256 pcs",
      oldStockExp: "Aug-24",
      newStockQty: "160 pcs",
      newStockExp: "Jan-25",
    },
    {
      productName: "Mefenamic Acid RM 500mg tab",
      initialQty: "150 pcs",
      currentQty: "150 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "150 pcs",
      newStockExp: "Oct-24",
    },
    {
      productName: "Omepron 20mg cap",
      initialQty: "0",
      currentQty: "0",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "0",
      newStockExp: "-",
    },
    {
      productName: "Salinase Nasal Drops",
      initialQty: "1,000 pcs",
      currentQty: "940 pcs",
      oldStockQty: "3 bottles",
      oldStockExp: "Feb-28",
      newStockQty: "940 pcs",
      newStockExp: "May-28",
    },
    {
      productName: "Solmux 500mg cap",
      initialQty: "5 bottles",
      currentQty: "5 bottles",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "5 bottles",
      newStockExp: "Jun-25",
    },
    {
      productName: "Tempra 120mg/5ml syrup",
      initialQty: "100 pcs",
      currentQty: "100 pcs",
      oldStockQty: "1 bottle",
      oldStockExp: "Feb-25",
      newStockQty: "100 pcs",
      newStockExp: "Jun-25",
    },
    {
      productName: "Tempra 325mg tab",
      initialQty: "5 bottles",
      currentQty: "5 bottles",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "5 bottles",
      newStockExp: "Oct-26",
    },
    {
      productName: "Tempra Forte 250mg/5ml syrup",
      initialQty: "500 pcs",
      currentQty: "259 pcs",
      oldStockQty: "2 bottles",
      oldStockExp: "Feb-25",
      newStockQty: "259 pcs",
      newStockExp: "Jun-25",
    },
    {
      productName: "Tuseran Forte 15/25/325mg cap",
      initialQty: "500 pcs",
      currentQty: "400 pcs",
      oldStockQty: "0",
      oldStockExp: "-",
      newStockQty: "400 pcs",
      newStockExp: "Jan-25",
    },
    {
      productName: "Ventomax 2mg tab",
      initialQty: "500 pcs",
      currentQty: "400 pcs",
      oldStockQty: "2 bottles",
      oldStockExp: "Feb-25",
      newStockQty: "400 pcs",
      newStockExp: "Feb-26",
    },
  ];

  const handleRemoveClick = (item) => {
    setSelectedProduct(item);
    setRemoveModalVisible(true);
  };

  const handleRemoveStock = () => {
    // Implement the logic to remove stock
    console.log(
      `Removed ${quantityInput[selectedProduct.id] || 0} of ${
        selectedProduct.productName
      }`
    );
    setRemoveModalVisible(false);
  };

  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  return (
    <div className="admin-inventory">
      <div className="back-to-admin">
        <ArrowBackRoundedIcon style={{ color: "white", marginTop: "0.3vh" }} />
        <Link to="/admin" className="back-to-admin-btn-link">
          <h3 className="back-to-admin-btn">Back to Admin</h3>
        </Link>
      </div>
      <h2>Stock Management</h2>
      <div className="inventory-table">
        {/* Inventory Management Section */}
        <div className="inventory-management">
          {/* Stock Search Input */}
          <div className="stock-search">
            <Link
              to="/edit-stock"
              state={{ inventoryData }} // Pass the inventory data as state
            >
              <button className="edit-stock-btn">Edit Stocks</button>
            </Link>

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
                <th>Product Name</th>
                <th>Initial Qty.</th>
                <th>Current Qty. in Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr
                  key={index}
                  className={hoveredRowIndex === index ? "row-hover" : ""}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td>{item.productName}</td>
                  <td>{item.initialQty}</td>
                  <td>
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-html={`<b>Old Stock:</b> ${item.oldStockQty} (Exp: ${item.oldStockExp})<br/><b>New Stock:</b> ${item.newStockQty} (Exp: ${item.newStockExp})`}
                      className="tooltip-trigger"
                    >
                      {item.currentQty}
                    </span>
                    <ReactTooltip id="my-tooltip" />
                  </td>
                  <td
                    style={{
                      color: item.currentQty === "0" ? "red" : "green",
                    }}
                  >
                    {item.currentQty === "0" ? "Out of Stock" : "In Stock"}
                  </td>
                  <td>
                    <RemoveCircleRoundedIcon
                      onClick={() => handleRemoveClick(item)}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "1vw",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remove Modal Component */}
      <Modal
        isOpen={removeModalVisible}
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
            width: "35vw",
            height: "22vh",
            margin: "auto",
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
                value={quantityInput[selectedProduct?.id] || ""}
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
            <button className="remove-stock-btn" onClick={handleRemoveStock}>
              Remove
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Manage;
