# Puerto Rico Embalses

A real-time dashboard for monitoring water reservoir levels across Puerto Rico, using data from the USGS Water Services API.

## Features

- Interactive map showing reservoir locations with color-coded alert levels
- Table view of all reservoirs with current levels and alerts
- Bar chart visualization of water levels
- Detailed view for individual reservoir history

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React Leaflet](https://react-leaflet.js.org/) - Interactive maps
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Bootstrap](https://getbootstrap.com/) - UI styling
- [Express](https://expressjs.com/) - Custom server for routing

## Prerequisites

- Node.js 18+ (tested with Node 26)
- npm

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:thejandroman/puerto_rico_embalses.git
cd puerto_rico_embalses
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Run ESLint with auto-fix |

## Project Structure

```
puerto_rico_embalses/
├── components/       # React components
│   ├── EmbalsesApi.js    # API helper for USGS data
│   ├── EmbalsesMap.js    # Leaflet map component
│   ├── EmbalsesTable.js  # Data table component
│   ├── Header.js         # Navigation header
│   ├── MyLayout.js       # Page layout wrapper
│   └── Niveles.js        # Chart.js bar chart
├── pages/            # Next.js pages
│   ├── _app.js           # App wrapper with global styles
│   ├── index.js          # Home page
│   ├── about.js          # About page
│   └── embalse.js        # Individual reservoir page
├── public/           # Static assets
├── server.js         # Express server with custom routing
└── package.json
```

## Data Source

Reservoir data is provided by the [USGS Water Services API](https://waterservices.usgs.gov/).

## License

MIT
