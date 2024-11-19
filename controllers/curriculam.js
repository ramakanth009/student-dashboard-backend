const db = require('../models');

exports.uploadCurriculamVidoes = async (req, res) => {
    const moduleNo = req.body.moduleNo;
    const videoId = req.body.videoId;
    const videoUrl = req.body.videoUrl;
   
    try {
      
      // Save videos to Database
      await db.curriculam.create({
        moduleNo,
        videoId,
        videoUrl
      });

      return res.status(200).send({status: 1, message: 'Successfully Uploaded! '});
    } catch (e) {
      res.status(500).send({status: 0, message: e.message});
    };
  };

exports.getCurriculamVidoes = async (req, res, next) => {
  const moduleNo = req.body.moduleNo;
  console.log('db', db,moduleNo)
  try {
    let data = await db.curriculam.findAll({
      where: {'module_no': moduleNo},
    });
    console.log('data', data)
    
 res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e) {
    next(e);
  }
};
