var connect = require("connect");
var logger = require("connect-logger");
var serveStatic = require("serve-static");

var app = connect();

app.use(logger());
app.use(serveStatic(".", { index: "SpecRunner.html" }));

app.listen(8080);