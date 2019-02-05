# Lightning Donate Plugin

A Node.js server for safely generating Bitcoin Lightining Network invoices in QR code format without exposing your node's LND REST service. No frontend logic required to create the codes, simply add an image tag with the desired parameters onto your web page. You can also generate an invoice string that can be copied to the user's clipboard using an iframe.

image tag
```
// Preset amount
<img src="http://YOUR_URL/">

// Custom
<img src="http://YOUR_URL/ln/REQUEST_AMOUNT/MESSAGE">

```

iframe tag
```
// Preset amount
<iframe src="http://YOUR_URL/ln/text" width="300" height="40" frameBorder="0">Browser not compatible.</iframe>

// Custom
<iframe src="http://localhost:3000/ln/text/500/Beer" width="300" height="40" frameBorder="0">Browser not compatible.</iframe>

```

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
    minRequestAmount: 15,
    maxRequestAmount: 10000,
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
// Preset amount
<img src="http://btarpbits.com:3000/">

// Custom amount via URL
<img src="http://btarpbits.com:3000/ln/AMOUNT/MESSAGE">
<img src="http://btarpbits.com:3000/ln/500/Hello%20world!">


// Preset amount
<iframe src="http://btarpbits.com:3000/ln/text" width="300" height="40" frameBorder="0">Browser not compatible.</iframe>

// Custom
<iframe src="http://btarpbits.com:3000/ln/text/500/Beer" width="300" height="40" frameBorder="0">Browser not compatible.</iframe>

```

Results:

[Preset amount image](http://btarpbits.com:3000/)  |  [Custom amount image via URL](http://btarpbits.com:3000/ln/500/Hello%20world!)

[Preset amount iframe](http://btarpbits.com:3000/ln/text)  |  [Custom amount iframe via URL](http://btarpbits.com:3000/ln/text/500/Beer)

## Live Example

[http://brndnhrbrt.github.io/donate.test.html](http://brndnhrbrt.github.io/donate.test.html)

Uses [https://github.com/brndnhrbrt/ln-donate-frontend](https://github.com/brndnhrbrt/ln-donate-frontend)