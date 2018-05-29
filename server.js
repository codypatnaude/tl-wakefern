// Get dependencies
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const graphqlHTTP = require('express-graphql');
const createTeacherlistsSchema = require('./server/TeacherlistsSchema');
const createTeacherlistsRoutes = require('./server/routes');


const config = require('./config.js');

const teacherlistsSchema = createTeacherlistsSchema(config);
const teacherlistsRoutes = createTeacherlistsRoutes(config, teacherlistsSchema);

const httpsOptions = {
  key: fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert),
  requestCert: false,
  rejectUnauthorized: false
};

const app = express();

app.use(helmet())
app.use(cookieParser('Sup3r+53cRe_t'));
app.use(cookieSession({name: 'tl-int', secret: 'C4nt_G3T+ME!'}))

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Expose graphql server
app.use('/api/query', graphqlHTTP({
  schema: teacherlistsSchema
}));

// Expose graphiql for testing
app.use('/api/querytest', graphqlHTTP({
  schema: teacherlistsSchema,
  graphiql: true
}));

// Point API to tl router
app.use('/api', teacherlistsRoutes);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);
const server = https.createServer(httpsOptions, app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));