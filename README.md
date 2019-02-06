# Lightning Donate Plugin

A Node.js server for safely generating Bitcoin Lightining Network invoices in QR code or text format without exposing your node's LND REST service. No frontend logic required to create the codes, simply add an image tag with the desired parameters onto your web page. The text format can be copied to the user's clipboard using an iframe.

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

// Request 500 satoshi with memo 'Beer'
<iframe src="http://YOUR_URL/ln/text/500/Beer" width="300" height="40" frameBorder="0">Browser not compatible.</iframe>

```

![iframe example](http://brndnhrbrt.github.io/img/iframe.example.png)

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

You must copy and paste the output of this command into your config file

```
xxd -ps -u -c 1000 PATH_TO_MACAROON/admin.macaroon
```

### Using Lightning Donate Plugin

Serve as image:
```
// Preset amount
<img src="YOUR_URL_HERE">

// Custom amount via URL parameters
<img src="http://YOUR_URL_HERE/ln/AMOUNT/MESSAGE">

```

Serve as text:

```
// Preset amount
<iframe src="http://YOUR_URL_HERE/ln/text" width="300" height="40" frameBorder="0">Browser not compatible.</iframe>

// Custom
<iframe src="http://YOUR_URL_HERE/ln/text/AMOUNT/MESSAGE" width="300" height="40" frameBorder="0">Browser not compatible.</iframe>

```

Results:

[Preset amount image](http://btarpbits.com:3000/)  |  [Custom amount image via URL parameters](http://btarpbits.com:3000/ln/500/Hello%20world!)

[Preset amount iframe](http://btarpbits.com:3000/ln/text)  |  [Custom amount iframe via URL parameters](http://btarpbits.com:3000/ln/text/500/Beer)

## Live Example

[http://brndnhrbrt.github.io/donate.test.html](http://brndnhrbrt.github.io/donate.test.html) - using [https://github.com/brndnhrbrt/ln-donate-frontend](https://github.com/brndnhrbrt/ln-donate-frontend)

[http://btarpbits.com:3000/ln/text/500/github](http://btarpbits.com:3000/ln/text/500/github) - text format example
