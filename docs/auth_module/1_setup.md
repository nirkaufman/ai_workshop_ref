# Auth setup

## Use Auth0 for authentication
- ref: https://auth0.com/docs/quickstart/spa/angular/01-login

## 1. Install the packages

```bash
    npm i bcryptjs
    npm i jsonwebtoken
```

## Create a user model in prisma.schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
}
```

## Run the migration

```bash
    npx prisma migrate dev --name add-user-model
```
