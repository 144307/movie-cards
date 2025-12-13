import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { supabase } from "../../supabase/client";
import type { User } from "@supabase/supabase-js";
import type { IUserSlice } from "../../types";
import type { Database } from "../../types/supabase";
import type { AppDispatch, RootState } from "../../store";

type IProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

// const initialState: IUserSlice = {
//   userId: "0",
//   username: "test",
//   profileImageURL: "https://placehold.co/600x400",
// };

const initialState: IUserSlice = {
  userId: null,
  username: null,
  profileImageURL: null,
};

export const createUser = createAsyncThunk<
  User,
  { email: string; password: string; username: string },
  { rejectValue: string }
>(
  "user/createUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    email = "mane.serenum@gmai.com";
    password = "asdfasdf123123-08";
    console.log(email);
    console.log(password);
    console.log(username);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: "John",
        },
      },
    });
    if (error) return rejectWithValue(error.message);
    if (!data.user) return rejectWithValue("no data returned");
    // upload profile image if provided
    console.log("created user", data.user);
    return data.user;
  }
);

export const uploadImage = createAsyncThunk<
  void,
  File,
  { state: RootState; rejectValue: string }
>("user/uploadImage", async (file, { getState, rejectWithValue }) => {
  const user = getState().user;
  const filePath = `${user.userId}/profile.jpg`;
  const { error } = await supabase.storage
    .from("profile-images")
    .update(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error) return rejectWithValue(`upload error ${error}`);
});

export const fetchProfile = createAsyncThunk<
  IUserSlice,
  void,
  { rejectValue: string }
>("user/fetchProfile", async (_, { rejectWithValue }) => {
  const { data, error } = await supabase.from("profiles").select().single();
  if (error) return rejectWithValue(`fetch profile error ${error.message}`);
  console.log("profile data", data);
  return {
    userId: data.id,
    username: data.username,
    profileImageURL: data.profile_image_url,
  };
});

export const signup = createAsyncThunk<
  void,
  { email: string; password: string; file: File | null },
  { dispatch: AppDispatch; rejectValue: string }
>(
  "user/signup",
  async ({ email, password, file }, { dispatch, rejectWithValue }) => {
    // create user
    const username = "test username";
    console.log(file?.size, file?.name);

    await dispatch(createUser({ email, password, username })).catch((error) => {
      rejectWithValue(error);
    });
    // file upload
    if (file) {
      await dispatch(uploadImage(file)).catch((error) =>
        rejectWithValue(error)
      );
    }
    // request profile info (username, profile image)
    await dispatch(fetchProfile()).catch((error) => rejectWithValue(error));
  }
);

export const login = createAsyncThunk<
  IUserSlice,
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) return rejectWithValue(`login error ${data.user}`);
});

////

export const updateUserProfileImage = createAsyncThunk<
  IProfileRow,
  void,
  { rejectValue: string }
>("user/updateUserProfileImage", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("profiles").select().single();
    console.log("data", data);
    if (error) {
      console.log(error);
      return rejectWithValue(`profile image fetch error${error.message}`);
    }
    if (!data) {
      return rejectWithValue("no data");
    }
    return data;
  } catch (e) {
    return rejectWithValue(`get profile image error ${e}`);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.userId = action.payload.id;
    });
    builder.addCase(createUser.rejected, (_, action) => {
      console.log("createUser error", action.payload);
    });

    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      console.log("user profile image");
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.profileImageURL = action.payload.profileImageURL;
    });
    builder.addCase(fetchProfile.rejected, (_, action) => {
      console.log("fetchProfile error", action.payload);
    });

    builder.addCase(uploadImage.fulfilled, () => {
      console.log("image uploaded");
    });
    builder.addCase(uploadImage.rejected, (_, action) => {
      console.log("image upload error", action.payload);
    });

    builder.addCase(updateUserProfileImage.fulfilled, (state, action) => {
      state.profileImageURL = action.payload.profile_image_url;
    });
  },
});

export default userSlice.reducer;
