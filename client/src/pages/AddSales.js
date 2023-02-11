import React, { useState } from "react";

const defaultSalesField = { productName: "", quantity: "", amount: "" };

export const AddSales = () => {
    const [salesData, setSalesData] = useState(defaultSalesField);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { productName, quantity, amount } = salesData
        try {
            fetch('http://localhost:3200/', {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ productName, quantity, amount })

            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("User Not Register")
                    } else {
                        return response.json();
                    }

                }).then((found) => {

                    console.log(found)
                    alert("Sales Added")

                }).catch((err) => {
                    if (err.message === "User Not Register") {
                        alert("User Not registered!")
                    } else {
                        alert("Server not responding=>X<=Connection not Esteblised !")
                    }

                    setSalesData(defaultSalesField);
                })

        } catch (error) {
            console.log(error)
        }

    };
    return (
        <>
            <h2 className='fw-bolder text-center' style={{ marginTop: "3vh", fontFamily: "'Ubuntu', sans-serif" }}>ADD SALES ENTRY</h2>
            <div className='container border mt-2'>
                <form className='d-flex flex-column justify-content-start' onSubmit={handleSubmit}>

                    <label htmlFor="productName" className='mt-3 text-muted'>Product Name</label>
                    <input type="text" name='productName' className='mt-2' placeholder='Enter Product Name' required
                        value={salesData.productName}
                        onChange={(e) => setSalesData({ ...salesData, productName: e.target.value, })} />

                    <label htmlFor="quantity" className='mt-3 text-muted'>Quantity</label>
                    <input type="text" name='quantity' className='mt-2' placeholder='Enter Quantity' required
                        value={salesData.quantity}
                        onChange={(e) => setSalesData({ ...salesData, quantity: e.target.value, })} />

                    <label htmlFor="amount" className='mt-3 text-muted'>Amount</label>
                    <input type="text" name='amount' className='mt-2' placeholder='Enter Amount' required
                        value={salesData.amount}
                        onChange={(e) => setSalesData({ ...salesData, amount: e.target.value, })} />

                    <input type="submit" value="Submit" className='btn btn-primary mt-3 mb-3' />
                </form>
            </div>
        </>
    )
}
