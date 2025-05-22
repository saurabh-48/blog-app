import {DataTypes, Model} from 'sequelize';
import sequelize from '../../lib/sequelize.js';

class Blog extends Model {
    // assosiations here
}

Blog.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    image_url: {
        type: DataTypes.STRING,
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
    modelName: 'Blog',
    tableName: 'blogs',
    underscored: true,
  });

export default Blog;
