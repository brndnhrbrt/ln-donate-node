const request = require('request');
const config = require('./config');

exports.createInvoice = function(requestAmount, requestMemo) {

    const promise = new Promise((resolve, reject) => {

        const requestOptions = {
            url: `${config.lndHost}/v1/invoices`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Grpc-Metadata-macaroon': config.macaroon
            },
            rejectUnauthorized: false,
            body: JSON.stringify({
                "private": false,
                "memo": requestMemo ,
                "value": requestAmount
            })
        };
        
        request.post(requestOptions, (error, response, body) => {   
            if(error) {
                reject(error);
            } else if(body) {
                resolve(body);
            } else {
                reject('Something went wrong');
            }         
        });

    });

    return promise;

}

exports.sendImage = function(res, imageString) {
    var img = new Buffer(imageString.split(',')[1], 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length 
    });
    res.end(img);
}