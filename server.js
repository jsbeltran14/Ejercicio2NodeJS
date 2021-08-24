const http = require('http');
const axios = require('axios');
var form = require('fs').readFileSync('./index.html',{encoding:'utf8',flag:'r'});
var form2 = require('fs').readFileSync('./index2.html',{encoding:'utf8',flag:'r'});

async function getDataFromAnotherServer(servicio){
    const resp = await axios.get(servicio);
    console.log(resp.data);
    return resp.data;
}

http.createServer(async function(req,res){

    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log(req.url)
    if(req.url==='/api/clientes'){
        const anotherWebPage = await getDataFromAnotherServer('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
        res.end(form2 + anotherWebPage);
    }
    else if(req.url==='/api/proveedores'){

        const anotherWebPage = await getDataFromAnotherServer('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
       
        res.end(form + anotherWebPage);
    }


    
}).listen(8081);