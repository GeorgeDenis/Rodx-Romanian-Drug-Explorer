const pool = require("../database/connection");

exports.addCampaign=async (campaignData) =>{
    const result = await pool.query(
        'INSERT INTO campaigns (title, article) VALUES ($1, $2)',
        [campaignData.title, campaignData.article]
    ).then(results => {
        return {message: "Article added successfully"};
    }).catch(error => {
        if (error.code === '23505') {
            return { message: "The article already exists" };
        } 
       else 
       { return 
        {message: "Server Error"};
    }
    });
    return result;   
}

exports.getAllCampaigns = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM campaigns'
        );

        return { campaigns: result.rows, message: "Campaigns fetched successfully" };
    } catch (error) {
        console.log(error);  // You can log the error for debugging purposes
        return { message: "Server Error" };
    }
}