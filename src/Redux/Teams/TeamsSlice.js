import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Baseurl = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  teams: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

/* =======================
   CREATE TEAM
======================= */
export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (formData, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${Baseurl}/api/teams/create`,
        formData,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Team creation failed"
      );
    }
  }
);

/* =======================
   GET MY TEAMS
======================= */
export const getMyTeams = createAsyncThunk(
  "teams/getMyTeams",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${Baseurl}/api/teams/myteams`,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch teams failed"
      );
    }
  }
);

/* =======================
   UPDATE TEAM
======================= */
export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ id, data }, thunkAPI) => {
    try {
      const resp = await axios.put(
        `${Baseurl}/api/teams/update/${id}`,
        data,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update team failed"
      );
    }
  }
);

/* =======================
   DELETE TEAM
======================= */
export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${Baseurl}/api/teams/delete/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete team failed"
      );
    }
  }
);

const TeamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    resetTeamState(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== CREATE ===== */
      .addCase(createTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams.push(action.payload.team);
        state.message = action.payload.message;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ===== GET MY ===== */
      .addCase(getMyTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams = action.payload.teams;
      })
      .addCase(getMyTeams.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.teams = state.teams.map((team) =>
          team._id === action.payload.team._id
            ? action.payload.team
            : team
        );
        state.message = action.payload.message;
      })

      /* ===== DELETE ===== */
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter(
          (team) => team._id !== action.payload
        );
      });
  },
});

export const { resetTeamState } = TeamsSlice.actions;
export default TeamsSlice.reducer;
