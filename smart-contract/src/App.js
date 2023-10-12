import './App.css';
import Navbar from "./components/NavBar/NavBar";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
// import { errors, ethers } from "ethers";
import ChainModal from './components/ChainModal/ChainModal';

const API_KEY = "muZQr36vDyKnI9BAn76g4J10E9i3oNbn";
const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`;
const injected = injectedModule()


// initialize Onboard
init({
  connect: {
    autoConnectLastWallet: true,
  },
  wallets: [injected],
  chains: [
    {
      id: "0xaa36a7",
      token: "ETH",
      label: "Ethereum Sepolia",
      rpcUrl,
    },
  ],
  accountCenter: {
    desktop: {
    enabled: false
    },
    mobile: {
    enabled: false
    }
    }
});

  
function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  function handleDisconnect() {
    if (!wallet) {
      return;
    }

    disconnect(wallet).catch((error) => {
      console.error(error);
    });
  }


  if (wallet){
    return (
      <div className="App">
        <Navbar onDisconnect={handleDisconnect} />
        <ChainModal onDisconnect={handleDisconnect} />
        <button
          disabled={connecting} onClick={() => disconnect(wallet)}
          >
          {connecting ? "connecting" : "disconnect"}
        </button>

      </div>
    );

  }
  return (
    <div className="App">
      <Navbar onDisconnect={handleDisconnect} />
      <button disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? "connecting" : "connect"}
      </button>

    </div>
  );
}

export default App;
