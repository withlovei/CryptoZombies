Build with truffle

Require:
    NodeJS lastest and Angular v10.
    
1. Install Ganache
 - Download from: https://www.trufflesuite.com/ganache
 - Or run command: npm i ganache-cli
2. Install truffle
    - npm i truffle
3. Run Ganache
    - Run from install by windows
    - Or run from command: ganache-cli -p 7545 - run wallet
4. Install metamask
    - https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en

~~~~
# Deploy contract.
    1. Go to Zombie-contract
    2. Check truffle-config.js
        Change port with ganache port, which you run on local machine.
    3. run comment:
        truffle migrate
    4. Check contract address deployed. Copy it.

# run angular project.
    1. Go to zombie-frontend
    2. Go to src/enviroments
        Open enviroment.ts and change ZOMBIE_CONTRACT equal new contract deployed.
    3. Back to root and run: npm install
    4. Run: ng server and enjoy
