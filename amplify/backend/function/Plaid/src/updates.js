// The following code is not yet integrated
// However it may be added for further functionality in the future


// 1 - Account Holdings / Investment
app.get('/api/holdings', function (request, response, next) {
    client.getHoldings(ACCESS_TOKEN, function (error, holdingsResponse) {
        if (error != null) {
            prettyPrintResponse(error);
            return response.json({
                error,
            });
        }
        prettyPrintResponse(holdingsResponse);
        response.json({ error: null, holdings: holdingsResponse });
    });
});


// 2 - Investment Transactions
app.get('/api/investment_transactions', function (request, response, next) {
    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    client.getInvestmentTransactions(ACCESS_TOKEN, startDate, endDate, function (
        error,
        investmentTransactionsResponse,
    ) {
        if (error != null) {
            prettyPrintResponse(error);
            return response.json({
                error,
            });
        }
        prettyPrintResponse(investmentTransactionsResponse);
        response.json({
            error: null,
            investment_transactions: investmentTransactionsResponse,
        });
    });
});