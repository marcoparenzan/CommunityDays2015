/*
 * GET home page.
 */
import express = require('express');

export function dataEntry1(req: express.Request, res: express.Response) {
    var session: any = req.session;
    if (req.method === "GET") {
        var viewModel: any = {
            computerName: process.env.COMPUTERNAME
        };
        res.render('dataEntry1', viewModel);
    }
    else if (req.method == "POST") {
        session.nome = req.body.nome;
        res.redirect("dataEntry2");
    }
};

export function dataEntry2(req: express.Request, res: express.Response) {
    var session: any = req.session;
    if (req.method === "GET") {
        var viewModel: any = {
            nome: session.nome
            ,
            computerName: process.env.COMPUTERNAME
        };
        res.render('dataEntry2', viewModel);
    }
    else if (req.method == "POST") {
        session.indirizzo = req.body.indirizzo;

        var guid = require("guid");

        var fs = require('fs');
        var path: string = process.env.HOME + "\\data";
        //var path: string = "C:\\temp";
        path = path + "\\" + "dataentry";
        // if (!fs.exists(path)) fs.mkdir(path);
        var filename: string = path + "\\" + guid.raw() + ".csv";
        fs.writeFile(filename, (new Date()).toISOString() + ";" + session.nome + ";" + session.indirizzo, function () { });

        res.redirect("dataEntry1");
    }
};
