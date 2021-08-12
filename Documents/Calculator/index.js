const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const calculator = require('./calculator');

const app = express();

app.use(express.json()); 
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render('index');
})

app.post('/answer',(req, res) => {
    
    console.log(req.body);
    const operation = (req.body.operation);
    const a = (req.body.number1);
    const b = (req.body.number2);

    
    if(operation === 'add'){
        const Calculate = new calculator(+a, +b);
        const answer = Calculate.add();
      return  res.render('answer', {solution: {result: answer}});

    }else if(operation === 'product'){
        const Calculate = new calculator(+a, +b);
        const answer = Calculate.product();
      return  res.render('answer', {solution: {result: answer}});
    }
   
});

app.listen(3000, () => {
    console.log('Server running...');
})