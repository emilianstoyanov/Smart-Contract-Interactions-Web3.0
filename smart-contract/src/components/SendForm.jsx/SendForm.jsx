// import React, { useEffect } from "react";
import React from "react";

import "./SendForm.css";
import { useWallets } from "@web3-onboard/react";

import { ethers } from "ethers";
import { ERC20_ABI, ERC20_ADDRESS } from "../../constants";

const SendForm = () => {
  const [sendTo, setSendTo] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [message, setMessage] = React.useState(null);
  const [banalce, setBalance] = React.useState(0);

  useEffect(() => {
    if (
      connectedWallets &&
      connectedWallets.length > 0 &&
      connectedWallets[0].accounts.length > 0
    ) {
      const contract = getContract(connectedWallets);

      contract
        .balanceOf(connectedWallets[0].accounts[0].address)
        .then((res) => {
          setBalance(ethers.utils.formatUnits(res, 18));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [connectedWallets]);

  const connectedWallets = useWallets();

  const handleSendToChange = (e) => {
    setSendTo(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  
  const handleSend = (e) => {
    e.preventDefault();


    contract
      .transfer(sendTo, amount)
      .then((res) => {
        console.log(res);
        return res.wait();
      })
      .then((res) => {
        if (res.status === 1) {
          showMeesage("Success!");
        }

        if (res.status === 0) {
          showMeesage("Failed!");
        }
      })
      .catch((err) => {
        console.log(err);
        showMeesage(err.message);
      });
};

function showMeesage(message) {
  setMessage(message);
  setTimeout(() => {
    setMessage(null);
  }, 1000 * 3);
}

  return (
    <div className='form-wrapper'>
      {/* <p>Balance: {balance} MTK</p> */}
      <form className='send-form' onSubmit={handleSend}>
        <div>
          <label htmlFor='sendTo'>Send to:</label>
          <input
            type='text'
            id='sendTo'
            value={sendTo}
            onChange={handleSendToChange}
            required
          />
        </div>
        <div>
          <label htmlFor='amount'>Amount:</label>
          <input
            type='number'
            id='amount'
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        {/* <label>Network Fee: {gasCost} WEI</label> */}

        <button type='submit'>Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendForm;




// useEffect(() => {
//   if (
//     connectedWallets &&
//     connectedWallets.length > 0 &&
//     connectedWallets[0].accounts.length > 0
//   ) {
//     const contract = getContract(connectedWallets);

//     contract
//       .balanceOf(connectedWallets[0].accounts[0].address)
//       .then((res) => {
//         setBalance(ethers.utils.formatUnits(res, 18));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }, [connectedWallets]);

// useEffect(() => {
//   if (!connectedWallets || !sendTo || !amount) return;
//   const contract = getContract(connectedWallets);

//   console.log(sendTo);
//   contract.estimateGas.transfer(sendTo, amount).then((_gasCost) => {
//     console.log(_gasCost.toString());
//     setGasCost(_gasCost.toString());
//   });
// }, [connectedWallets, sendTo, amount]);






//   const contract = getContract(connectedWallets);
  