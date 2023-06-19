const catchAsync = require("../utils/catchAsync");
const { verifyToken, verifyRole } = require("../controllers/authController");
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});
const {addCampaign, getAllCampaigns} = require("../model/campaign");



const insertCampaign= catchAsync(async (req, res) => {
    upload.single('photo')(req, res, async err => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during the upload
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: err.message}));
        } else if (err) {
            // An unknown error occurred during the upload
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(
                JSON.stringify({message: 'Error uploading file.'})
            );
        }
        else{
            const { article, title } = req.body;
            const image = req.file;

          

            let post = {
                article: article,
                title: title
            };
            let data = await addCampaign(post);
            if(data.message != "Server error"){
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({message: data.message}));
            } else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({message: data.message}));
            }        }
    });
  });

  const getCampaigns = catchAsync(async (req, res) => {
    let data = await getAllCampaigns();
  
    if(data.message != "Server error"){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({campaigns: data.campaigns}));
    } else {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({message: data.message}));
    }
  });

const campaignController= catchAsync(async(req,res)=>{
    const { url, method } = req;
    res.setHeader("Content-Type", "application/json");
    if (url === "/api/campaign" && method === "POST") {
        const response = await verifyToken(req, res);
        if (!response) {
          return;
        }
        if (!verifyRole(res, response, "admin")) {
          return;
        }
        insertCampaign(req,res);
    }
    if (url === "/api/campaign" && method === "GET") {
      
        getCampaigns(req,res);
    }


});
module.exports=campaignController;

