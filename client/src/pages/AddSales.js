import React, { useState } from "react";
import Alerter from "sweetalert2"


const defaultSalesField = { productName: "", quantity: "", amount: "" };

export const AddSales = () => {
    const [salesData, setSalesData] = useState(defaultSalesField);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { productName, quantity, amount } = salesData
        try {
            await fetch("http://localhost:3200/", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ productName, quantity, amount })

            })
                .then((response) => {
                    if (response.ok) {

                        return response.json();
                    } else {

                        throw new Error("User Not Register")
                    }
                })
                .then((found) => {
                    console.log(found)
                    Alerter.fire({
                        title: 'Success!',
                        text: 'Sales Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Add More!'
                    })
                }).catch((err) => {
                    if (err) {
                        Alerter.fire({
                            title: 'error!',
                            text: 'User Not Register.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Alerter.fire({
                            title: 'error!',
                            text: 'Server Not Responding/Connection Error.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                })
            setSalesData(defaultSalesField);
        } catch (error) {
            console.log(error)
        }

    };
    return (
        <>
            <h2 className='fw-bolder text-center' style={{ marginTop: "3vh", fontFamily: "'Ubuntu', sans-serif" }}>ADD SALES ENTRY</h2>
            <div className='container border mt-2'>
                <form method="POST" className='d-flex flex-column justify-content-start' onSubmit={handleSubmit}>

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
