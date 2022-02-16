const fs = require("fs");
const path = require("path");
const https = require("https");
const fetch = import("node-fetch");

const options = {
    cert: fs.readFileSync(
        path.resolve(process.env.CHIA_SSL_DIR, "./private_wallet.crt"),
        "utf-8"
    ),
    key: fs.readFileSync(
        path.resolve(process.env.CHIA_SSL_DIR, "./private_wallet.key"),
        "utf-8"
    ),
    rejectUnauthorized: false,
};

const sslConfiguredAgent = new https.Agent(options);

const getOfferSummary = async (offer) => {
  const f = await fetch;
  const summary = await f.default(
    `${process.env.WALLET_RPC_HOST}/get_offer_summary`,
    {
      method: "post",
      body: JSON.stringify({ offer }),
      headers: { "Content-Type": "application/json" },
      agent: sslConfiguredAgent,
    }
  );
  return await summary.json();
};
module.exports.getOfferSummary = getOfferSummary;

const getOfferValidity = async (offer) => {
  const f = await fetch;
  const summary = await f.default(
    `${process.env.WALLET_RPC_HOST}/check_offer_validity`,
    {
      method: "post",
      body: JSON.stringify({ offer }),
      headers: { "Content-Type": "application/json" },
      agent: sslConfiguredAgent,
    }
  );
  return await summary.json();
};
module.exports.getOfferValidity = getOfferValidity;

const createOffer = async (offer, fee, validate_only) => {
  const f = await fetch;
  const summary = await f.default(
    `${process.env.WALLET_RPC_HOST}/create_offer_for_ids`,
    {
      method: "post",
      body: JSON.stringify({ offer }),
      headers: { "Content-Type": "application/json" },
      agent: sslConfiguredAgent,
    }
  );
  return await summary.json();
}
module.exports.createOffer = createOffer;