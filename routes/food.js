/*
 Created by Yiran Li on 2016/12/01
 */
"use strict";
const express = require("express");
const router = express.Router();
const data = require("../data");
const foodData = data.food;

router.get("/", (req, res) => {
    foodData.getAllFood().then((foodList) => {
        res.json("foodList");
    }).catch((e) => {
        res.status(500).json({error: e});
    });
});

router.get("/foodId/:id", (req, res) => {
    foodData.getFoodById(req.params.id).then((food) => {
        res.json(food);
    }).catch(() => {
        res.status(404).json({error: "Food not found!"});
    });
});

router.get("/foodName/:name", (req, res) => {
    foodData.getFoodByName(req.params.name).then((food) => {
        res.json(food);
    }).catch(() => {
        res.status(404).json({error: "Food not found!"});
    });
});

router.post("/", (req, res) => {
    let foodPostData = req.body;
    foodData.addFood(foodPostData.name, foodPostData.description, foodPostData.location, foodPostData.address, foodPostData.price, foodPostData.closingTime, foodPostData.phone, foodPostData.website, foodPostData.mainImage, foodPostData.type, foodPostData.cityId).then((newFood) => {
        res.json(newFood);
    }).catch((e) => {
        res.status(500).json({error: e});
    });
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;
    let getFood = foodData.getFoodById(req.params.id);

    getFood.then(() => {
        return foodData.updateFood(req.params.id, updatedData).then((updatedFood) => {
            res.json(updatedFood);
        }).catch((e) => {
            res.status(500).json({error: e});
        });
    }).catch(() => {
        res.status(404).json({error: "Food not found!"});
    });
});

router.delete("/:id", (req, res) => {
    let getFood = foodData.getFoodById(req.params.id);

    getFood.then(() => {
        return foodData.removeFood(req.params.id).then(() => {
            res.sendStatus(200);
        }).catch((e) => {
            res.status(500).json({error: e});
        });
    }).catch(() => {
        res.status(404).json({error: "Food not found!"});
    });
});

module.exports = router;
