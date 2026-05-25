const cors = require('cors');
const express = require('express');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        key: 'Hello World!',
    });
});

app.get('/employees', (req, res) => {
    const employees = JSON.parse(fs.readFileSync('employees.json', 'utf-8'));
    res.status(200).json(employees); 
});

app.delete('/employee/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('employees.json', 'utf-8'));
    const id = req.params.id;

    const initialLength = data.employees.length;
    
    data.employees = data.employees.filter(employee => employee.id != id);

    if (data.employees.length < initialLength) {
        fs.writeFileSync('employees.json', JSON.stringify(data, null, 4));
        res.status(200).json({"message": "Pracownik usunięty pomyślnie"});
    } else {
        res.status(404).json({"message": "Pracownik nie znaleziony"});
    }
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});