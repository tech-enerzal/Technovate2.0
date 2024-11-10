// Import ethers for connecting to the contract
const { ethers } = window;

// Define your contract address and ABI
const contractAddress = "0xc345C2152CEaB787Aee127e11421fa70D40A01c3";
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "name": "UserConnected",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUsername",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      }
    ],
    "name": "storeUsername",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Select elements from the DOM
const walletAddressDiv = document.getElementById("wallet-address");
const storeButton = document.getElementById("store-button");
let userWalletAddress = "";

// if (typeof ethers === 'undefined' || !window.ethereum) {
//   alert("Ethers.js library or MetaMask not detected. Please ensure both are available.");
// } else {
//   console.log("Ethers.js and MetaMask are properly loaded.");
// }

// Function to connect to MetaMask and fetch the wallet address
async function connectWallet() {
  if (window.ethereum) {
    try {
      // Request account access
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      userWalletAddress = accounts[0];
      
      // Display the wallet address
      walletAddressDiv.textContent = userWalletAddress;

      // Initialize contract instance
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      console.log("Connected to contract:", contract);
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  } else {
    alert("MetaMask not detected. Please install MetaMask.");
  }
}

// Automatically call connectWallet when the page loads
window.addEventListener("load", connectWallet);

// Function to store username and wallet address on the contract and in MongoDB
storeButton.addEventListener("click", storeUserData);
async function storeUserData() {
  const username = document.getElementById("username").value;
  if (!username || !userWalletAddress) {
    alert("Please enter a username and connect wallet first.");
    return;
  }

  

  try {
      // Check if MetaMask is available
      if (!window.ethereum) {
        alert("MetaMask not found. Please install MetaMask to continue.");
        return;
      }

      
    // Interact with the contract to store the username
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Call the storeUsername function on the contract
    const tx = await contract.storeUsername(username);
    await tx.wait();  // Wait for the transaction to complete

    alert("User data stored successfully on the blockchain.");

    // Store in MongoDB as well
    await fetch("http://localhost:3000/api/store-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, walletAddress: userWalletAddress })
    });
    
  } catch (error) {
    console.error("Error storing data:", error);
  }
}

// Event listener for Store button


function navigateToTrackPage() {
  window.location.href = "track-product.html";
}
