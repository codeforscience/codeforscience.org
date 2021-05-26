const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appL1ht3svKYXlL4D');

module.exports = async function() {
  return new Promise((resolve, reject) => {
    const jobs = [];

    base('Jobs')
      .select({
        view: "Website",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            // console.log(record)
            jobs.push({
              id: record._rawJson.id,
              ...record._rawJson.fields
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve(jobs);
          }
        }
      );
  });
}
