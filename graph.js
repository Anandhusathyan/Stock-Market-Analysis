import {stopList, clicked_stock} from './stocklist.js';
import {stockDetails} from './summary.js';
// console.log(clicked_stock);

let Peak_value = document.getElementById("peak_value");
let Low_value = document.getElementById("low_value");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");

const rangeButtons = [btn1, btn2, btn3, btn4];

function setActiveRange(activeButton) {
  rangeButtons.forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

// A company change loads the default five-year chart.
export function selectDefaultRange() {
  setActiveRange(btn4);
}

btn1.addEventListener("click",()=>{
  setActiveRange(btn1);
  stock("1mo");
})

btn2.addEventListener("click",()=>{
  setActiveRange(btn2);
  stock("3mo");
})

btn3.addEventListener("click",()=>{
  setActiveRange(btn3);
  stock("1y");
})

btn4.addEventListener("click",(e)=>{
  setActiveRange(btn4);
  stock();
})

async function stock(year = "5y") {
    try{
        const responce = await fetch("https://stock-market-api-k9vl.onrender.com/api/stocksdata",);
        const data = await responce.json();

        if(data){
            let stock_products =  data.stocksData[0];
            graph(stock_products[clicked_stock][year], clicked_stock);
        }

        
    }
    catch(error){
        console.log(error.message);
    }  
}


// function graph(data) {
//   const canvas = document.getElementById("graph");

//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "#07064f";

//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   const prices = data.value;

//   const maxPrice = Math.max(...prices);

//   const minPrice = Math.min(...prices);

//   Peak_value.textContent = `Peak value: ${maxPrice.toFixed(2)}`;
//   // console.log(maxPrice);

//   Low_value.textContent = `Low value: ${minPrice.toFixed(2)}`;
//   // console.log(minPrice);

//   const padding = 20;

//   const stepX = (canvas.width - padding * 2) / (prices.length - 1);

//   ctx.beginPath();

//   prices.forEach((price, index) => {
//     const x = padding + index * stepX;

//     const y =
//       canvas.height -
//       padding -
//       ((price - minPrice) / (maxPrice - minPrice)) * // 193.97  129.55
//         (canvas.height - padding * 2);

//     if (index === 0) {
//       ctx.moveTo(x, y);
//     } else {
//       ctx.lineTo(x, y);
//     }
//   });

//   ctx.strokeStyle = "#00ff00";

//   ctx.lineWidth = 1;

//   ctx.stroke();
// }

function graph(data, stockname = "AAPL") {
  const canvas = document.getElementById("graph");
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  const ctx = canvas.getContext("2d");

  const prices = data.value;
  const timestamps = data.timeStamp;

  const padding = 20;

  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  const points = [];

  function drawChart(hoverPoint = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#07064f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    points.length = 0;

    const stepX = (canvas.width - padding * 2) / (prices.length - 1);

    ctx.beginPath();

    prices.forEach((price, index) => {
      const x = padding + index * stepX;

      const y =
        canvas.height -
        padding -
        ((price - minPrice) / (maxPrice - minPrice)) *
          (canvas.height - padding * 2);

      points.push({
        x,
        y,
        price,
        timestamp: timestamps[index],
      });

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (hoverPoint) {
      drawHoverDetails(hoverPoint);
    }
  }

  function drawHoverDetails(point) {
    // vertical line
    ctx.beginPath();
    ctx.moveTo(point.x, padding);
    ctx.lineTo(point.x, canvas.height - padding);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();

    // green dot
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#00ff00";
    ctx.fill();

    // stock price tooltip
    const priceText = `${stockname}: $${point.price.toFixed(2)}`;

    ctx.font = "20px Arial";
    const textWidth = ctx.measureText(priceText).width;

    const boxWidth = textWidth + 14;
    const boxHeight = 24;
    
    let boxX = point.x + 10;
    let boxY = point.y + 25;

    if (boxX + boxWidth > canvas.width) {
      boxX = point.x - boxWidth - 10;
    }

    if (boxY + boxHeight > canvas.height - 45) {
      boxY = point.y - boxHeight - 15;
    }

    ctx.fillStyle = "#07064f";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    ctx.beginPath();
    // ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 5);
    ctx.rect(boxX, boxY, boxWidth, boxHeight);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.fillText(priceText, boxX + 7, boxY + 17);

    // date tooltip on x-axis
    const date = new Date(point.timestamp * 1000);
    const dateText = date.toLocaleDateString("en-US");

    const dateWidth = ctx.measureText(dateText).width;
    const dateBoxWidth = dateWidth + 18;
    const dateBoxHeight = 26;

    const dateX = Math.max(0, Math.min(point.x - dateBoxWidth / 2, canvas.width - dateBoxWidth));
    const dateY = canvas.height - 30;

    ctx.fillStyle = "#07064f";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.roundRect(dateX, dateY, dateBoxWidth, dateBoxHeight, 5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.fillText(dateText, dateX + 9, dateY + 17);
  }

  canvas.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);

    let nearestPoint = points[0];

    points.forEach((point) => {
      if (Math.abs(point.x - mouseX) < Math.abs(nearestPoint.x - mouseX)) {
        nearestPoint = point;
      }
    });

    drawChart(nearestPoint);
  });

  canvas.addEventListener("mouseleave", function () {
    drawChart();
  });

  drawChart();
}


selectDefaultRange();
stock();
stopList();
stockDetails();
export default stock;
