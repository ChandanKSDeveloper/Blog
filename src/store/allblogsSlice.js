import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appwriteService from '../appwrite/config'; // Adjust path as needed

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk('allblogs/fetchPosts', async () => {
    const response = await appwriteService.getPosts([]);
    return response.documents; // Assuming response.documents holds the posts
});

// Async thunk to delete a post
// export const deletePost = createAsyncThunk('allblogs/deletePost', async (postId, { dispatch }) => {
//     await appwriteService.deletePost(postId);
//     dispatch(fetchPosts()); // Re-fetch posts after deletion
//     return postId;
// });

const allblogsSlice = createSlice({
    name: 'allblogs',
    initialState: {
        posts: [],
        status: 'idle', // or 'loading', 'succeeded', 'failed'
        error: null,
    },
    reducers: {
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { deletePost } = allblogsSlice.actions;
export default allblogsSlice.reducer;
