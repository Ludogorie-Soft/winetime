import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

export async function fetchEyanakData() {
    const yanakLoginBody = {
        "email": process.env.YANAK_EMAIL,
        "username": process.env.YANAK_USERNAME
    };

    const yanakPiazzaBody = {
        "warehouse_id": 2
    };

    const yanakAlikaBody = {
        "warehouse_id": 5
    };

    const yanakLoginResponse = await fetch('https://api.eyanak.com:5555/e-shop/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(yanakLoginBody)
    });

    const authBearerToken = await yanakLoginResponse.json();
    const authToken = `Bearer ${authBearerToken.token}`;

    const [yanakPiazzaStocksResponse, yanakAlikaStocksResponse] = await Promise.all([
        fetch('https://api.eyanak.com:5555/e-shop/api/getstockslite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken,
            },
            body: JSON.stringify(yanakPiazzaBody)
        }),
        fetch('https://api.eyanak.com:5555/e-shop/api/getstockslite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken,
            },
            body: JSON.stringify(yanakAlikaBody)
        })
    ]);

    const yanakPiazzaStocks = await yanakPiazzaStocksResponse.json();
    const yanakAlikaStocks = await yanakAlikaStocksResponse.json();

    const yanakPiazzaStocksArray = Array.isArray(yanakPiazzaStocks) ? yanakPiazzaStocks : Object.values(yanakPiazzaStocks).flat();
    const yanakAlikaStocksArray = Array.isArray(yanakAlikaStocks) ? yanakAlikaStocks : Object.values(yanakAlikaStocks).flat();

    const combinedStocks = [...yanakPiazzaStocksArray, ...yanakAlikaStocksArray];

    const stocksData = combinedStocks.reduce((acc, stock) => {
        const existingStock = acc.find(item => item.barcode === stock.code);
        if (existingStock) {
            existingStock.quantity += stock.quantity;
        } else {
            acc.push({
                barcode: stock.code,
                quantity: stock.quantity,
                price: stock.price
            });
        }
        return acc;
    }, []);

    return stocksData;
}
