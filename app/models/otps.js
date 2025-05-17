import {DataTypes, Model} from 'sequelize';
import sequelize from '../../lib/sequelize.js';
import bcrypt from 'bcryptjs';

class Otp extends Model {
  async expireNow() {
    this.otp_expiration = Date();
    await this.save();
  }
}

Otp.init(
  {
    id: { 
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    otp_code: {
      type: DataTypes.STRING(60), // Increase the length to accommodate the hashed OTP
      allowNull: false,
    },
    otp_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    otp_target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp_expiration: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
  }, {
    sequelize,
    modelName: 'Otp',
    tableName: 'otps',
    underscored: true,
    hooks: {
        beforeCreate: async (otp) => {
        // Hash the OTP before storing it
          const hashedOTP = bcrypt.hashSync(otp.otp_code, 10);
          otp.otp_code = hashedOTP;
        },
      },
  });

export default Otp;
