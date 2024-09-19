import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const EditStockPage = () => {
  const location = useLocation();
  const { inventoryData = [] } = location.state || {}; // Provide default value to avoid destructuring errors

  const [stocks, setStocks] = useState(inventoryData);

  const handleQuantityChange = (index, value) => {
    const updatedStocks = [...stocks];
    updatedStocks[index].newStockQty = value;
    setStocks(updatedStocks);
  };

  const handleExpirationChange = (index, value) => {
    const updatedStocks = [...stocks];
    updatedStocks[index].newStockExp = value;
    setStocks(updatedStocks);
  };

  const handleSave = () => {
    console.log("Updated Stocks:", stocks);
    // Here you can implement logic to save the updated stocks, e.g., make an API call
  };

  return (
    <div className="edit-stock">
      <div className="back-to-admin">
        <ArrowBackRoundedIcon style={{ color: "white", marginTop: "0.3vh" }} />
        <Link to="/manage" className="back-to-admin-btn-link">
          <h3 className="back-to-admin-btn">Back to Stocks</h3>
        </Link>
      </div>
      <h2>Edit Stocks</h2>

      <div className="edit-stock-table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Current Quantity</th>
              <th>Quantity</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.currentQty}</td>
                <td>
                  <input
                    type="number"
                    value={item.newStockQty}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={item.newStockExp}
                    onChange={(e) =>
                      handleExpirationChange(index, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="save-stock">
        <button className="save-edit-stock-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditStockPage;
