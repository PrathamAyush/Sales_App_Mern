const express = require("express")
const router = express.Router();
const mongo = require("mongoose");
const sales = mongo.model("sales");

router.post("/", (req, res) => {

    const { productName, quantity, amount } = req.body;

    if (!productName || !quantity || !amount) {

        return res.status(400).json({ err: "Fill all the mandatory Fields" });

    } else {
    
        const addSales = new sales({ productName, quantity, amount });
        addSales.save()
            .then((newSales) => {
                res.status(201).json({ sales: newSales })
            }).catch((err) => {
                res.status(401).json({ err: "something want wrong" })
            })
    }
});

router.get("/topSales", (req, res) => {
    sales.find()
        .populate("_id productName quantity amount")
        .then((topsales) => {
            res.status(200).json({ sales: topsales })
        }).catch((err) => {
            res.status(401).json({ err: "Somthing goes wrong" })
        })
});
module.exports = router;