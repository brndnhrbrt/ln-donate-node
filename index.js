const logger = require('morgan');
const express = require('express');
const QRCode = require('qrcode');
const app = express();

const config = require('./config');
const lndService = require('./lnd.service');

app.use(logger('dev'));

app.get('/ln/:amount/:message', (req, res) => {

    var amount = req.params.amount;
    var message = req.params.message;

    if(!amount || !message || isNaN(amount)) lndService.sendImage(res, config.errorImage);
    else {
        amount = parseInt(amount);
        amount = Math.abs(amount);
        if(message.length > 50) {
            message = message.slice(0, 50);
        }

        lndService.createInvoice(amount, message)
            .then(response => {
                try {
                    var txData = JSON.parse(response);
                    if(!txData.payment_request) throw 'ERROR';
                } catch(err) {
                    return lndService.sendImage(res, config.errorImage);
                }
                QRCode.toDataURL(txData.payment_request, (err, url) => {
                    if(err || !url) {
                        lndService.sendImage(res, config.errorImage);
                    } else {
                        lndService.sendImage(res, url);
                    }
                });
            }, err => {            
                lndService.sendImage(res, config.errorImage);
            });
    }

});

app.get('*', (req, res) => {
    lndService.createInvoice(config.requestAmount, config.memo)
        .then(response => {
            try {
                var txData = JSON.parse(response);
                if(!txData.payment_request) throw 'ERROR';
            } catch(err) {
                return lndService.sendImage(res, config.errorImage);
            }
            QRCode.toDataURL(txData.payment_request, (err, url) => {
                if(err || !url) {
                    lndService.sendImage(res, config.errorImage);
                } else {
                    lndService.sendImage(res, url);
                }
            });
        }, err => {            
            lndService.sendImage(res, config.errorImage);
        });
});

app.listen(config.port);
console.log(`App is running on port ${config.port}`);