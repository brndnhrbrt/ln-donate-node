const path = require('path');
const logger = require('morgan');
const express = require('express');
const QRCode = require('qrcode');
const app = express();

const config = require('./config');
const lndService = require('./lnd.service');

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/ln/text', (req, res) => {
    lndService.createInvoice(config.requestAmount, config.memo)
        .then(response => {
            try {
                var txData = JSON.parse(response);
                if(!txData.payment_request) throw 'Error generating transaction';
            } catch(err) {
                res.render('text', { message: 'Error generating transaction' });
                return lndService.sendImage(res, config.errorImage);
            }
            res.render('text', { message: txData.payment_request });
        }, err => {            
            res.render('text', { message: 'Error generating transaction' });
        });    
});

app.get('/ln/text/:amount/:message', (req, res) => {

    var amount = req.params.amount;
    var message = req.params.message;

    if(!amount || !message || isNaN(amount)) res.render('text', { message: 'Error generating transaction' });
    else {
        amount = parseInt(amount);
        amount = Math.abs(amount);

        if(amount > config.maxRequestAmount) {
            amount = config.maxRequestAmount;
        } else if(amount < config.minRequestAmount) {
            amount = config.minRequestAmount;
        }

        if(message.length > 50) {
            message = message.slice(0, 50);
        }

        lndService.createInvoice(amount, message)
        .then(response => {
            try {
                var txData = JSON.parse(response);
                if(!txData.payment_request) throw 'Error generating transaction';
            } catch(err) {
                res.render('text', { message: 'Error generating transaction' });
                return lndService.sendImage(res, config.errorImage);
            }
            res.render('text', { message: txData.payment_request });
        }, err => {            
            res.render('text', { message: 'Error generating transaction' });
        });    

    }
   
});

app.get('/ln/:amount/:message', (req, res) => {

    var amount = req.params.amount;
    var message = req.params.message;

    if(!amount || !message || isNaN(amount)) lndService.sendImage(res, config.errorImage);
    else {
        amount = parseInt(amount);
        amount = Math.abs(amount);

        if(amount > config.maxRequestAmount) {
            amount = config.maxRequestAmount;
        } else if(amount < config.minRequestAmount) {
            amount = config.minRequestAmount;
        }

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