const Product = require("../models/product");
const mongoose = require("mongoose");
const { query } = require("express");

const getAllProducts = async(req, res)=>{
const {company, name, featured, sort, select} = req.query;
const queryObject = {};

if(company){
    queryObject.company = company;
}
if(featured){
    queryObject.featured = featured;
}
if(name){
    queryObject.name = { $regex: name, $options: "i"};
}

let apiData = Product.find(queryObject);
// console.log(apiData);

if(sort){
    let sortfix = sort.split(",").join(" ");
    // queryObject.sort =sortfix; 
    apiData = apiData.sort(sortfix);
}
if(select){
    let selectfix = select.split(",").join(" ");
    // queryObject.select =selectfix; 
    apiData = apiData.select(selectfix);
}

let page = Number(req.query.page) || 1;
let limit = Number(req.query.page) || 3;

let skip  = (page -1) * limit;
apiData = apiData.skip(skip).limit(limit);

const mydata = await apiData;

res.status(200).json({mydata, nbHits: mydata.length});
};
const getAllProductsTesting = async(req, res)=>{
    const mydata = await Product.find(req.query).sort().select();
res.status(200).json({mydata});
};

module.exports = {getAllProducts, getAllProductsTesting};