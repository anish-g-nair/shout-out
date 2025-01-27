### Project structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── MessageComponent.jsx
│   │   ├── Card.jsx
│   │   ├── FilterDropdown.jsx
│   ├── context/
│   │   └── AppContext.js
│   ├── pages/
│   │   └── MainPage.jsx
│   ├── App.js
│   ├── index.js
│   ├── index.css
├── .env
└── tailwind.config.js

```

### Modules installed

```
npx create-react-app frontend
cd frontend
npm install tailwindcss postcss autoprefixer axios react-icons @headlessui/react react-scripts web-vitals react-datepicker react-toastify
npx tailwindcss init

npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

### Tailwind Colors (`-200`)
- Red: hsl(359.94deg 100% 89.65%)
- Orange: hsl(32.19deg 100% 82.87%)
- Amber: hsl(48.04deg 98.22% 75.9%)
- Yellow: hsl(52.76deg 99.44% 76.08%)
- Lime: hsl(80.73deg 89.77% 78.92%)
- Green: hsl(141.18deg 81.16% 84.82%)
- Emerald: hsl(152.56deg 77.95% 80.02%)
- Teal: hsl(152.56deg 77.95% 80.02%)
- Cyan: hsl(186.2deg 95.86% 81.44%)
- Sky: hsl(200.56deg 97.99% 85.95%)
- Blue: hsl(213.31deg 100% 87.29%)
- Indigo: hsl(228.01deg 100% 89.09%)
- Violet: hsl(250.5deg 100% 91.95%)
- Purple: hsl(268.56deg 100% 91.91%)
- Fuchsia: hsl(288.21deg 100% 90.71%)
- Pink: hsl(325.81deg 87.86% 89.84%)
- Rose: hsl(352.59deg 100% 90.07%)
- Slate: hsl(214.19deg 33.11% 91.43%)
- Gray: hsl(344.79deg 11.54% 91.05%)
- Zinc: hsl(344.76deg 6.76% 89.87%)
- Neutral: hsl(0deg 0.09% 89.82%)
- Stone: hsl(344.71deg 5.22% 90.18%)

#### Selected ones
- Orange: hsl(32.19deg 100% 82.87%)
- Yellow: hsl(52.76deg 99.44% 76.08%)
- Lime: hsl(80.73deg 89.77% 78.92%)
- Emerald: hsl(152.56deg 77.95% 80.02%)
- Cyan: hsl(186.2deg 95.86% 81.44%)
- Sky: hsl(200.56deg 97.99% 85.95%)
- Indigo: hsl(228.01deg 100% 89.09%)
- Violet: hsl(250.5deg 100% 91.95%)
- Fuchsia: hsl(288.21deg 100% 90.71%)
- Pink: hsl(325.81deg 87.86% 89.84%)
- Slate: hsl(214.19deg 33.11% 91.43%)

#### Ordered selection
- Cyan: hsl(186.2deg 95.86% 81.44%)
- Yellow: hsl(52.76deg 99.44% 76.08%)
- Pink: hsl(325.81deg 87.86% 89.84%)
- Indigo: hsl(228.01deg 100% 89.09%)
- Lime: hsl(80.73deg 89.77% 78.92%)
- Slate: hsl(214.19deg 33.11% 91.43%)
- Orange: hsl(32.19deg 100% 82.87%)
- Sky: hsl(200.56deg 97.99% 85.95%)
- Fuchsia: hsl(288.21deg 100% 90.71%)
- Emerald: hsl(152.56deg 77.95% 80.02%)
- Violet: hsl(250.5deg 100% 91.95%)

### Some variables
- # REACT_APP_CARD_COLORS="#FF5733,#33FF57,#3357FF"
- # REACT_APP_HIDE_FIELDS=["from", "title"]
# REACT_APP_RECIPIENTS=[{"name":"John","email":"john@example.com"},{"name":"Simon",- "email":"simon@example.com"},{"name":"Alice","email":"alice@example.com"}]
- # ➕ 📌 🔄 🔁 + ⚲ ⟳ ⊘ ⛌ 🗙 ✖
     