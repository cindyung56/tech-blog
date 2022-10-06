const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// ------- user can have multiple posts

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// ------- user can have multiple comments

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// ------- post can have multiple comments

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "CASCADE",
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});






module.exports = { User, Post, Comment };