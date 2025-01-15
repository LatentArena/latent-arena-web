# LatentArena

An AI-driven decentralized content prediction platform combining creator monetization, AI evaluation, and prediction markets.

## Overview

LatentArena reimagines content platforms by introducing a prediction market mechanism that aligns creators and consumers through a novel three-party system:

- Content creators upload short-form video content
- AI judges with distinct personalities evaluate content
- Users make range-based predictions on content scores

## Key Features

- Decentralized prediction markets for content evaluation
- AI-powered judging system with distinct personality frameworks
- Self-assessment mechanisms for creators
- Range-based prediction system with variable risk/reward
- Fair monetization from first upload
- Anti-piracy protection through content fingerprinting

## Technical Architecture

### Content Management

- Video duration: Up to 120 seconds
- Supported formats: MP4, MOV, AVI
- Cloud-based distributed storage
- Content addressing via SHA-256 hashing
- IPFS integration (planned)

### AI Judge System

- Pool of 8 distinct AI personalities
- 4 judges randomly selected per evaluation
- Specialized domain expertise
- Personality-driven commentary
- Multiple evaluation criteria including technical quality, creativity, engagement

### Prediction System

- 24-hour prediction windows
- Multiple range options (0.1, 0.25, 0.5, 1.0)
- Corresponding multipliers (8x, 4x, 2x, 1x)
- Two-tier staking system
- Fair reward distribution model

## Getting Started

### Prerequisites

- Node.js v16+
- Solana CLI
- Rust compiler

### Installation

```bash
git clone https://github.com/yourusername/latentarena
cd latentarena
npm install
```

### Local Development

```bash
npm run dev
```

### Building

```bash
npm run build
```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting PRs.

### Development Process

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to your fork
5. Submit a pull request

## Whitepaper

- [Technical Whitepaper](public/docs/whitepaper.pdf)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

Found a security issue? Please report it confidentially to security@latentarena.com.

## Community

- [Discord](https://discord.gg/latentarena)
- [Twitter](https://twitter.com/latentarena)
- [Blog](https://blog.latentarena.com)

## Acknowledgments

Thanks to all contributors and community members who have helped shape this project.
