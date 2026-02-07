import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Baseurl = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  tasks: [],
  currentTask: null,
  members: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

/* =========================
   CREATE TASK
========================= */
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (formData, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${Baseurl}/api/task/createtask`,
        formData,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Task creation failed"
      );
    }
  }
);

/* =========================
   GET TASKS
========================= */
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (queryParams, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${Baseurl}/api/task/gettask`,
        {
          params: queryParams,
          withCredentials: true,
        }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch tasks failed"
      );
    }
  }
);

/* =========================
   GET TASK BY ID
========================= */
export const getTaskById = createAsyncThunk(
  "tasks/getTaskById",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${Baseurl}/api/task/gettaskbyid/${id}`,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch task failed"
      );
    }
  }
);

/* =========================
   UPDATE TASK (ADMIN)
========================= */
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, thunkAPI) => {
    try {
      const resp = await axios.put(
        `${Baseurl}/api/task/updatetask/${id}`,
        data,
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update task failed"
      );
    }
  }
);

/* =========================
   UPDATE TASK STATUS (MEMBER)
========================= */
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const resp = await axios.patch(
        `${Baseurl}/api/task/updatetaskstatus/${id}/status`,
        { status },
        { withCredentials: true }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Status update failed"
      );
    }
  }
);

/* =========================
   DELETE TASK
========================= */
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${Baseurl}/api/task/deletetask/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete task failed"
      );
    }
  }
);

/* =========================
   GET COMPANY MEMBERS
========================= */
export const getCompanyMembers = createAsyncThunk(
  "tasks/getCompanyMembers",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${Baseurl}/api/task/company-members`,
        { withCredentials: true }
      );
      return resp.data.members;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch members"
      );
    }
  }
);

/* =========================
   SLICE
========================= */
const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTaskState(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    clearCurrentTask(state) {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== CREATE ===== */
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.unshift(action.payload.task);
        state.message = action.payload.message;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ===== GET ALL ===== */
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /* ===== GET BY ID ===== */
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.currentTask = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload.task._id
            ? action.payload.task
            : task
        );
        state.message = action.payload.message;
      })

      /* ===== UPDATE STATUS ===== */
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload.task._id
            ? action.payload.task
            : task
        );
        state.message = action.payload.message;
      })

      /* ===== DELETE ===== */
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload
        );
      })
      /* ===== GET COMPANY MEMBERS ===== */
      .addCase(getCompanyMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload; // 👈 dropdown data
      })
      .addCase(getCompanyMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetTaskState, clearCurrentTask } = TasksSlice.actions;
export default TasksSlice.reducer;