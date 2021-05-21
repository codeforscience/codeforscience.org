require("dotenv").config();

const ghostContentAPI = require("@tryghost/content-api");
const globals = require('./globals.json')

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v2"
});

// Get all site information
module.exports = async function() {
  const siteData = await api.settings
    .browse({
      include: "icon,url"
    })
    .catch(err => {
      console.error(err);
    });

  if (process.env.SITE_URL) siteData.url = process.env.SITE_URL;

  // FIX: this shouldn't have changed new ghost API, wtf
  if (siteData.ghost_head && !siteData.codeinjection_head) {
    siteData.codeinjection_head = siteData.ghost_head
    siteData.codeinjection_foot = siteData.ghost_foot
  }

  return Object.assign({
    "rootUrl" : "https://codeforscience.org",
    "buildTime" : new Date()
  }, siteData, globals);
};
