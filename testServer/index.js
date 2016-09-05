var path = require('path');
var express = require('express');
// var bodyParser = require('body-parser');
var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

app.set('port', 3002);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
})

const questions = [
  {
    question: "好きな食べ物は何ですか？",
    answers:["カレー", "うどん", "寿司"]
  },
  {
    question: "好きな動物は何ですか？",
    answers:["犬", "猫", "鳥"]
  },
]
app.get('/api/interview', function(req, res){
  const q_num = req.query.q_num;
  if(q_num <= questions.length){
    res.json(questions[q_num-1]);
  }
  else{
    res.json({})
  }
});

app.get('/api/diagnosis', function(req, res){
  var texts = req.query.user_answer_values;
  var data = {}
  data.result_text = "ずばり！　あなたは"+texts.join("と") +"が好きな人です！"
  res.json(data);  
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
