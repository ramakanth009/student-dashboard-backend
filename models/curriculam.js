module.exports = function(sequelize, DataTypes) {
    return sequelize.define('curriculam_videos', {
       id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
       },
       moduleNo: {
         type: DataTypes.INTEGER,
         allowNull: false,
         field: 'module_no'
       },
       videoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'video_id'
      },
       videoUrl: {
         type: DataTypes.STRING,
         allowNull: false,
         field: 'video_url'
       }
     }, {
       sequelize,
       tableName: 'curriculam_videos',
       timestamps: false
     });
   };
   