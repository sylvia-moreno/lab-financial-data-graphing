//const axios = require('axios');

let startDate = document.getElementById('from');
let endDate = document.getElementById('to');
const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${endDate.value}`;


const restFinanceApi = axios.create({
    baseURL: startDate === null ? url : 'http://api.coindesk.com/v1/bpi/historical/close.json'
});

const getFinanceInfo = data => {
    restFinanceApi
        .get(data)
        .then(resp => {
            console.log('Response from API is: ', resp.data);
            printChart(resp.data)
        })
        .catch(err => {
            console.log('Error is: ', err);
        })
}

const printChart = printData => {
    const coinDates = Object.keys(printData.bpi);
    const coinPrice = Object.values(printData.bpi);

    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: coinDates,
            datasets: [{
                label: 'Bitcoin Price',
                data: coinPrice,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }]
        }
    });
}


startDate.addEventListener('change', () => {
    getFinanceInfo();
});

endDate.addEventListener('change', () => {
    getFinanceInfo();
});

getFinanceInfo();