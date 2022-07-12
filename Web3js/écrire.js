async function main() {

    var  Web3  =  require('web3');
    require('dotenv').config();
    const HDWalletProvider = require('@truffle/hdwallet-provider');
    
    provider = new HDWalletProvider(`${process.env.MNEMONIC}`, `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`)
    web3 = new Web3(provider);
    
    
    var  abi  =  [
        {
            "inputs": [],
            "name": "retrieve",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "num",
                    "type": "uint256"
                }
            ],
            "name": "store",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    var  addr  =  "0x003b0eE8a4C603017A6B7dD6e209b3eEd5f803EE";
    
    var  Contract  =  new  web3.eth.Contract(abi, addr);
    
    Contract.methods.retrieve().call().then(console.log);
    await Contract.methods.store(33300000000).send({ from: '0x1Bf9Ee786B600A294DFd0151D1aF027a286A8f4B' });
    Contract.methods.retrieve().call().then(console.log);
    
    // process.exit();
    }
    

    main();