# Full-Stack project to pass X-Partners test project

## Configure Backend

Create .env file and add there

```env
PORT=3000
DB_URL=mongodb+srv://root:root@cluster0.vwiikcy.mongodb.net/?retryWrites=true&w=majority
JWT_ACCESS_SECRET="jwt-really-secret-key"
JWT_REFRESH_SECRET="jwt-refresh-really-secret-key"
CLIENT_URL="http://localhost:5173"
```

## Run Backend

```bash
cd server
npm i
npm run dev
```

## Run Frontend

```bash
cd client
npm i
npm run dev
```
