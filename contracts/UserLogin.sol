// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract UserLogin {
    // Mapping to store usernames associated with each wallet address
    mapping(address => string) private usernames;

    // Event to log the user connection
    event UserConnected(address user, string username);

    // Function to store username for the connected wallet
    function storeUsername(string memory _username) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        
        // Save username for the sender's address
        usernames[msg.sender] = _username;

        // Emit an event when user connects with MetaMask
        emit UserConnected(msg.sender, _username);
    }

    // Function to fetch username by address (optional for frontend verification)
    function getUsername(address _user) public view returns (string memory) {
        return usernames[_user];
    }
}
