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
  const [activeTab, setActiveTab] = useState("medicine");
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

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

  const suppliesData = [
    {
      productName: "3M KN95",
      oldStockQty: "0",
      oldStockExp: "Oct-27",
      newStockQty: "36 pcs",
    },
    {
      productName: "3M Micropore",
      oldStockQty: "3 boxes",
      oldStockExp: "Nov-28",
      newStockQty: "10 bottles",
    },
    {
      productName: "Aceite de Manzanilla",
      oldStockQty: "10 bottles",
      oldStockExp: "N/A",
      newStockQty: "4 pcs",
    },
    {
      productName: "Advan Ice Bag",
      oldStockQty: "5 pcs",
      oldStockExp: "N/A",
      newStockQty: "98 pcs",
    },
    {
      productName: "Arm Sling (L)",
      oldStockQty: "100 pcs",
      oldStockExp: "N/A",
      newStockQty: "95 pcs",
    },
    {
      productName: "Arm Sling (M)",
      oldStockQty: "100 pcs",
      oldStockExp: "N/A",
      newStockQty: "97 pcs",
    },
    {
      productName: "Arm Sling (S)",
      oldStockQty: "100 pcs",
      oldStockExp: "Aug-25",
      newStockQty: "2,231 pcs",
    },
    {
      productName: "Band-Aid",
      oldStockQty: "2,500 pcs",
      oldStockExp: "N/A",
      newStockQty: "N/A",
    },
    {
      productName: "Betadine Gargle 1% Oral Soln",
      oldStockQty: "0",
      oldStockExp: "May-28",
      newStockQty: "4 packs",
    },
    {
      productName: "Betadine Skin Cleanser 7.5% Soln",
      oldStockQty: "0",
      oldStockExp: "May-28",
      newStockQty: "4 boxes",
    },
    {
      productName: "Blue Vinyl/Nitrile Blend Gloves Powder Free (S)",
      oldStockQty: "0",
      oldStockExp: "May-28",
      newStockQty: "5 boxes",
    },
    {
      productName: "Caladryl 8g/1g per 100ml Lotion",
      oldStockQty: "0",
      oldStockExp: "Nov-28",
      newStockQty: "8 boxes",
    },
    {
      productName: "Cleene Cotton Rounds (Freebie)",
      oldStockQty: "4 packs",
      oldStockExp: "May-26",
      newStockQty: "15 bottles",
    },
    {
      productName: "Disposable Nitrile Gloves (L)",
      oldStockQty: "5 boxes",
      oldStockExp: "N/A",
      newStockQty: "11 pcs",
    },
    {
      productName: "Disposable Nitrile Gloves (M)",
      oldStockQty: "15 boxes",
      oldStockExp: "Aug-28",
      newStockQty: "37 packs",
    },
    {
      productName: "Disposable Nitrile Gloves (S)",
      oldStockQty: "10 boxes",
      oldStockExp: "N/A",
      newStockQty: "N/A",
    },
    {
      productName: "Efficascent Oil 100ml",
      oldStockQty: "20 bottles",
      oldStockExp: "Aug-26",
      newStockQty: "36 boxes",
    },
    {
      productName: "Efficascent Oil Roll-On 3ml",
      oldStockQty: "20 pcs",
      oldStockExp: "Feb-28",
      newStockQty: "5 bottles",
    },
    {
      productName: "Gauze Bandage",
      oldStockQty: "0",
      oldStockExp: "Mar-28",
      newStockQty: "168 pcs",
    },
    {
      productName: "Happy Cotton Buds",
      oldStockQty: "50 packs",
      oldStockExp: "Mar-28",
      newStockQty: "179 pcs",
    },
    {
      productName: "Hydrogen Peroxide 1L",
      oldStockQty: "0",
      oldStockExp: "Sep-27",
      newStockQty: "192 pcs",
    },
    {
      productName: "Indoplas Face Mask",
      oldStockQty: "0",
      oldStockExp: "Mar-28",
      newStockQty: "100 pcs",
    },
    {
      productName: "Maxwell Latex Examination Gloves (L)",
      oldStockQty: "50 boxes",
      oldStockExp: "Feb-28",
      newStockQty: "50 pcs",
    },
    {
      productName: "Mupirocin 20mg/g Ointment",
      oldStockQty: "0",
      oldStockExp: "Feb-28",
      newStockQty: "13 packs",
    },
    {
      productName: "Omega Advance Spray",
      oldStockQty: "20 bottles",
      oldStockExp: "Mar-25",
      newStockQty: "48 pcs",
    },
    {
      productName: "Partners Elastic Bandage 2x5",
      oldStockQty: "200 pcs",
      oldStockExp: "Apr-28",
      newStockQty: "36 bottles",
    },
    {
      productName: "Partners Elastic Bandage 3x5",
      oldStockQty: "200 pcs",
      oldStockExp: "Sep-28",
      newStockQty: "8 pcs",
    },
    {
      productName: "Partners Elastic Bandage 4x5",
      oldStockQty: "200 pcs",
      oldStockExp: "Apr-28",
      newStockQty: "8 pcs",
    },
    {
      productName: "Partners Gauze Pad 4x4",
      oldStockQty: "0",
      oldStockExp: "Apr-28",
      newStockQty: "37 pcs",
    },
    {
      productName: "Partners Nebulizer Kit (Adult)",
      oldStockQty: "0",
      oldStockExp: "Dec-27",
      newStockQty: "47 pcs",
    },
    {
      productName: "Partners Non-Woven Swab 4x4",
      oldStockQty: "25 packs",
      oldStockExp: "Jul-25",
      newStockQty: "9 pcs",
    },
    {
      productName: "Partners Surgical Tape",
      oldStockQty: "4 boxes",
      oldStockExp: "Oct-27",
      newStockQty: "8 pcs",
    },
    {
      productName: "Povidone Iodine 10% Soln 120ml",
      oldStockQty: "36 bottles",
      oldStockExp: "Mar-28",
      newStockQty: "3 pcs",
    },
    {
      productName: "Sure-Guard Disposable Syringe 1cc",
      oldStockQty: "0",
      oldStockExp: "Nov-25",
      newStockQty: "8 boxes",
    },
    {
      productName: "Sure-Guard Disposable Syringe 3cc",
      oldStockQty: "0",
      oldStockExp: "Feb-26",
      newStockQty: "4 pcs",
    },
    {
      productName: "Sure-Guard Nasal Cannula (Adult)",
      oldStockQty: "0",
      oldStockExp: "Dec-24",
      newStockQty: "2 boxes",
    },
    {
      productName: "Sure-Guard Nasal Cannula (Pedia)",
      oldStockQty: "0",
      oldStockExp: "N/A",
      newStockQty: "57 pcs",
    },
    {
      productName: "Sure-Guard Nebulizer Mask (Adult)",
      oldStockQty: "0",
      oldStockExp: "N/A",
      newStockQty: "32 packs",
    },
    {
      productName: "Sure-Guard Nebulizer Mask (Pedia)",
      oldStockQty: "0",
      oldStockExp: "N/A",
      newStockQty: "3 bottles",
    },
    {
      productName: "Sure-Guard Oxygen Mask (Adult)",
      oldStockQty: "3 pcs",
      oldStockExp: "N/A",
      newStockQty: "N/A",
    },
    {
      productName: "Sure-Guard Oxygen Mask (Pedia)",
      oldStockQty: "0",
      oldStockExp: "N/A",
      newStockQty: "10 boxes",
    },
    {
      productName: "Tender Soft Cotton Balls",
      oldStockQty: "10 boxes",
      oldStockExp: "N/A",
      newStockQty: "2 boxes",
    },
    {
      productName: "Topcare Elastic Bandage 2x5",
      oldStockQty: "0",
      oldStockExp: "N/A",
      newStockQty: "57 pcs",
    },
    {
      productName: "Topcare Elastic Bandage 4x5",
      oldStockQty: "2 boxes",
      oldStockExp: "N/A",
      newStockQty: "32 packs",
    },
    {
      productName: "Trucare Gauze Pad 4x4",
      oldStockQty: "61 pcs",
      oldStockExp: "N/A",
      newStockQty: "3 bottles",
    },
    {
      productName: "Uratex Egg Mattress",
      oldStockQty: "50 packs",
      oldStockExp: "N/A",
      newStockQty: "N/A",
    },
    {
      productName: "Wondfo 2019-nCoV Antigen Test",
      oldStockQty: "3 bottles",
      oldStockExp: "N/A",
      newStockQty: "N/A",
    },
    {
      productName: "Yatho Wound Dressing 9x15",
      oldStockQty: "0",
      oldStockExp: "N/A",
      newStockQty: "N/A",
    },
    {
      productName: "Yoshi Baby Wipes",
      oldStockQty: "0",
      oldStockExp: "N/A",
      newStockQty: "N/A",
    },
    {
      productName: "Zetadone 1L",
      oldStockQty: "0",
      oldStockExp: "N/A",
      newStockQty: "N/A",
    },
  ];

  const equipmentData = [
    {
      productName: "DeVilbiss Pulmoneb",
      initialQty: "5 units",
      currentQty: "5 units",
    },
    {
      productName: "Hot Compress",
      initialQty: "10 units",
      currentQty: "8 units",
    },
    {
      productName: "Japan Technology Oxygen Regulator",
      initialQty: "3 units",
      currentQty: "3 units",
    },
    {
      productName: "Littmann Classic III Stethoscope 3M",
      initialQty: "5 units",
      currentQty: "5 units",
    },
    {
      productName: "Olten Dressing Forceps",
      initialQty: "10 units",
      currentQty: "10 units",
    },
    {
      productName: "Olten Kelly Haemostatic Forceps Curve",
      initialQty: "5 units",
      currentQty: "5 units",
    },
    {
      productName: "Olten Kelly Haemostatic Forceps Straight",
      initialQty: "5 units",
      currentQty: "5 units",
    },
    {
      productName: "Olten Lister Bandage Scissors",
      initialQty: "8 units",
      currentQty: "8 units",
    },
    {
      productName: "Olten Operating Scissors Straight",
      initialQty: "8 units",
      currentQty: "7 units",
    },
    {
      productName: "Oxi-Guard Oxygen Regulator",
      initialQty: "3 units",
      currentQty: "3 units",
    },
    {
      productName: "Partners Pulse Oximeter",
      initialQty: "5 units",
      currentQty: "5 units",
    },
    {
      productName: "Sinocare Ga-3",
      initialQty: "2 units",
      currentQty: "2 units",
    },
    {
      productName: "Sure-Guard Digital Thermometer",
      initialQty: "10 units",
      currentQty: "9 units",
    },
    {
      productName: "Wilcare Pulse Oximeter",
      initialQty: "5 units",
      currentQty: "5 units",
    },
  ];

  const handleRemoveClick = (item) => {
    setSelectedProduct(item);
    setRemoveModalVisible(true);
  };

  const handleRemoveStock = () => {
    setRemoveModalVisible(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const [isOpen, setIsOpen] = useState(false);

  // Function to open the modal
  const openAddStockModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const onClose = () => {
    setIsOpen(false);
  };

  const renderTable = (data) => (
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
        {data.map((item, index) => (
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
                data-tooltip-html={`<b>Current Stock:</b> ${item.currentQty}`}
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
  );

  return (
    <div className="admin-inventory">
      <div className="back-to-admin">
        <ArrowBackRoundedIcon style={{ color: "white", marginTop: "0.3vh" }} />
        <Link to="/admin" className="back-to-admin-btn-link">
          <h3 className="back-to-admin-btn">Back to Admin</h3>
        </Link>
      </div>
      <h2>Stock Management</h2>
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
      <div className="inventory-table">
        <div className="inventory-management">
          <div className="stock-search">
            <button className="add-stock-btn" onClick={openAddStockModal}>
              Add Stocks
            </button>
            <Modal
              isOpen={isOpen}
              onRequestClose={onClose}
              className="add-stock-modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 2,
                },
                content: {
                  width: "fit-content",
                  minWidth: "40vw",
                  height: "fit-content",
                  margin: "auto",
                  borderRadius: "12px",
                  backgroundColor: "#f8f8ff",
                  padding: "25px",
                  border: "none",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <div className="add-stock-modal-content">
                <h4>Add New Stock</h4>
                <form>
                  <div>
                    <label>
                      Product Name:
                      <input type="text" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Category:
                      <select required>
                        <option value="medicine">Medicine</option>
                        <option value="supplies">Supplies</option>
                        <option value="equipment">Equipment</option>
                      </select>
                    </label>
                  </div>
                  <div className="add-stock-buttons">
                    <button className="stock-close-btn" onClick={onClose}>
                      Close
                    </button>
                    <button
                      type="button"
                      className="stock-submit-btn"
                      onClick={onClose}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
            <Link
              to="/edit-stock"
              state={{ inventoryData, suppliesData, equipmentData }}
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
          {activeTab === "medicine" && renderTable(inventoryData)}
          {activeTab === "supplies" && renderTable(suppliesData)}
          {activeTab === "equipment" && renderTable(equipmentData)}
        </div>
      </div>

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
