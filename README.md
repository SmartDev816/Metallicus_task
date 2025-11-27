# Loan Stats Dashboard

A modern Next.js application that displays loan statistics (TVL and APY) with interactive charts and a polished, responsive UI.

## Features

- 📊 **Interactive Charts**: Beautiful TVL and APY charts using ApexCharts
- 🎨 **Modern UI**: Clean, polished interface with Tailwind CSS
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ⚡ **Fast Loading**: Optimized data fetching with proper caching
- 🛡️ **Error Handling**: Comprehensive error states with retry functionality
- 🎯 **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: ApexCharts
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd loan-stats
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
loan-stats/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with tabs and charts
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── TVLChart.tsx        # TVL chart component
│   ├── APYChart.tsx        # APY chart component
│   ├── Tabs.tsx            # Tab navigation component
│   ├── LoadingSpinner.tsx  # Loading state component
│   └── ErrorMessage.tsx    # Error state component
├── lib/
│   ├── api.ts              # API fetching utilities
│   └── types.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## API Endpoints

The application fetches data from the following endpoints:

- **TVL**: `https://identity.api.prod.metalx.com/v1/loan/stats/tvl?token_symbol=XUSDC&days=7`
- **APY**: `https://identity.api.prod.metalx.com/v1/loan/stats/apy?token_symbol=XUSDC&days=7`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

The application will be live at `https://your-project.vercel.app`

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Make sure to set the build command to `npm run build` and the start command to `npm start`.

## Usage

1. **View TVL Chart**: Click on the "TVL" tab to see the Total Value Locked chart
2. **View APY Chart**: Click on the "APY" tab to see the Annual Percentage Yield chart
3. **Toggle Dark Mode**: Use the theme toggle button in the top-right corner
4. **Interact with Charts**: Hover over data points to see detailed values, use zoom controls if available

## Features in Detail

### Charts
- **TVL Chart**: Area chart showing Total Value Locked over the last 7 days
- **APY Chart**: Line chart showing Annual Percentage Yield over the last 7 days
- Both charts include:
  - Smooth animations
  - Responsive design
  - Formatted tooltips
  - Zoom capabilities

### Error Handling
- Network error detection
- User-friendly error messages
- Retry functionality
- Loading states during data fetching

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions
- Optimized chart sizing for all screen sizes

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Modern React patterns (hooks, functional components)
- Component-based architecture

### Adding New Features
1. Create new components in the `components/` directory
2. Add API utilities in `lib/api.ts` if needed
3. Update types in `lib/types.ts` for new data structures
4. Follow existing patterns for consistency

## License

This project is created for a take-home assignment.

## Contact

For questions or issues, please open an issue in the repository.

---

**Note**: This application requires an active internet connection to fetch data from the MetalX API endpoints.


