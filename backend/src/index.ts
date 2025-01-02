import express from "express";
import axios from "axios";
import cors from "cors";

const app = express()
app.use(cors());
app.use(express.json());

app.get("/getSolanaBalance", async (req, res)=>{
    const {account} = req.query;
    const data = {                
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getBalance",
        "params": [account]
    };
    const url = "https://api.mainnet-beta.solana.com";
    const config = {
        headers: {
        "Content-Type": "application/json",
        }
    };
    try{
        const response = await axios.post(url, data, config);
        const message = response.data;
        res.status(200).json(message);
    }catch(e){
        const message = "API Failed, Try again";
        console.log(e);
        res.status(400).json(message);
    }
})

app.listen(3000);