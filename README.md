# Employee Management API

This is a REST API built using **Node.js**, **Express**, and **PostgreSQL** for managing employee records. The API supports CRUD operations and is implemented using Promises for better asynchronous handling.

## 🚀 Features
- Fetch employees with **more than 5 years of experience**
- **Create, Update, and Delete** employee records
- PostgreSQL database integration using `pg`
- Secure configuration using `.env`
- Optimized queries with `RETURNING *` for efficient data retrieval

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Environment Variables**: dotenv

## 📌 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/ashok0202/expressJs_Crud.git
   
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```sh
   DB_HOST=localhost
   DB_USER=<DatabaseName> like postgres
   DB_PORT=<portNo>
   DB_PASSWORD=<databasePassword>
   DB_NAME=<DatabaseName>  store Name
   PORT=3000
   ```

4. **Start the server**
   ```sh
   node index.js
   ```
   The server will run on **http://localhost:3000**.

## 📌 API Endpoints

### 1️⃣ Fetch Employees with More Than 5 Years of Experience
```http
GET /employees/experience
```

### 2️⃣ Create a New Employee
```http
POST /employee
```
**Body:**
```json
{
  "name": "John Doe",
  "salary": 50000,
  "role": "Software Engineer"
}
```

### 3️⃣ Update an Employee
```http
PUT /employee/:id
```
**Body:**
```json
{
  "name": "Updated Name",
  "salary": 60000,
  "role": "Senior Engineer"
}
```

### 4️⃣ Delete an Employee
```http
DELETE /employee/:id
```

## 📌 Contributions
Feel free to fork this repository and submit a pull request with improvements! 😊

## 📌 License
This project is **open-source** 

---


