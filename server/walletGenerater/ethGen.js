const Web3=require("web3");
const createAccount = async() => {
  const web3 = await new Web3('https://sepolia.infura.io/v3/40745b7b9da3492dbeb0cd9dff114a2d');
  const newAccount = await web3.eth.accounts.create();
  console.log(newAccount);
  
  return (
    newAccount
  );
};

createAccount()