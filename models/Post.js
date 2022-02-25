const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
//const bcrypt = require('bcrypt');

class Post extends Model {};

//define table columns and configuration
Post.init(
    {
        //define an id column
        id: {
            //use the special Sequelize DataTypes object to provide what type of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQL's 'NOT NULL' option
            allowNull: false,
            //instruct that this is the Primary Key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define an title column
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //define a post_url column
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        //define a password column
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        // hooks: {
        //     // set up beforeCreate lifecycle 'hook' functionality
        //     async beforeCreate(newUserData) {
        //         newUserData.password = await bcrypt.hash(newUserData.password, 10);
        //         return newUserData;
        //     },
        //     //set up beforeUpdate lifecycle 'hook' functionality
        //     async beforeUpdate(updatedUserData) {
        //         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        //         return updatedUserData;
        //     }
        // },
        //table configuation options go here (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        //don't automatically create createdAt/updatedAt timestamps fileds
        timestamps: true,
        updatedAt: false,
        //don't pluarlize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'post'
    }
);

module.exports = Post;