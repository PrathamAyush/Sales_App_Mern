const express = require("express")
const router = express.Router();
const mongo = require("mongoose");
const sales = mongo.model("sales");
const authMiddleware = require("../middleware/authMiddleware")

//Adding the Sales
router.post("/", authMiddleware, (req, res) => {

    const { productName, quantity, amount } = req.body;

    if (!productName || !quantity || !amount) {

        return res.status(400).json({ err: "Fill all the mandatory Fields" });

    }
    req.user.password = undefined;
    const addSales = new sales({ productName: productName, quantity: quantity, amount: amount, author: req.user });
    addSales.save()
        .then((newSales) => {
            res.status(201).json({ sales: newSales })
        }).catch((err) => {
            res.status(401).json({ err: "something want wrong" })
            console.log(err)
        })

});

//gathering top 5 sales from DB 
router.get("/topSales", authMiddleware, (req, res) => {
    const currentDate = new Date(); // Get the current date

    const startDate = new Date(currentDate.setHours(0, 0, 0, 0)); // Set the start time of the current date
    const endDate = new Date(currentDate.setHours(23, 59, 59, 999)); // Set the end time of the current date

    sales.find({
        author: req.user._id,
        createdAt: { $gte: startDate, $lte: endDate } // Retrieve sales within the current date range
    })
        .populate("author", "_id productName quantity amount")
        .sort({ amount: -1 })
        .limit(5)
        .then((topSales) => {
            res.status(200).json({ sales: topSales });
            console.log({ sales: topSales });
        })
        .catch((err) => {
            res.status(401).json({ err: "Something went wrong" });
            console.log(err);
        });
});


//gathering sales from DB by date wise
router.get("/salesByDate/:createdAt", authMiddleware, (req, res) => {

    const startDate = new Date(req.params.createdAt); // Convert the createdAt parameter to a Date object

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); // Set the end date to the next day

    sales.find({ author: req.user._id, createdAt: { $gte: startDate, $lt: endDate } }) // Retrieve sales within the specified date range 
        .populate("author", "_id productName quantity amount")
        .then((sales) => {
            if (sales.length > 0) { // Check if any matching sales are found
                res.status(200).json({ sales: sales });
                console.log({ sales: sales });
            } else {
                res.status(404).json({ message: "Sales not found" }); // Handle the case when no matching sales are found
                console.log("sales not found");
            }
        }).catch((err) => {
            res.status(500).json({ error: "Something went wrong" });
            console.log(err);
        });
});


//Gathering sales amount and revenue of the day
// router.get("/revenue", (req, res) => {
//     sales.find()
//         .sort({ amount: -1 })
//         .limit(5)
//         .then((error, sales) => {
//             if (error) console.log(error);

//             res.status(200).json({ sales });
//         });
// })
module.exports = router;