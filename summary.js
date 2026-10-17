import {clicked_stock} from './stocklist.js'



let det = document.querySelector("#about-stock details");
let summ = document.createElement("summary");

export async function stockDetails(){
    let resp = await fetch("https://stock-market-api-k9vl.onrender.com/api/profiledata");
    let data = await resp.json();
    console.log(data.stocksProfileData[0]);
    let stock_summary = data.stocksProfileData[0];
    console.log(stock_summary[clicked_stock].summary);
    summ.textContent = stock_summary[clicked_stock].summary;
    det.append(summ);
}