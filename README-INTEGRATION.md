# 🚀 Momentum - Decentralized Prediction Markets

Momentum is a fully decentralized prediction market platform where users stake USDC on binary outcomes. Winners are determined by which side attracts more capital (social sentiment betting), rather than factual correctness.

## ✨ Features

### 🎯 Core Functionality
- **Binary Prediction Markets**: Stake on A vs B outcomes
- **Social Sentiment Based**: Winners determined by capital allocation
- **24-Hour Contest Duration**: Fixed duration for all contests
- **Automatic Resolution**: Contests resolve automatically after 24 hours
- **Real-time Updates**: Live contest progression and user stakes
- **Platform Fees**: 2% fee collected on all contests

### 🔐 Web3 Integration
- **Wallet Connection**: RainbowKit integration with multiple wallet support
- **Sepolia Testnet**: Running on Ethereum Sepolia testnet
- **Mock USDC**: Test token with built-in faucet (10,000 tokens per request)
- **Smart Contract Integration**: Direct interaction with deployed contracts
- **Real-time Blockchain Events**: Live updates from contract events

### 👤 User Features
- **Token Setup**: Easy USDC token addition and faucet access
- **Contest Browsing**: View all active and resolved contests
- **Staking Interface**: Intuitive UI for placing stakes with ROI calculations
- **Claim Winnings**: Automatic winner detection and claim functionality
- **User Stakes Tracking**: Real-time tracking of user positions

### 🛠 Admin Features
- **Contest Creation**: Admin-only contest creation with validation
- **Platform Stats**: Real-time platform statistics dashboard
- **Fee Management**: Platform fee collection and withdrawal (TODO)

## 🏗 Technical Architecture

### Frontend Stack
- **Next.js 15**: App Router with TypeScript
- **Wagmi v2**: React hooks for Ethereum
- **RainbowKit**: Wallet connection UI
- **Viem**: Low-level Ethereum library
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Responsive styling
- **Radix UI**: Accessible component primitives

### Smart Contracts (Already Deployed)
- **MockUSDC**: `0xAd5C7d6B80bAC82e03088d3BeB755EE6d0aCb7Fa`
- **ContestFactory**: `0x04f77A36a5F865e8185cf9835Ab72fbab794514b`
- **Contest**: Individual prediction contracts
- **Admin Address**: `0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e`

### Key Components
- **ContestList**: Displays active/resolved contests
- **RealContestCard**: Individual contest preview with real-time data
- **StakeInterface**: Complete staking workflow with approvals
- **ClaimButton**: Winner detection and rewards claiming
- **TokenSetup**: USDC token setup and faucet access
- **WalletConnect**: Wallet connection management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH for gas fees

### 1. Clone and Install
```bash
git clone https://github.com/Anant-0705/Momentum.git
cd Momentum
npm install
```

### 2. Environment Setup
```bash
# Copy and configure environment variables
cp .env.local.example .env.local
```

Required environment variables:
```env
# Sepolia Configuration
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/LeGSIpWgv5T9ZQGB96w_M
NEXT_PUBLIC_MOCK_USDC_ADDRESS=0xAd5C7d6B80bAC82e03088d3BeB755EE6d0aCb7Fa
NEXT_PUBLIC_CONTEST_FACTORY_ADDRESS=0x04f77A36a5F865e8185cf9835Ab72fbab794514b
NEXT_PUBLIC_ADMIN_ADDRESS=0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e
NEXT_PUBLIC_CHAIN_ID=11155111

# WalletConnect (Get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📱 User Journey

### New User Onboarding
1. **Connect Wallet**: Connect MetaMask or compatible wallet
2. **Add Mock USDC**: Add token `0xAd5C7d6B80bAC82e03088d3BeB755EE6d0aCb7Fa`
3. **Get Test Tokens**: Use faucet to get 10,000 mUSDC
4. **Start Participating**: Browse and stake on contests

### Participating in Contests
1. **Browse Contests**: View active contests on homepage or `/contests`
2. **Select Contest**: Click on any contest card to view details
3. **Choose Side**: Select Option A or Option B
4. **Enter Amount**: Specify USDC amount to stake
5. **Approve Tokens**: Approve USDC spending (one-time per contest)
6. **Place Stake**: Confirm transaction to place stake
7. **Wait for Resolution**: Contest resolves after 24 hours
8. **Claim Winnings**: If you're on the winning side, claim your rewards

### Admin Functions
1. **Admin Access**: Only admin wallet can access `/admin`
2. **Create Contest**: Fill out question and two options
3. **Monitor Stats**: View platform statistics
4. **Fee Management**: Withdraw platform fees (TODO)

## 🔧 Development Guide

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel
│   ├── contest/[address]/ # Individual contest pages
│   ├── contests/          # Contest listing
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── ContestList.tsx    # Contest listing
│   ├── RealContestCard.tsx # Contest preview
│   ├── StakeInterface.tsx # Staking UI
│   ├── ClaimButton.tsx    # Claim winnings
│   ├── TokenSetup.tsx     # Token setup flow
│   └── WalletConnect.tsx  # Wallet connection
├── lib/                   # Utilities and hooks
│   ├── hooks.ts           # Custom Web3 hooks
│   ├── contract-utils.ts  # Contract utilities
│   ├── wagmi.ts           # Wagmi configuration
│   └── utils.ts           # General utilities
└── contracts/
    └── abis/
        └── contracts.ts   # Contract ABIs and addresses
```

