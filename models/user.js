const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "email_2"
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(12),
      allowNull: false,
      field: 'phone_number'
    },
    courseType: {
      type: DataTypes.STRING(1),
      allowNull: false,
      field: 'course_type'
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "1-Yes, 0-No",
      field: 'email_verified'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "0-No, 1-Yes",
      field: 'is_active'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by'
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_date'
    },
    lastUpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'last_updated_by'
    },
    lastUpdatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'last_updated_date'
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
          return `${this.firstName} ${this.lastName}`;
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "created_by",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "email",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "last_updated_by",
        using: "BTREE",
        fields: [
          { name: "last_updated_by" },
        ]
      },
    ]
  });
};
