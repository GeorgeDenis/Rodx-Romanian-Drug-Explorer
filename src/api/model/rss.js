const pool = require("../database/connection");
const RSS = require("rss");
const { getFile } = require("./s3Services");

exports.generateRSS = async () => {
  const feed = new RSS({
    title: "Rodx RSS feed",
    description: "Campanii pentru prevenirea consumului de droguri",
    feed_url: `http://localhost:3000/rss`,
    site_url: "http://localhost:3000",
    language: "en",
  });

  const campaingResult = await pool.query("SELECT * FROM campaigns");
  for (const row of campaingResult.rows) {
    const url = await getFile(row.image);
    feed.item({
      title: row.title,
      description: row.article,
      url: url,
      guid: row.id,
      date: row.date,
      enclosure: {
        url,
        type: "image/jpeg",
      },
    });
  }
  return feed.xml({ indent: true });
};
