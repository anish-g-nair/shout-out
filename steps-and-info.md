backend/
├── models/
│   └── message.js
├── routes/
│   └── messages.js
├── .env
├── server.js
└── package.json

---

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


---

# Setup

## Frontend
1. Initialize React App:
- Use `create-react-app` or Vite for a new ReactJS project.
- Install required dependencies:

```
npm install react-router-dom react-icons @headlessui/react
npm install -D tailwindcss postcss autoprefixer webpack storybook
```

2. Setup TailwindCSS:
- Initialize Tailwind:

```
npx tailwindcss init
```

- Update `tailwind.config.js` and include custom styles.
- Include Tailwind in `src/index.css`:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Component Structure:

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── MessageComponent.jsx
│   ├── Card.jsx
│   ├── FilterDropdown.jsx
├── pages/
│   ├── MainPage.jsx
├── context/
│   ├── AppContext.js
├── App.js
├── index.js
└── styles/
    ├── tailwind.css
```

4. Context API:

Create a context for managing global state in `AppContext.js`:

```
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [filters, setFilters] = useState(null);

  return (
    <AppContext.Provider value={{ messages, setMessages, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
};
```

5. Styling with TailwindCSS:
- Create reusable classes for components like buttons, cards, etc.
- Include Tailwind configurations for random backgrounds.

## Backend

1. Initialize Node.js Server:
- Install dependencies:

```
npm init -y
npm install express mongoose cors dotenv
```

2. Setup MongoDB:
- Use MongoDB Atlas or a local MongoDB instance.
- Define a schema in `models/message.js`:

```
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  recipient: {
    name: String,
    email: { type: String, required: false },
  },
  message: {
    title: { type: String, required: false },
    description: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
```

3. API Endpoints:
- Create API routes in `routes/messages.js`:

```
const express = require('express');
const Message = require('../models/message');
const router = express.Router();

// GET all messages
router.get('/', async (req, res) => {
  const filter = req.query;
  const messages = await Message.find(filter);
  res.json(messages);
});

// POST new messages
router.post('/', async (req, res) => {
  try {
    const newMessages = req.body;
    const result = await Message.insertMany(newMessages);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

- Connect routes to `server.js`:

```
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const messageRoutes = require('./routes/messages');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/messages', messageRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

## Frontend Implementation

1. Header and Footer:
- Create components `Header.jsx` and `Footer.jsx` with Tailwind classes.

2. MessageComponent.jsx:
- Include a dropdown for recipients, a textarea, and a button to add more components.

3. Cards in MainPage.jsx:
- Fetch messages from the backend and display them as cards.

4. Filter and Refresh:
- Use a dropdown to filter cards by recipient names.
- Create a refresh button to fetch the latest data.

## Testing with Storybook:
1. Initialize Storybook:

```
- npx storybook init
```

2. Add stories for components like `MessageComponent` and `Card`.

# Deployment
Use webpack for building both frontend and backend apps.
Deploy using services like Vercel (frontend) and Render (backend).
Would you like me to create the starter code for this project?