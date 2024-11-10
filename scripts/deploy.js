async function main() {
    const UserLogin = await ethers.getContractFactory("UserLogin");
    const userLogin = await UserLogin.deploy();
    await userLogin.deployed();
    console.log("UserLogin deployed to:", userLogin.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  