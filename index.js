const logger = require('morgan');
const express = require('express');
const QRCode = require('qrcode');
const app = express();

const config = require('./config');
const lndService = require('./lnd.service');

app.use(logger('dev'));

app.get('*', (req, res) => {
    lndService.createInvoice()
        .then(response => {
            try {
                var txData = JSON.parse(response);
                if(!txData.payment_request) throw 'ERROR';                
            } catch {
                return res.send('ERROR');
            }
            QRCode.toDataURL(txData.payment_request, (err, url) => {
                if(err || !url) {
                    res.send('ERROR');
                } else {
                    var img = new Buffer(url.split(',')[1], 'base64');
                    res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': img.length 
                    });
                    res.end(img);
                }
            });
        }, err => {
            res.send('ERROR');
        });
});

app.listen(config.port);
console.log(`App is running on port ${config.port}`);