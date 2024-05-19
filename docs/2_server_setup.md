# Setup Express TypeScript application from scratch

## Step 1: Create a new directory for your project
```bash
mkdir my-express-app
cd my-express-app
```

## Step 2: Initialize a new Node.js project
```bash
npm init -y
```

## Step 3: Install Express
```bash
npm install express
```

## Step 4: Install TypeScript
```bash
npm install typescript
```

## Step 5: Initialize a new TypeScript project
```bash
npx tsc --init
```

## Step 6: Install TypeScript types for Node.js
```bash
npm install @types/node @types/express
```

## Step 7: Install ts-node
```bash
npm install ts-node
```

## Step 8: Install nodemon
```bash
npm install nodemon
```

## Step 9: Update package.json
```json
{
  "scripts": {
    "start": "nodemon --exec ts-node src/index.ts"
  }
}
```

## Step 10: Create a new directory for your source code
```bash
mkdir src
```

## Step 11: Create a new file for your Express application
```bash
touch src/index.ts
```

## Step 12: Write your Express application
```typescript

import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

```

## Step 13: Start your Express application
```bash
npm start
```

## Step 14: Open http://localhost:3000 in your browser


## Step 15: Add type "module" to package.json
```json
{
  "type": "module"
}
```

## Step 16: support CORS
```bash
npm install cors
app.use(cors());
```

