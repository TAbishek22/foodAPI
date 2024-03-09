import express from "express";
import cors from "cors";
import foodAPI from "./models/food.js";
const app = express();

const port = 3200;
import "./db/conn.js";
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>WELCOME TO API CREATION </h1>");
});
app.get("/getfooddata", async (req, res) => {
    try {
        const getfood = await foodAPI.find({});
        // console.log(getfood);
        res.status(201).send(getfood);
    } catch (e) {
        // console.log(e);
    }
});
app.get("/getfooddata/:foodID", async (req, res) => {
    try {
        const foodID = req.params.foodID;
        const getfood2 = await foodAPI.findOne({ country_of_origin: foodID });
        // console.log(getfood);

        if (!getfood2) {
            return res
                .status(400)
                .json({ error: "Food by country not found " });
        }
        res.status(201).send(getfood2);
    } catch (e) {
        // console.log(e);
    }
});
app.post("/foodData", async (req, res) => {
    try {
        const added = await foodAPI.create(req.body);
        res.status(201).json(added);
    } catch (e) {
        console.log(e);
    }
});

app.put("/edit/:id", async (req, res) => {
    try {
        // console.log(JSON.parse(req.body));
        const food = await foodAPI.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!food) throw Error("Food item not found");
        res.json({ food });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.delete("/foodDelete/:foodID", async (req, res) => {
    try {
        const _id = req.params.foodID;
        console.log("Deleted id: " + _id);
        const deletedata = await foodAPI.findByIdAndDelete(_id);
        if (!deletedata) {
            return res
                .status(400)
                .json({ error: "Food by country not found " });
        }
        res.status(200).json(deletedata);
    } catch (e) {
        console.log(e);
    }
});

app.listen(port, () => {
    console.log(`server is listening at port number ${port}`);
});
