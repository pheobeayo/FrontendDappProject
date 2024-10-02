import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../artifacts/contracts/FrontendProject.sol/FrontendProject.json';

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [name, setName] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const contractAddress = '0x4742a10E05a4F82472ACCF3C369504fe3F39e4ED';
  const ABI = abi.abi;

  useEffect(() => {
    getWallet();
    handleAccount();
  }, []);

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
  };

  const handleAccount = async () => {
    if (ethWallet) {
      const accounts = await ethWallet.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        console.log('No account found');
      }
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
      handleAccount(accounts);
      getFrontendProjContract();
    } catch (error) {
      console.error('Error connecting account:', error);
    }
  };

  const getFrontendProjContract = () => {
    if (ethWallet) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const AssessmentContract = new ethers.Contract(contractAddress, ABI, signer);
      setContract(AssessmentContract);
    }
  };

  const fetchAmount = async () => {
    try {
      if (contract) {
        const amountData = await contract.getAmount();
        setAmount(amountData.toNumber());
      }
    } catch (error) {
      console.error('Error fetching amount:', error);
    }
  };

  const fetchName = async () => {
    try {
      if (contract) {
        const nameData = await contract.getName();
        setName(nameData);
      }
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  const updateAmount = async (value) => {
    try {
      if (contract) {
        const tx = await contract.setAmount(value);
        await tx.wait();
        fetchAmount();
      }
    } catch (error) {
      console.error('Error setting amount:', error);
    }
  };

  const updateName = async (value) => {
    try {
      if (contract) {
        const tx = await contract.setName(value);
        await tx.wait();
        fetchName();
      }
    } catch (error) {
      console.error('Error setting name:', error);
    }
  };

  const renderUserInterface = () => {
    if (!ethWallet) {
      return (
        <div className="info">
          <p>Please install MetaMask in order to use this dApp.</p>
        </div>
      );
    }

    if (!account) {
      return (
        <div className="info">
          <button onClick={connectAccount}>Connect Wallet</button>
        </div>
      );
    }

    return (
      <div className="user">
        <p className="account">Connected Account: {account}</p>
        <div className="balance">
          <p>Your Deposit Amount: {amount}</p>
          <p>Your Name: {name}</p>
        </div>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="inputs">
            <input
              type='number'
              className="input"
              placeholder="Enter amount here"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
            />
            <button className="button" type="button" onClick={() => updateAmount(amountInput)}>
              Set Amount
            </button>
          </div>
          <div className="inputs">
            <input
              type='text'
              className="input"
              placeholder="Enter name here"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <button className="button" type="button" onClick={() => updateName(nameInput)}>
              Set Name
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Amount Deposit and Name Input Form</h1>
      </header>
      {renderUserInterface()}
      <style>{`
        .container {
          text-align: center;
          padding: 20px;
          background-color: #007bff;
          margin: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 80vh;
          width: 80%;
        }

        .header {
          margin-bottom: 20px;
        }

        .title {
          font-size: 2.5rem;
          color: #fff;
        }

        .info {
          margin-bottom: 20px;
        }

        .info button {
          padding: 12px 24px;
          font-size: 1rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .user {
          margin-bottom: 40px;
        }

        .account {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #fff;
        }

        .balance p {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #fff;
        }

        .form {
          margin-top: 20px;
        }

        .inputs {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .input {
          padding: 10px;
          margin-right: 15px;
          border-radius: 8px;
          border: 1px solid #007bff;
          width: 200px;
        }

        .button {
          padding: 12px 24px;
          font-size: 1rem;
          background-color:#f8f9fa;
          color: #000;
          border: #000;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}