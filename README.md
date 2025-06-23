# Rengsjö Farm Website

En modern, responsiv webbplats för Rengsjö Farm byggd med Next.js, React och Tailwind CSS.

## Funktioner

- 🌾 Produktpresentation för gårdsprodukter
- 📱 Helt responsiv design
- 🎨 Modern design med Tailwind CSS
- 📝 Kontaktformulär
- 🚀 Snabb prestanda med Next.js

## Kom igång

### Förutsättningar

- Node.js 16.x eller senare
- npm eller yarn

### Installation

1. Klona repot
```bash
git clone [repository-url]
cd rengsjo-farm
```

2. Installera dependencies
```bash
npm install
```

3. Starta utvecklingsservern
```bash
npm run dev
```

4. Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare

### Bygga för produktion

```bash
npm run build
npm start
```

## Projektstruktur

```
rengsjo-farm/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── styles/
│       └── globals.css
├── public/
├── package.json
└── tailwind.config.js
```

## Teknikstack

- **Next.js 15** - React framework
- **React 19** - UI bibliotek
- **TypeScript** - Typsäkerhet
- **Tailwind CSS** - Utility-first CSS
- **Headless UI** - Tillgängliga UI-komponenter
- **Heroicons** - SVG ikoner

## Anpassning

### Lägga till nya produkter

Redigera `products` arrayen i `src/components/Products.tsx`:

```typescript
const products = [
  {
    name: 'Produktnamn',
    description: 'Beskrivning',
    price: 'Pris',
    image: 'bild-url',
    features: ['Egenskap 1', 'Egenskap 2'],
  },
  // Lägg till fler produkter här
]
```

### Ändra färgtema

Redigera färgerna i `tailwind.config.js`:

```javascript
colors: {
  'farm-green': '#2d5016',
  'farm-brown': '#8b4513',
  'farm-yellow': '#f4a460',
  'farm-cream': '#faf6f2',
}
```

## Licens

© 2024 Rengsjö Farm. Alla rättigheter förbehållna.