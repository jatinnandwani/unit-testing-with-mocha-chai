const { request, response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const utils = require('./utils/task-schema.js')
const extract = require('./data.json')

const port = process.env.PORT || 4000;
module.exports = app.listen(port,() => console.log(`LISTENING ON PORT ${port}`))

// SAMPLE GET API

app.get("/api/tasks", (request,response) => {
    response.status(200).send(extract);
})

// Filter by ID
app.get("/api/tasks/:id", (request,response) => {
    const id = request.params.id
    const filtered = extract.find(extract => extract.id === parseInt(id));
    if(!filtered) return response.status(404).send("No Data Found With This Id")
    response.send(filtered);
});

// POST
app.post("/api/tasks", (request,response) => {
    const { error } = utils.validateTask(request.body)
    if(error){
        return response.status(400).send({ "test" : "12" ,"ERROR" : error.details[0].message})
    }
    const new_object = {
        id: extract.length + 1,
        user_name: request.body.user_name,
        user_password: request.body.user_password,
        is_permamnent_employee: request.body.is_permamnent_employee
    };
    extract.push(new_object);
    response.send(new_object);
});

// PUT
app.put("/api/tasks/:id", (request, response) => {
    const taskId = request.params.id;
    const task = extract.find( extract => extract.id === parseInt(taskId));
    if(!task) return response.status(404).send("The Id provided does not exist")
    const { error } = utils.validateTask(request.body);
    if(error){
        return response.status(400).send({ "test" : "12" ,"ERROR" : error.details[0].message})
    }
    task.name = request.body.user_name;
    task.user_password = request.body.user_password;
    task.completed = request.body.is_permamnent_employee;
    response.send(task)
});

// DELETE 
app.delete("/api/tasks/:id",(request, response) => {
    const taskId = request.params.id;
    const task = extract.find( extract => extract.id === parseInt(taskId));
    if(!task) return response.status(404).send("The Id provided does not exist")
    const index = extract.indexOf(task)
    extract.slice(index,1);
    response.send(extract);
})