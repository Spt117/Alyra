var  Web3  =  require('web3'); 

web3  =  new 

Web3(new  Web3.providers.HttpProvider('https://mainnet.infura.io/v3/0f64fa14d1b04119bcc600521f8dd9ea'));

var  ethTx  = ('0xc6ddaa76b9cdccf9bb185ba517a184ab30ae05335db69d48ccc8e858c04e1698');

web3.eth.getTransaction(ethTx, function(err, result) { 

if (!err  &&  result !==  null) {

    console.log(result); // Log all the transaction info

    console.log('From Address: ' +  result.from); // Log the from address

    console.log('To Address: ' +  result.to); // Log the to address

    console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether'))); // Get the value, convert from Wei to Ether and log it

}

else {

    console.log('Error!', err); // Dump errors here

}

});