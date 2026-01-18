import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Baseurl = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  projects: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

/* =======================
   CREATE PROJECT
======================= */
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (formData, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${Baseurl}/api/projects/create`,
        formData,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Project creation failed"
      );
    }
  }
);

/* =======================
   GET MY PROJECTS
======================= */
export const getMyProjects = createAsyncThunk(
  "projects/getMyProjects",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${Baseurl}/api/projects/getallprojects`,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch projects failed"
      );
    }
  }
);

/* =======================
   UPDATE PROJECT
======================= */
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, data }, thunkAPI) => {
    try {
      const resp = await axios.put(
        `${Baseurl}/api/projects/update/${id}`,
        data,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

/* =======================
   DELETE PROJECT
======================= */
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${Baseurl}/api/projects/delete/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjectState(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== CREATE ===== */
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload.project);
        state.message = action.payload.message;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ===== GET MY ===== */
      .addCase(getMyProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.projects;
      })
      .addCase(getMyProjects.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.projects = state.projects.map((proj) =>
          proj._id === action.payload.project._id ? action.payload.project : proj
        );
        state.message = action.payload.message;
      })

      /* ===== DELETE ===== */
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (proj) => proj._id !== action.payload
        );
      });
  },
});

export const { resetProjectState } = ProjectSlice.actions;
export default ProjectSlice.reducer;
