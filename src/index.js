import m from "mithril";

let accounts = null;

// function to load in an instance of metamask
const loadMetamask = () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('Metamask Detected');
  }

  // request permissions from metamask
  accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
}

const App = {
  oninit: loadMetamask,
  view: () => {
    return m("button", {
      onclick: () => {
        const account = window.ethereum.selectedAddress;
        console.log(account);

        const batch = web3.createBatch();
        batch.add(web3.eth.sendTransaction.request({
          from: account,
          to: '0x0000000000000000000000000000000000000000',
          value: 1
        }));

        batch.add(web3.eth.sendTransaction.request({
          from: account,
          to: '0x0000000000000000000000000000000000000000',
          value: 2
        }));
        batch.execute();
      }
    }, "Send Batch Transaction");
  }
}

const root = document.body;
m.mount(root, App);