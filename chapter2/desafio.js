var http = require('http');
var url = require('url');
var fs = require('fs');

var fullPath = function(file){
	return __dirname+'/'+file;
}

var router = function(path){
	if (path && path != '/')
	{
		var file = fullPath(path+'.html');
		if (fs.existsSync(file)){
			return file;
		}
		return fullPath("erro.html");
	}
	return fullPath("artigos.html");
}

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	var result = url.parse(request.url, true);
	var file = router(result.pathname);
	fs.readFile(file, function(erro, html){
		response.writeHeader(200, {'Content-Type': 'text/html'});
		response.end(html);
	});
	
});
server.listen(3000, function(){
	console.log('Servidor http.');	
});