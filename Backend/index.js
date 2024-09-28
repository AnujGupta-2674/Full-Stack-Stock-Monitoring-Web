const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const port = 3002;

//Cloud DataBase Connection
main().then(() => console.log("Connected to MongoDb")).catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

app.use(cors());
app.use(bodyParser.json());

//All Routes
// app.get("/init/posi", async (req, res) => {
//     const positionData = [{
//         product: "CNC",
//         name: "EVEREADY",
//         qty: 2,
//         avg: 316.27,
//         price: 312.35,
//         net: "+0.58%",
//         day: "-1.24%",
//         isLoss: true,
//     },
//     {
//         product: "CNC",
//         name: "JUBLFOOD",
//         qty: 1,
//         avg: 3124.75,
//         price: 3082.65,
//         net: "+10.04%",
//         day: "-1.35%",
//         isLoss: true,
//     },];

//     positionData.forEach((position) => {
//         let newPosi = new PositionsModel({
//             product: position.product,
//             name: position.name,
//             qty: position.qty,
//             avg: position.avg,
//             price: position.price,
//             net: position.net,
//             day: position.day,
//             isLoss: position.isLoss,
//         });

//         newPosi.save().then(() => {
//             console.log("Saved Posi");
//         }).catch((err) => {
//             console.log(err);
//         })
//     })

//     res.send("Posi Data Saved");
// })

app.get("/allHoldings", async (req, res) => {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
    const newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    });
    await newOrder.save();
    res.send("Order saved");
});


//Listening
app.listen(port, () => {
    console.log(`App is listening on port:${port}`);
});