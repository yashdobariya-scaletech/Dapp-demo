import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { 
            storageValue: 0, 
            web3: null, 
            accounts: null, 
            contract: null 
          };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(web3,'web3');

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts,'accounts');

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId,'networkId');
      const deployedNetwork = SimpleStorageContract.networks['5777'].address;
      console.log(deployedNetwork,'deployedNetwork');
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork
      );

      console.log(instance,'instance');
      console.log( SimpleStorageContract.abi,'SimpleStorageContract.abi');

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    try{
      console.log('hello meta');
      await contract.methods.set(5).send({ from: accounts[0] });
      const response = await contract.methods.get().call();
      console.log(response,'response');
      this.setState({ storageValue: response });
    }
    catch(error){
      console.error(error,'er');
    }

    // Get the value from the contract to prove it worked.

    // Update state with the result.
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
