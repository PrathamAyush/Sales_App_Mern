import React, { useEffect, useState } from 'react'
import Alerter from "sweetalert2"

export const TopSales = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3200/topSales",{
            method:"GET",
            headers:{"Authorization":"Bearer " + localStorage.getItem("token")}
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(Alerter.fire({
                        title: 'Error!',
                        text: 'Failed To Fetch Or Login First',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      }));
                }
                return response.json();
            })
            .then(data => setSales(data.sales))
            .catch(error => console.error(error));

    }, []);

    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "3vh", fontFamily: "'Ubuntu', sans-serif" }}>TOP 5 SALES</h2>
            <div className='container border mt-2' style={{ fontFamily: "'Ubuntu', sans-serif" }}>
                <table className="table mt-1">
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
                        {sales && sales.map((sales,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{sales._id}</td>
                                <td>{sales.productName}</td>
                                <td>{sales.quantity}</td>
                                <td>{sales.amount}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

