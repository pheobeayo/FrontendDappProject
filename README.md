# Function Project

This Solidity program is a simple contract called FrontendProject with four (4) functions. The values of these functions are accessible on the frontend of the application, illustrating the basic syntax and functionality of the Solidity programming language.

## Description

This program comprises a straightforward contract coded in Solidity, a language tailored for creating smart contracts on the Ethereum blockchain. The contract contains four functions designed to test wallet connection to dApp, setAge in number, setName in string, and fetch/get this data functionalities. Additionally, a frontend interface has been incorporated for user convenience.

## Getting Started

To run the code on your local machine, follow these steps after cloning the GitHub repository:

1. Inside the project directory, execute the following command in the terminal: `npm i`
2. Then type `npm run dev` to launch the frontend. The project will now be accessible on your localhost, typically at http://localhost:3000/

*Alternatively* - To redeploy contract locally. You will have to run this:
1. Inside the project directory, execute the following command in the terminal: `npm i`
2. Open two additional terminals in your VS Code.
3. In the second terminal, run: `npx hardhat node`
4. In the third terminal, execute: `npx hardhat run --network localhost scripts/deploy.js` (Alternatively, you can run `npx node deploy` and replace the new contract address obtained with the one in the `index.js` file before running the previous command)
5. Back in the first terminal, type `npm run dev` to launch the frontend. The project will now be accessible on your localhost, typically at http://localhost:3000/


## Authors
- Samuel Adedayo

## License

This project is licensed under the MIT License. See the `LICENSE.md` file for details.


## Video-link

Video walk through can be found at: https://www.loom.com/share/5bdbac606468461a8cc75ed135480f50?sid=6c6e5a15-da8f-42a3-83bb-9439089ce40b
