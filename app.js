const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express()
	
	.use(express.static('dist'))

	.get('/', (req, res)=> {
		res.sendFile(path.join(__dirname + '/dist/index.html'));
	})

	.listen(PORT, ()=> {
		console.log('App listening on port ' + PORT);
	})