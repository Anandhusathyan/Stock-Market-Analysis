import stock, {selectDefaultRange} from "./graph.js";
import {stockDetails} from './summary.js';

let stock_list = document.querySelector("#list-section ul");
let fragment = document.createDocumentFragment();
export let clicked_stock ="AAPL";

export async function stopList(){
    let responce = await fetch("https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata");
    let data = await responce.json();
    // console.log(data.stocksStatsData[0])
    let list = data.stocksStatsData[0];
    for(let key in list){
        // console.log(key);
        // console.log(key);

        if( key == "_id"){
            continue;
        }
        const list1 = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = key;
        btn.classList.toggle("active", key === clicked_stock);
        btn.addEventListener("click",(e)=>{
            // console.log(e.target.textContent);
            let prev_stock = clicked_stock;
            clicked_stock = e.currentTarget.textContent;

            document.querySelectorAll("#list-section ul li button").forEach((stockButton) => {
                stockButton.classList.toggle("active", stockButton === e.currentTarget);
            });
            
            if(clicked_stock != prev_stock){
                console.log("prev_stock",prev_stock);
                console.log("clicked_stock",clicked_stock);
                selectDefaultRange();
                stock();
                stockDetails();
            }

        })
        const span = document.createElement("span");
        span.textContent = `${list[key].bookValue}`
        const span1 = document.createElement("span");
        let num = list[key].profit;
        if(num.toFixed(2) == 0.00){
            span1.style.color = "#f11d1d";
            
        }else{
            span1.style.color = "#00ff00";
        }
        span1.textContent = `${num.toFixed(2)}%`;
        list1.append(btn,span,span1);
        fragment.append(list1);
    }
    stock_list.append(fragment);
}

