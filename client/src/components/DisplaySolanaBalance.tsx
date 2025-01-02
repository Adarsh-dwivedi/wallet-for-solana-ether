import axios from "axios";
import { useRef, useState } from "react";

type result = "none" | "balance" | "error";

export default function DisplaySolanaBalance(){
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState(-1);
    const [error, setError] = useState("");
    const showResult = useRef<result>("none");
    return (
        <div>
            <h2>Fetch Solana Balance</h2>
            {
                showResult.current=="balance" ? <div>Balance {balance} SOL</div>
                : showResult.current=="error" ? <div>{error}</div> : null
            }
            <input type="text" placeholder="Type your Solana Public Key" onChange={(e)=>{
                setAccount(e.target.value);
            }}/>
            <button onClick={()=>{
                if(account){
                    const url = "http://localhost:3000/getSolanaBalance/";
                    try{
                        (async function(){
                            const response = await axios.get(url, {
                                params: {
                                    account
                                }
                            });
                            if(response.data.result){
                                const balance = response.data.result.value/1000000000;
                                showResult.current = "balance";
                                setBalance(balance);
                                setError("");
                            } else if(response.data.error){
                                showResult.current = "error";
                                setError(response.data.error.message);
                                setBalance(-1);
                            } else{
                                showResult.current = "error";
                                setError("API call failed, Try again");
                                setBalance(-1);
                            }
                        })();
                        
                    }catch(e){
                        console.log(e);
                        showResult.current = "error";
                        setError("API call failed, Try again");
                        setBalance(-1);
                    }
                    
                }
            }}>Get Balance</button>
        </div>
    )
}