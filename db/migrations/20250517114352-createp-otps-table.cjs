'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('otps', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      otp_code: {
        type: Sequelize.STRING(60), // Increased the length to accommodate the hashed OTP
        allowNull: false,
      },
      otp_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      otp_target_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      otp_expiration: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    }, {
      underscored: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('otps');
  }
};
