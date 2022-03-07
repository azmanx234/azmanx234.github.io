var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

function makeHTMLPage(s)
    {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>DMS 321 nodejs demo</title>
</head>
<body>
${s}
</body>
</html>
`;
    }

app.get('/', function (req, res) {
   res.send('Hello World, from express');
});




function choose(list)
    {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
    }

app.get('/rps/:choice', function (req, res) {
    var human = req.params.choice;
    var robot = choose(['rock', 'paper', 'scissors']);
    var output = `<p>You chose ${human}</p><p>I chose ${robot}</p>`;
    if (human == robot)
        output += '<p>It\'s a tie</p>';
    else if ((human == 'rock') && (robot == 'scissors'))
        output += '<p>You win!</p>';
    else if ((human == 'paper') && (robot == 'rock'))
        output += '<p>You win!</p>';
    else if ((human == 'scissors') && (robot == 'paper'))
        output += '<p>You win!</p>';
    else
        output += '<p>I win!</p>';
    output += '<p><a href="/rps.html">Play again?</a></p>';
    res.set('Cache-Control','no-store');
    res.send(makeHTMLPage(output));
});





var blogposts = [ ];

app.get('/blog', function (req,res) {
    var output = '<h1>The Blog</h1>\n';
    for (i=0; i < blogposts.length; i++)
        {
        output += `<div><h2>${blogposts[i].title}</h2><p>posted by ${blogposts[i].name} on ${blogposts[i].date}</p><p>message type: ${blogposts[i].type}</p><p>${blogposts[i].body}</p></div>\n`;
        }
    res.send(makeHTMLPage(output));
});

app.post('/blogpost', urlencodedParser, function (req, res) {
    var newpost = { 'title': req.body.title, 'name': req.body.name, 'date': Date(), 'type': req.body.messagetype, 'body': req.body.message };
    blogposts.push(newpost);
    res.redirect('/blog');
});


var dolist = [ ];

app.get('/dolist', function (req,res) {
    var output = '<h1>To Do List</h1>\n';
    for (i=0; i < dolist.length; i++)
        {
        output += `<div><h2>${dolist[i].title}</h2><p> ${dolist[i].description} <p> ${dolist[i].link}</div>\n`;
        }
    res.send(makeHTMLPage(output));
});

app.post('/submitform', urlencodedParser, function (req, res) {
    var newpost = { title: req.body.title, description: req.body.details, link: req.body.link };
    dolist.push(newpost);
    res.redirect('/dolist');
});



var server = app.listen(8081, function () {});
