import mongoose, { Schema } from 'mongoose';

const PostSchema = Schema({

    // this property will hold blog post's title
    title: {
        type: String,
        default: 'Title'
    },

    // this property will hold blog post's body
    body: {
        type: String,
        default: 'Body'
    },

    // this property will hold the date the blog post was created
    createdDate: {
        type: Date,
        default: Date.now // default to current date
    }
});

mongoose.model('Post', PostSchema);
