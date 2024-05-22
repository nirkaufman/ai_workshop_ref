# Setup PRISMA 

## Before we start
- consider splitting the index to routes
- each route folder can hold the service and the controller
- the service can hold the business logic
- the controller can hold the request and response logic

## Install dependencies on the backend

```bash
  npm i @prisma/client
  npm i -D prisma
```

## Crate a `prisma` folder in the root of the project

```bash
  mkdir prisma
```

## Create a `schema.prisma` file in the `prisma` folder

```bash
  touch prisma/schema.prisma
```

## Add the following code to the `schema.prisma` file

```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Candidates {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name     String
  bio      String
  skiils   String  
}
```

## Run to create the database

```bash
  npx prisma migrate dev --name init
```

## Run prisma studio to view the database

```bash
  npx prisma studio
```

## Add one record manually to the database

- type in a candidate name, bio and skills


## Create an endpoint to get all candidates
```typescript

app.get('/can', async (req, res) => {
    const candidate:Candidate[] = await prisma.candidate.findMany();
    res.send(candidate);
});
```

- note that types generate automatically from prism client!

