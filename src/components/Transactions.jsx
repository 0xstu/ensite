import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

const TransacationCard = ({ addressTo, addressFrom, timestamp, message, amount }) => {

  return ( <div className='bg-[#181918] m-4 flex flex-1
  2xl:min-w-[450px]
  2xl:max-w-[500px]
  sm:min-w-[270px]
  sm:max-w-[300px]
  flex-col p-3 rounded-md hover:shadow-2xl
  '>
    <div className='flex flex-col items-center w-full mt-3'>
      <div className='w-full mb-6 p-2'>
        <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target='blank' rel="noopener noreferrer">
          <p className='text-white text-base font-bold hover:text-[#2138D1]'>From: {shortenAddress(addressFrom)}</p>
        </a>
        <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target='blank' rel="noopener noreferrer">
          <p className='text-white text-base font-bold hover:text-[#2138D1]'>To: {shortenAddress(addressTo)}</p>
        </a>
        <p className='text-white text-base'>Amount: {amount} ETH</p>
        {message && (
          <>
            <br />
            <p className='text-white text-base'>Message: {message}</p>
          </>
        )}

      </div>
          <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
            <p className='text-[#37c7da] font-bold'>{timestamp}</p>
          </div>
    </div>
  </div>
  )
}

const Transactions = () => {
  const { currentAccount, transactions, chainId } = useContext(TransactionContext);

    return (
      <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
        <div className='flex flex-col h-screen md:p-12 py-10 px-4'>
        {currentAccount && chainId === 3 && (
          <h3 className='text-white text-3xl text-center my-2'>Latest Transactions</h3>
        )}
        {!currentAccount && (
          <div className='flex flex-col md:p-12 py-12 px-4'>
          <h3 className='text-white text-3xl text-center my-2'>Connect your account to see your latest transactions</h3>
          </div>
        )}
        {currentAccount && chainId !== 3 && (
          <>
          <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
            <div className='flex flex-col md:p-12 py-12 px-4'>
            <h3 className='text-white text-3xl text-center my-2'>No Transactions</h3>
            <p className='text-white text-xl text-center my-2 py-5'>You don't have any transactions. Make sure you have the Ropsten network selected, then refresh the page.</p> 
            <br /><p className='text-white text-xl text-center my-2'>Error</p>
            </div>
          </div>
          </>
        )}
        {transactions && (<div className='flex flex-wrap justify-center items-center mt-10'>
           {transactions.reverse().map((transaction, i) => (
            <TransacationCard key={i} {...transaction} />))}
            </div>)}
        </div>
      </div>
    )
  };

export default Transactions;
