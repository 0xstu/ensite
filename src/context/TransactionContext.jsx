import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(ethereum);
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [transactions, setTransactions] = useState([]);

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert('Please install MetaMask');
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            setTransactions(structuredTransactions);

        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert('Please install MetaMask');

            const accounts = await ethereum.request({ method: 'eth_accounts' });
        
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }else{
                console.log('No accounts found.')
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert('Please install MetaMask');
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        getAllTransactions();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, transactions }}>
            {children}
        </TransactionContext.Provider>
    );
}
