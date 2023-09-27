require('dotenv').config()
const express = require('express'),
  server = require('./server'),
  app = express()

server(3000)