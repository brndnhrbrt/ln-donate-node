# Lightning Donate Plugin

A Node.js server for safely generating Bitcoin Lightining Network invoices in QR code format.

## Getting Started

```
git clone https://github.com/brndnhrbrt/ln-donate-node.git
cd ./ln-donate-node
npm install

// create config file

npm start
```

### Requirements

1. Your node must running lighting with LND
2. The node's REST service must be enabled
3. The app server must be able to connect to your node's REST service

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
<img src="http://btarpbits.com:3000/">
```

Result:

![Sample donate code](http://btarpbits.com:3000/)