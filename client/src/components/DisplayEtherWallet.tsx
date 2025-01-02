import { useEffect, useRef, useState } from "react";
import {HDNodeWallet} from "ethers";

interface Wallet {
    mnemonic: string,
    publicKey: string,
    privateKey: string
};

let id = 0;

export default function DisplayEtherWallet({mnemonic}: {mnemonic: string}){
    const accountCount = useRef(0);
    const [wallets, setWallets] = useState<Wallet[]>([]);

    useEffect(()=>{
        setWallets([]);
    }, [mnemonic])

    return (
        <div>
            <h2>Ether Wallet</h2>
            <div>
                {
                    wallets.length ?
                    wallets.map((wallet)=>(
                        <div key={id++} style={{marginBottom: "5px"}}>
                            <div>Private Key: {wallet.privateKey}</div>
                            <div>Public Key: {wallet.publicKey}</div>
                            <div>Mnemonic: {wallet.mnemonic}</div>
                        </div>
                    )): ""
                }
            </div>
            <button onClick={()=>{
                if(mnemonic){
                    const path = `m/44'/60'/${accountCount.current}'/0'`;
                    const wallet = HDNodeWallet.fromPhrase(mnemonic, undefined, path);
                    setWallets([...wallets, {
                        mnemonic,
                        publicKey: wallet.publicKey,
                        privateKey: wallet.privateKey
                    }]);
                    accountCount.current++;   
                }
            }}>Add Ether Wallet</button>
        </div>
    )
}