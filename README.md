# Lightning Donate Plugin

A Node.js server for safely generating Bitcoin Lightining Network invoices in QR code format without exposing your node's LND REST service.

## Getting Started

```
git clone https://github.com/brndnhrbrt/ln-donate-node.git
cd ./ln-donate-node
npm install

// create config file

npm start
```

### Requirements

1. Your node must be running lighting with LND
2. The node's LND REST service must be enabled
3. The app server must be able to connect to your node's LND REST service

### Creating the config file

```
// Sample config

module.exports = {
    macaroon: '<insert your macaroon in string format here>',
    lndHost: '<insert your LND ip here>:<insert your LND REST port here>',
    port: process.env.PORT || 3000,
    requestAmount: 100,
    memo: 'Thanks for donating!',
    errorImage: '<see sample config>'
};

```

#### Getting the macaroon

You must copy and past the output of this command into your config file

```
xxd -ps -u -c 1000 PATH_TO_MACAROON/admin.macaroon
```

### Using Lightning Donate Plugin

Serve as image:
```
<img src="YOUR_URL_HERE">
```

Example:

```
// request the default amount
<img src="http://btarpbits.com:3000/">

// request a custom amount
<img src="http://btarpbits.com:3000/ln/AMOUNT/MESSAGE">
<img src="http://btarpbits.com:3000/ln/500/Hello%20world!">
```

Results:

[http://brndnhrbrt.github.io/donate.test.html](http://brndnhrbrt.github.io/donate.test.html)



Sample:

![Sample donate code](https://i.imgur.com/XHT9SAK.png)
