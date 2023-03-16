const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
			fs = require('file-system'),
			dbFilePath = 'locations.json',
			path = require('path'),
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/VitebskRegion', (req, res) => res.send(getInfoFromDB()));
app.get('/api/Calendar', (req, res) => res.send(getInfoFromDB()));
app.get('/api/userAccount', (req, res) => res.send(getInfoFromDB()));

function getInfoFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

app.listen(3000, () => console.log('Server has been started...'));
