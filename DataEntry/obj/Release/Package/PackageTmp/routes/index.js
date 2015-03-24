function dataEntry1(req, res) {
    var session = req.session;
    if (req.method === "GET") {
        var viewModel = {
            computerName: process.env.COMPUTERNAME
        };
        res.render('dataEntry1', viewModel);
    } else if (req.method == "POST") {
        session.nome = req.body.nome;
        res.redirect("dataEntry2");
    }
}
exports.dataEntry1 = dataEntry1;
;

function dataEntry2(req, res) {
    var session = req.session;
    if (req.method === "GET") {
        var viewModel = {
            nome: session.nome,
            computerName: process.env.COMPUTERNAME
        };
        res.render('dataEntry2', viewModel);
    } else if (req.method == "POST") {
        session.indirizzo = req.body.indirizzo;

        var guid = require("guid");

        var fs = require('fs');
        var path = process.env.HOME + "\\data";

        //var path: string = "C:\\temp";
        path = path + "\\" + "dataentry";

        // if (!fs.exists(path)) fs.mkdir(path);
        var filename = path + "\\" + guid.raw() + ".csv";
        fs.writeFile(filename, (new Date()).toISOString() + ";" + session.nome + ";" + session.indirizzo, function () {
        });

        res.redirect("dataEntry1");
    }
}
exports.dataEntry2 = dataEntry2;
;
//# sourceMappingURL=index.js.map
