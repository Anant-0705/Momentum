const crypto = require('crypto');
const { keccak256 } = require('js-sha3');
const secp256k1 = require('secp256k1');

function privateKeyToAddress(privateKeyHex) {
  // Remove 0x prefix if present
  const privateKey = privateKeyHex.replace('0x', '');
  
  // Convert to buffer
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');
  
  // Get public key from private key
  const publicKey = secp256k1.publicKeyCreate(privateKeyBuffer, false);
  
  // Remove the first byte (0x04) to get the uncompressed public key
  const publicKeyWithoutPrefix = publicKey.slice(1);
  
  // Hash the public key with Keccak-256
  const hash = keccak256(publicKeyWithoutPrefix);
  
  // Take the last 20 bytes and add 0x prefix
  const address = '0x' + hash.slice(-40);
  
  return address;
}

// Test the private key
const privateKey = '0xa265ed2a3693cda65caa468bb5d93c4699346b9e35a49e91514a03d881629acb';
const expectedAddress = '0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e';

try {
  const derivedAddress = privateKeyToAddress(privateKey);
  
  console.log('Private Key:', privateKey);
  console.log('Derived Address:', derivedAddress);
  console.log('Expected Address:', expectedAddress);
  console.log('Match:', derivedAddress.toLowerCase() === expectedAddress.toLowerCase() ? '✅ YES' : '❌ NO');
} catch (error) {
  console.error('Error:', error.message);
}