import { apiSlice } from "../../api/api";
import { USERS_URL } from "../../constant";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all users for management
        manageUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/manage-users/`,
            }),
        }),

        // Change user role by its ID
        changeUserRole: builder.mutation({
            query: (id) => ({
                url: `${PETS_URL}/user/${id}/change-role/`,
                method: "PATCH",
            }),
        }),

        // Remove a user by its ID
        removeUser: builder.mutation({
            query: (id) => ({
                url: `${PETS_URL}/user/${id}/remove/`,
                method: "DELETE",
            }),
        }),

        // Create a new user profile
        createUserProfile: builder.mutation({
            query: (profileData) => ({
                url: `${USERS_URL}/create-profile/`,
                method: "POST",
                body: profileData,
            }),
        }),

        // Fetch the profile of the current user
        fetchUserProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile/`,
            }),
        }),

        // Update the user's profile
        updateUserProfile: builder.mutation({
            query: (profileData) => ({
                url: `${USERS_URL}/update-profile/`,
                method: "PUT",
                body: profileData,
            }),
        }),
    }),
});

export const {
    useManageUsersQuery,
    useChangeUserRoleMutation,
    useRemoveUserMutation,
    useCreateUserProfileMutation,
    useFetchUserProfileQuery,
    useUpdateUserProfileMutation,
} = userApi;
