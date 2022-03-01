const fetch = import('node-fetch');

const getMarkets = async () => {
	const f = await fetch;
	const results = await f.default(
		`${process.env.HASHGREEN_API_URL}/markets`,
		{
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
		},
	);
	return await results.json();
};
module.exports.getMarkets = getMarkets;

const getOrderBook = async (market_id) => {
	const params = new URLSearchParams({ 'market_id': market_id });
	const f = await fetch;
	const results = await f.default(
		`${process.env.HASHGREEN_API_URL}/trades/book?${params}`,
		{
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
		},
	);
	return await results.json();
};
module.exports.getOrderBook = getOrderBook;

const getTradeStatistics = async (market_id) => {
	const params = new URLSearchParams({ 'market_id': market_id });
	const f = await fetch;
	const results = await f.default(
		`${process.env.HASHGREEN_API_URL}/trades/statistics?${params}`,
		{
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
		},
	);
	return await results.json();
};
module.exports.getTradeStatistics = getTradeStatistics;

const getMyOrders = async (market_id) => {
	const params = new URLSearchParams({ 'market_id': market_id });
	const f = await fetch;
	const results = await f.default(
		`${process.env.HASHGREEN_API_URL}/orders?${params}`,
		{
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.HASHGREEN_API_TOKEN}`,
			},
		},
	);
	return await results.json();
};
module.exports.getMyOrders = getMyOrders;

const uploadMyOrder = async (offer) => {
	const f = await fetch;
	const results = await f.default(
		`${process.env.HASHGREEN_API_URL}/orders`,
		{
			method: 'post',
			body: new URLSearchParams({
				'offer': offer,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Authorization': `Bearer ${process.env.HASHGREEN_API_TOKEN}`,
			},
		},
	);
	return await results.json();
};
module.exports.uploadMyOrder = uploadMyOrder;

const cancelMyOrder = async (order_id) => {
	const f = await fetch;
	const results = await f.default(
		`${process.env.HASHGREEN_API_URL}/orders/${order_id}`,
		{
			method: 'delete',
			headers: {
				'Authorization': `Bearer ${process.env.HASHGREEN_API_TOKEN}`,
			},
		},
	);
	return await results.json();
};
module.exports.cancelMyOrder = cancelMyOrder;