# Admin Wallet Setup Guide

## Step 1: Import Private Key to MetaMask

1. **Open MetaMask** in your browser
2. **Click on the account circle** (top right)
3. **Select "Import Account"**
4. **Choose "Private Key"** as the import method
5. **Paste your private key**: `0xa265ed2a3693cda65caa468bb5d93c4699346b9e35a49e91514a03d881629acb`
6. **Click "Import"**

## Step 2: Switch to Sepolia Testnet

1. **Click the network dropdown** (usually shows "Ethereum Mainnet")
2. **Select "Sepolia test network"**
   - If you don't see it, click "Show/hide test networks" in settings and enable it
3. **Confirm you're on Sepolia** (Chain ID: 11155111)

## Step 3: Get Sepolia ETH for Gas

1. **Go to a Sepolia faucet**:
   - https://sepoliafaucet.com/
   - https://faucet.sepolia.dev/
   - Or any other Sepolia faucet
2. **Enter your admin address**: `0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e`
3. **Request test ETH** (you need this for gas fees)

## Step 4: Test the Admin Panel

1. **Go to**: http://localhost:3001/admin
2. **Connect your wallet** (should show the admin address)
3. **Verify the status**:
   - Network: ✅ Sepolia
   - Admin status: ✅ Yes
   - Contract read test: ✅ Working
4. **Try creating a contest**

## Troubleshooting

- **If wallet doesn't connect**: Refresh the page and try connecting again
- **If wrong address shows**: Make sure you selected the imported account in MetaMask
- **If no gas**: Get more Sepolia ETH from a faucet
- **If transaction fails**: Check the browser console for error messages

## Admin Address Details

- **Address**: `0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e`
- **Private Key**: `0xa265ed2a3693cda65caa468bb5d93c4699346b9e35a49e91514a03d881629acb`
- **Network**: Sepolia Testnet (Chain ID: 11155111)