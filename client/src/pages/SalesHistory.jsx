import React, { useState } from 'react'
import Alerter from "sweetalert2"

const defaultValue = { salesHistory: "" }

const SalesHistory = () => {

  const [salesByDate, setSalesByDate] = useState(defaultValue);

  const [sales, setSales] = useState([]);
  const { salesHistory } = salesByDate;

  const handleSalesHistory = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3200/salesByDate/${salesHistory}`, {
      method: "GET",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(Alerter.fire({
            title: '!',
            text: 'No Sales Found On this Date Related To you',
            confirmButtonText: 'Cool'
          }));
        }
        return response.json();
      })
      .then(data => setSales(data.sales))
      .catch((error) => {
        if (error)
          console.log("No Match Found")
      });
    console.log(sales)

  }
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);



  return (
    <>
      <div>
        <h2 className='text-center'>Sales History</h2>
        <div className='d-flex justify-content-center'>
          <input type="date" name="salesByDate" id="salesByDate"
            value={salesByDate.salesHistory} onChange={(e) => setSalesByDate({ salesHistory: e.target.value })} />
          <button type="button" className='mx-1' onClick={handleSalesHistory}>Sales Log</button>
        </div>
        <div>
          <div className='container border mt-2' style={{ fontFamily: "'Ubuntu', sans-serif" }}>
            <table className="table mt-1 ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Sales ID:</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Sales Amount</th>
                </tr>
              </thead>
              <tbody>
                {sales?.map((sales, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input type="text" style={{
                        width: "50%",
                        backgroundColor: "transparent", border: "none"
                      }} value={sales._id} readOnly />
                    </td>
                    <td>{sales.productName}</td>
                    <td>{sales.quantity}</td>
                    <td>{sales.amount}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h4 className='text-center mt-1'>Revenue Genereted on this date</h4>
          <div className='d-flex justify-content-center'>
            <input type="number" value={totalRevenue} readOnly className='fw-bolder text-center fs-4' />
          </div>
        </div>
      </div>
    </>
  )
}

export default SalesHistory