### Custom Hooks
- `useActiveContests()`: Get all active contests
- `useContestInfo(address)`: Get contest details
- `useUserStakes(address, user)`: Get user stakes
- `useUSDCBalance(address)`: Get USDC balance
- `useStake()`: Place stakes on contests
- `useClaim()`: Claim winnings
- `useCreateContest()`: Admin contest creation

### Key Utilities
- `formatUSDC(amount)`: Format USDC amounts
- `parseUSDC(amount)`: Parse USDC from strings
- `formatTimeRemaining(seconds)`: Format countdown timers
- `calculateROI(stake, pools)`: Calculate potential returns
- `validateStakeAmount(amount, balance)`: Validate stake inputs

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first responsive layout
- Adaptive card grids and layouts
- Touch-friendly interactive elements

### Visual Feedback
- Loading states for all async operations
- Success/error states with clear messaging
- Real-time progress bars for contest pools
- Smooth animations and transitions

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast color schemes
- Clear focus indicators

## 🧪 Testing

### Test Environment
- Uses Sepolia testnet (Chain ID: 11155111)
- Mock USDC with unlimited faucet
- Pre-deployed contracts ready for testing
- Test ETH available from Sepolia faucets

### Testing Checklist
- [ ] Wallet connection works
- [ ] Can add mUSDC token to wallet
- [ ] Faucet provides test tokens
- [ ] Can view active contests
- [ ] Can place stakes (approve + stake)
- [ ] Contest timer counts down correctly
- [ ] Can resolve ended contests
- [ ] Winners can claim rewards
- [ ] Admin can create contests
- [ ] Real-time updates work

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables for Production
All the same environment variables as development, but ensure:
- Use production RPC URLs
- Set proper WalletConnect Project ID
- Use production domain for callbacks

## 🔐 Security Considerations

### Smart Contract Security
- Contracts are already audited and deployed
- Platform fee is hardcoded at 2%
- Contest duration is fixed at 24 hours
- Minimum stake enforced at contract level

### Frontend Security
- Client-side validation with server-side confirmation
- Proper error handling for failed transactions
- Rate limiting on UI interactions
- Secure environment variable handling

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier formatting
- Component-based architecture
- Custom hooks for Web3 logic
- Comprehensive error handling

## 📞 Support

### Getting Help
- Check existing GitHub issues
- Review the documentation
- Test on Sepolia testnet first
- Provide transaction hashes for debugging

### Common Issues
- **WalletConnect errors**: Check project ID in environment
- **Contract call failures**: Ensure sufficient gas and token approvals
- **Balance not updating**: Wait for blockchain confirmation
- **Admin access denied**: Verify wallet address matches admin address

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Success Metrics

The integration is successful when:
- ✅ Users can connect wallet and get test tokens
- ✅ Users can browse and stake on contests seamlessly
- ✅ Real-time updates show contest progression
- ✅ Winners can claim rewards after resolution
- ✅ Admin can create contests and collect fees
- ✅ UI is responsive and intuitive

---

**Built with ❤️ for the decentralized future of prediction markets.**