Objective
You have a keen interest in the stock market and want to work on an application where you can have your own portfolio and keep track of its data over different ranges of time. But you want the data to be authentic to perform real-time analysis.
Goal
Create a web Application to show all available stocks in your portfolio and also their data over different ranges of time.

Acceptance criteria
1. The App must have 3 major sections:
- Chart section
- List section
- Detail section
2. The Chart section should display a chart based on the data fetched by the provided API.
3. There should be buttons to change the range on which the chart is built.
4. Clicking on any of the buttons should rerender the chart according to the value of the button.
5. The List section should display all the stocks present in the provided stock list, along with details like bookValue and profit.
6. Each list item should have a click event which should change the content of the chart section to the selected stocks.
7. It should be displayed on the right side of the page beside the chart section.
8. The Details section should be present below the chart section, and it should display the name, profit, and bookValue along with its little summary provided through the API.

asks
You are given an array of stocks that have to be used in this project.
The array "Stocks" is:
const Stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];


You are provided with three different APIs:
a. To get the charts data use this API:
https://stock-market-api-k9vl.onrender.com/api/stocksdata
b. To get the bookValue and profit, use this API:
https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata
c. To get the summary of any stock, use this API:
https://stock-market-api-k9vl.onrender.com/api/profiledata
Render all the stocks given in the array along with their bookValue and profit, and each stock should have an onclick event, which should change the content of the chart and detail section.

For the chart section, display the chart, which should be mapped according to the data fetched using the API.
On hovering over the chart, it should display the timestamp on the x-axis, and subsequently, the name and price of the stock at that date should be displayed at the cursor position, as shown in the picture below.
There should be 4 buttons with text "1month", "3month", "1year" and "5year", clicking on which, chart content should be changed according to the data fetched by the API.
In the detail section, the stock name, its bookValue, its profit, and summary should be displayed.
Break the file into multiple modules to make it more readable.
For the profit value, the color of the text should be green if the value is greater than 0 else it should be red.