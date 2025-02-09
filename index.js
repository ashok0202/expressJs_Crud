const {Client}=require('pg');
const express=require('express');
const app=express();
app.use(express.json());

const port = 3000;
require('dotenv').config();
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME
});

client.connect();

const allEmployees = () => {
    return new Promise((resolve, reject) => {
        client.query('SELECT * FROM employee', (err, res) => {
            if (!err) {
                resolve(res.rows);
            } else {
                reject(err);
            }
        });
    });
};
app.get('/allemployee',async(req,res)=>{
    try{
        const allEmploy=await allEmployees();
        res.status(200).send(allEmploy);
    }
    catch (e) {
        console.error(`Some error occurred: ${e.message}`);
        res.status(500).send({ error: "Internal Server Error" });
    }
})

app.get('/employee/:empId', async (req, res) => {
    try {
        const { empId } = req.params;
        const sqlQuery = `SELECT * FROM employee WHERE id = $1`;
        client.query(sqlQuery, [empId], (err, result) => {
            if (err) {
                console.error(`Database error: ${err.message}`);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "Employee not found" });
            }
            res.status(200).json(result.rows[0]);
        });

    } catch (e) {
        console.error(`Some error occurred: ${e.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Create a new employee
app.post('/employee', async (req, res) => {
    try {
        const { name, salary, role } = req.body;
        const result = await client.query(
            'INSERT INTO employee (name, salary, role) VALUES ($1, $2, $3) RETURNING *',
            [name, salary, role]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an employee
app.put('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, salary, role } = req.body;
        const result = await client.query(
            'UPDATE employee SET name = $1, salary = $2, role = $3 WHERE id = $4 RETURNING *',
            [name, salary, role, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an employee
app.delete('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('DELETE FROM employee WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
module.exports=app;