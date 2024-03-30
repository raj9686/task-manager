---

# Next.js Project

This is a Next.js project bootstrapped with `create-next-app`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

---

## NestJS Task Manager

This repository contains the backend and frontend implementations for a task manager application built with NestJS and React. The backend provides a robust and scalable API for managing tasks, while the frontend provides a user-friendly interface for interacting with the API.

### Technologies Used

#### Backend (`BE`)

- NestJS
- MongoDB (with Mongoose)

#### Frontend (`FE`)

- React
- TypeScript
- Ant Design

### Features

#### Backend (`BE`)

- Create, read, update, and delete tasks

#### Frontend (`FE`)

- View tasks
- Create new tasks
- Update existing tasks
- Delete tasks

### Getting Started

#### Backend (`BE`)

To get started with the backend, clone the repository and install the dependencies using npm:

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager/BE
npm install
```

Next, create a `.env` file in the `BE` directory with the following environment variables:

```plaintext
PORT=3000
MONGODB_URI=your-mongodb-connection-string
```

Replace `your-mongodb-connection-string` with your MongoDB connection string.

Finally, start the backend server using:

```bash
npm run start:dev
```

#### Frontend (`FE`)

To get started with the frontend, navigate to the `FE` directory and install the dependencies using npm:

```bash
cd ../FE
npm install
```

Next, create a `.env` file in the `FE` directory with the following environment variables:

```plaintext
REACT_APP_API_URL=http://localhost:3000/api
```

Replace `http://localhost:3000/api` with the URL of your backend API.

Finally, start the frontend server using:

```bash
npm start
```

### Contribution

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

---

This README provides information on how to get started with both the Next.js project and the NestJS Task Manager, including how to run the development servers and make changes to the code.
