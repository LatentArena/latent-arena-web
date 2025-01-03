# PREDEX: Product Requirements Document

Latent Arena is a web3 content betting platform inspired by show called Kill Tony.
Core Concept:

- Creator-focused platform where users upload performance content
- AI judges with unique personalities review and score content
- Community members bet on scores through Solana smart contracts
- 24-hour pools split: 45% creator, 45% winning audience, 10% operations
- Similar to "Kill Tony" format but decentralized and AI-powered

## 1. Product Overview

### 1.1 Purpose

A decentralized platform that enables users to make predictions on content engagement through a web application and browser extension, primarily integrated with YouTube.

### 1.2 Product Components

- Landing page (Web)
- Main application (Web-based dApp)
- Browser extension (Chrome/Firefox)
- Backend moderation system
- Smart contract infrastructure

## 2. User Interfaces

### 2.1 Landing Page

#### Requirements

- Clean, modern design showcasing platform concept
- "Launch App" button prominently displayed
- Browser extension download/install link
- Platform value proposition
- Quick start guide
- FAQ section

### 2.2 Browser Extension

#### Core Functionality

- Injects UI elements below YouTube videos
- Displays submission button for new content
- Shows prediction interface for live content
- Provides quick access to main dApp

#### UI Elements for YouTube Integration

- "Submit to PREDEX" button (for new content)
- Countdown timer (for live content)
- Range slider for predictions
- Stake amount selector (Tier 1/Tier 2)
- Submit prediction button
- Link to full dApp interface

### 2.3 Main dApp (Discovery Page)

#### Features

- Content grid/list view
- Filtering and sorting options
- Live countdown timers
- Prediction interface for each content
- Statistics display
- Wallet connection
- User dashboard

## 3. User Flows

### 3.1 Content Submission Flow

1. User finds YouTube video
2. Clicks "Submit to PREDEX" via extension
3. Connects wallet if not connected
4. Selects stake tier
5. Optional: Provides self-score
6. Submits content
7. Receives confirmation of submission
8. Backend moderation process begins
9. Notification when content goes live

### 3.2 Prediction Flow

1. User discovers content (via extension or dApp)
2. Connects wallet if not connected
3. Selects stake tier
4. Adjusts prediction range slider
5. Reviews potential rewards
6. Confirms prediction
7. Receives confirmation of stake

### 3.3 Results & Rewards Flow

1. Prediction window closes
2. AI judges evaluate content
3. Final scores calculated
4. Rewards distributed
5. Users notified of results
6. Statistics updated

## 4. Technical Requirements

### 4.1 Browser Extension

- Support for Chrome and Firefox
- YouTube page detection
- DOM manipulation for UI injection
- Wallet integration
- API communication with main platform

### 4.2 Backend Systems

- Content moderation queue
- AI judge system integration
- User authentication
- Blockchain interaction
- API endpoints for extension and dApp

### 4.3 Smart Contracts

- Stake management
- Range-based prediction logic
- Reward distribution
- Creator payments

## 5. Performance Requirements

- Extension load time: < 2 seconds
- UI injection time: < 1 second
- Prediction submission time: < 5 seconds
- Content moderation time: < 12 hours
- Smart contract interaction time: < 30 seconds

## 6. Security Requirements

- Secure wallet connections
- Content verification
- Stake protection
- Rate limiting
- Anti-spam measures

## 7. MVP Features vs Future Enhancements

### 7.1 MVP Features

- YouTube integration via extension
- Basic prediction functionality
- Two-tier staking system
- AI judge evaluation
- Reward distribution

### 7.2 Future Enhancements

- Additional platform integrations
- Mobile app
- Advanced analytics
- Social features
- Creator dashboard
