import React, { useRef } from "react";
import {generateMnemonic} from "bip39";

export default function DisplayMnemonic({
  setMnemonic
}: {
  setMnemonic: React.Dispatch<React.SetStateAction<string>>
}) {
    const inputPhrase = useRef<HTMLInputElement>(null);
    return (
        <div>
            <input ref={inputPhrase} type="text" placeholder="Generate Phrase or Type an existine one..." onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setMnemonic(e.target.value);
            }}/>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
                const phrase = generateMnemonic();
                if(inputPhrase.current){
                    inputPhrase.current.value = phrase;
                }
                setMnemonic(phrase);
            }}>Generate Phrase</button>
        </div>
    )
}
