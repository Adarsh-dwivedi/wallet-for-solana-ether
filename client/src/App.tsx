import { useState } from "react"
import DisplayMnemonic from "./components/DisplayMnemonic";
import DisplaySolWallet from "./components/DisplaySolWallet";
import DisplayEtherWallet from "./components/DisplayEtherWallet";
import DisplaySolanaBalance from "./components/DisplaySolanaBalance";


function App() {
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <>
      <DisplayMnemonic setMnemonic={setMnemonic} />
      <hr />
      <DisplaySolWallet mnemonic={mnemonic} />
      <hr />
      <DisplayEtherWallet mnemonic={mnemonic} />
      <hr />
      <DisplaySolanaBalance />
      <hr />
    </>
  )
}

export default App
