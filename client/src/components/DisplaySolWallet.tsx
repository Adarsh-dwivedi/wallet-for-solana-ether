import { useMemo, useRef, useState } from "react";
import {mnemonicToSeedSync} from "bip39";
import { derivePath } from "ed25519-hd-key";
import {Keypair} from "@solana/web3.js";

interface Wallet {
    publicKey: string,
    privateKey: string,
    mnemonic: string
};

let id = 0;

export default function DisplaySolWallet({mnemonic}: {mnemonic: string}){
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const accountCount = useRef(0);
    const seed = useMemo(()=>{
        setWallets([]);
        return mnemonicToSeedSync(mnemonic);
    }, [mnemonic]);
    
    
    return (
        <div>
            <h2>Solana Wallet</h2>
            <div>
                {
                    wallets.length?
                    wallets.map((wallet)=>(
                        <div key={id++} style={{marginBottom: "5px"}}>
                            <div>Private Key(Encoded in hex): {wallet.privateKey}</div>
                            <div>Public Key(Base 58 Encoded): {wallet.publicKey}</div>
                            <div>Mnemonic: {wallet.mnemonic}</div>
                        </div>
                    ))
                    : ""
                }
            </div>
            
            <button onClick={()=>{
                if(mnemonic){
                    const path = `m/44'/501'/${accountCount.current}'/0'`;
                    accountCount.current++;
                    const derivedSeed = derivePath(path, seed.toString("hex")).key;
                    const keypair = Keypair.fromSeed(derivedSeed);
                    setWallets((w) => [
                        ...w,
                        {
                            privateKey: Buffer.from(keypair.secretKey).toString("hex"),
                            publicKey: keypair.publicKey.toBase58(),
                            mnemonic: mnemonic,
                        }
                    ]);
            
                }
            }}>Add Solana Wallet</button>
        </div>
    )
}