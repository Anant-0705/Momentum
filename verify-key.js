// Simple address verification using ethers.js (if available) or web3 methods
// Run this in browser console or Node.js with ethers installed

const privateKey = '0xa265ed2a3693cda65caa468bb5d93c4699346b9e35a49e91514a03d881629acb';
const expectedAddress = '0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e';

console.log('🔍 Verifying Private Key to Address Mapping');
console.log('Private Key:', privateKey);
console.log('Expected Address:', expectedAddress);

// If you have ethers.js available (run in browser console or install ethers):
// const { ethers } = require('ethers');
// const wallet = new ethers.Wallet(privateKey);
// console.log('Derived Address:', wallet.address);
// console.log('Match:', wallet.address.toLowerCase() === expectedAddress.toLowerCase() ? '✅ YES' : '❌ NO');

// Manual verification steps:
console.log('\n📋 Manual Verification Steps:');
console.log('1. Go to: https://www.ethereumaddresslookup.com/private-key-to-address');
console.log('2. Enter private key:', privateKey);
console.log('3. Check if result matches:', expectedAddress);
console.log('\nOR');
console.log('1. Import the private key into MetaMask');
console.log('2. Check if the address matches the expected admin address');

// Alternative: Use an online converter
console.log('\n🌐 Online Tools:');
console.log('- https://toolkit.abdk.consulting/ethereum#key-to-address');
console.log('- https://www.ethereumaddresslookup.com/private-key-to-address');
console.log('- Import into MetaMask and check the address');