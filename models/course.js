module.exports = function(sequelize, DataTypes) {
 return sequelize.define('courses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'title'
    },
    courseType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'course_type'
    },
    percentage: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'percentage'
    },
    status: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "status"
    },
    imageUrl: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'image_url'
    }
  }, {
    sequelize,
    tableName: 'courses',
    timestamps: false
  });
};
