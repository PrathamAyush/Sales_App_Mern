const mongo = require("mongoose");
const { ObjectId } = mongo.Schema.Types;
const { Schema } = mongo;
const addSales = new Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "userModel"
    }
}, { timestamps: true });
mongo.model("sales", addSales);