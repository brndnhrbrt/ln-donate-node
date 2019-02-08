module.exports = {
    macaroon: '',
    lndHost: '',
    port: process.env.PORT || 3000,
    requestAmount: 100,
    minRequestAmount: 1,
    maxRequestAmount: 10000,
    memo: 'Thanks for donating!',
    errorImage: 'data:image/png;base64,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'
};