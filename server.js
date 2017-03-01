
var express = require("express");
var app = express();

var path = require('path');

var fs = require('fs');

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());

app.use(express.static('public'));

// route pour index.html
app.get('/', function(request, response){
	response.sendFile(path.join(__dirname + '/public/index.html'));
});

// route pour le fichier json des animaux
app.get('/article', function(req, res){
	res.sendFile(path.join(__dirname + '/data/blog.json'));
});

// route pour la page qui affiche les animaux
app.get('/show/article', function(req, res){
	res.sendFile(path.join(__dirname + '/public/pages/blog.html'));
});

// route pour poster les nouveaux animaux
app.post('/post/article', function(req, res){
	// chemin du fichier json
	var file = path.join(__dirname + '/data/blog.json')
	// Lecture du fichier json
	fs.readFile(file, 'utf8', function(err, data){
		// si il y à un erreure affiche la !
		if(err){
			console.log(err);
		}
		// variable qui contient la data qui est tranformer en json
		var doc = JSON.parse(data);
		// on push dans le tableaux animaux la requête qu'on reçoit dans le formulaire
		doc.article.push(req.body);
		// on transforme la variable doc en string
		var stringDoc = JSON.stringify(doc, null, 2);
		// Ré-écriture du fichier avec les nouvelle donnée
		fs.writeFile(file, stringDoc, function(err){
			// si il y à un erreure affiche la 
			if(err){
				console.log(err);
			}
		});
	});
	// redirige vers hom
	res.redirect('/show/article');
});
// écoute le port 1337
app.listen(1337, function(){
	console.log('Work !');
})