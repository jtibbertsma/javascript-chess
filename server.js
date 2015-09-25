var connect = require("connect");
var logger = require("connect-logger");
var serveStatic = require("serve-static");

var app = connect();

app.use(logger());
app.use(serveStatic("public"));

app.listen(process.env.PORT || 5000);