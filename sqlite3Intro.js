const {Database} =require('sqlite3').verbose();
const errorHandler = (err)=>{
    if (err){
        console.log(`Msg: ${err}`);
    }
}
const db = new Database('example.sqlite',()=>{
    console.log('Connected');
});

db.run("CREATE TABLE IF NOT EXISTS employess(id INT, first TEXT, last TEXT)");

db.run("INSERT INTO employees(id, first , last) VALUES (1, 'Michael', 'Scott')");
db.run("INSERT INTO employees VALUES(2, 'JIM', 'Halpert')", errorHandler);

const employeeArray = [
    {id: 3, firstName: 'Dwight', lastName: 'Schrute'},
    {id: 4, firstName: 'Andy', lastName: 'Bernard'},
    {id: 5, firstName: 'Pam', lastName: 'Beesly'}
]

employeeArray.forEach((obj)=>{
    db.run(`INSERT INTO employess VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}')`);
})

db.all("SELECT * FROM employees", (err, allRows)=>{
    allRows.forEach(each=>{
        console.log(each.id, each.first + ' ' + each.last);
    })
})
db.close(err=>{
    errorHandler(err);
    console.log('Database closed');
})

