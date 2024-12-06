import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching projects
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/projects`);
  return response.data;
});

// Update likes for a specific project
export const updateLikes = createAsyncThunk('projects/updateLikes', async (id) => {
  const response = await axios.post(`${import.meta.env.VITE_APP_API}/projects/${id}/likes`);
  return { id, likes: response.data.likes };
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateLikes.fulfilled, (state, action) => {
        const { id, likes } = action.payload;
        const project = state.projects.find((project) => project.id === id);
        if (project) {
          project.likes = likes;
        }
      });
  }
});

export default projectsSlice.reducer;
