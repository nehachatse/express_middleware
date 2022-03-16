const express = require('express');
const { use } = require('express/lib/application');
const users = require("./MOCK_DATA.json");

let app = express();

function logger(userName){
    return apiUSer = (req, res, next) =>{
        req.api_user = userName;
        next()
    }
}
app.use(express.json() )
app.use(logger("Neha"))

app.get('/', (req, res) => {
    res.json({
        "API requested by": req.api_user,
        "Books": users 
    });
})

app.get('/books/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find( (user) => user.id == id);
    console.log(user, id)
    res.json({
        "API requested by": req.api_user,
        "Books": user 
    });
})

app.post('/books', (req, res) => {
    users.push(req.body);
    res.json({
        "API requested by": req.api_user,
        "Books": req.body
    });
})

app.patch('/books/:id', (req, res) => {
    const {id} = req.params;
    const {author, published_year} = req.body;

    const user = users.find( (user) => user.id == id)
    user.author = author;
    user.published_year = published_year;
    res.json({
        "API requested by": req.api_user,
        "Books": user
    });
})

app.delete('/books/:id', (req, res) => {
    const {id} = req.params;

    const newUsers = users.filter( (user) => user.id != id);
    res.json({
        "API requested by": req.api_user,
        "Books": newUsers
    });
})
app.listen(8000, () => {
    console.log('listing')
})