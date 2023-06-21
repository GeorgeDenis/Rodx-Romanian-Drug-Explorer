const pool = require("../database/connection");
const { getFile } = require("./s3Services");
exports.addCampaign = async (campaignData) => {
  const result = await pool
    .query("INSERT INTO campaigns (title, article,image) VALUES ($1, $2,$3)", [
      campaignData.title,
      campaignData.article,
      campaignData.img,
    ])
    .then((results) => {
      return { message: "Article added successfully" };
    })
    .catch((error) => {
      if (error.code === "23505") {
        return { message: "The article already exists" };
      } else {
        return { message: "Server Error" };
      }
    });
  return result;
};

exports.getAllCampaigns = async () => {
  try {
    const result = await pool.query("SELECT * FROM campaigns");
    const campaigns = await Promise.all(
      result.rows.map(async (campaign) => {
        const url = await getFile(campaign.image);
        return {
          ...campaign,
          image: url,
        };
      })
    );

    return {
      campaigns,
      message: "Campaigns fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return { message: "Server Error" };
  }
};

exports.deleteCampaignByTitle = async (title) => {
  return await pool
    .query("DELETE FROM campaigns WHERE title = $1", [title])
    .then((results) => {
      if (results.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};