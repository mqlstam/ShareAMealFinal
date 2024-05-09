// controllers/info.controller.js
const infoController = {
    getInfo: (req, res) => {
      const systemInfo = {
        studentName: 'Miquel Stam',
        studentNumber: '2159021',
        description: 'Share-a-Meal Application'
      };
  
      res.status(200).json(systemInfo);
    }
  };
  
  module.exports = infoController;