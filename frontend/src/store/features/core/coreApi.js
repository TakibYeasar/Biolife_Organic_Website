import { apiSlice } from "../../api/api";
import { CORE_URL } from "../../constant";

export const coreApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch Contact Info
        fetchContactInfo: builder.query({
            query: () => ({
                url: `${CORE_URL}/contact-info/`,
            }),
        }),

        // Create Contact Info
        createContactInfo: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/create-contact-info/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Contact Info
        updateContactInfo: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CORE_URL}/update-contact-info/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Contact Info
        deleteContactInfo: builder.mutation({
            query: (id) => ({
                url: `${CORE_URL}/delete-contact-info/${id}/`,
                method: "DELETE",
            }),
        }),

        // Fetch Banners
        fetchBanners: builder.query({
            query: () => ({
                url: `${CORE_URL}/banners/`,
            }),
        }),

        // Create Banner
        createBanner: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/create/banner/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Banner
        updateBanner: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CORE_URL}/update/banner/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Banner
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `${CORE_URL}/delete/banner/${id}/`,
                method: "DELETE",
            }),
        }),

        // Fetch Featured
        fetchFeatured: builder.query({
            query: () => ({
                url: `${CORE_URL}/featureds/`,
            }),
        }),

        // Create Featured
        createFeatured: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/create/featured/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Featured
        updateFeatured: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CORE_URL}/update/featured/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Featured
        deleteFeatured: builder.mutation({
            query: (id) => ({
                url: `${CORE_URL}/delete/featured/${id}/`,
                method: "DELETE",
            }),
        }),


        // Fetch Brands
        fetchBrands: builder.query({
            query: () => ({
                url: `${CORE_URL}/brands/`,
            }),
        }),

        // Create Brand
        createBrand: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/create-brand/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Brand
        updateBrand: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CORE_URL}/update-brand/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Brand
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `${CORE_URL}/delete-brand/${id}/`,
                method: "DELETE",
            }),
        }),

        // Fetch Testimonials
        fetchTestimonials: builder.query({
            query: () => ({
                url: `${CORE_URL}/testimonial/`,
            }),
        }),

        // Fetch Testimonials
        fetchNewsletters: builder.query({
            query: () => ({
                url: `${CORE_URL}/newsletter/`,
            }),
        }),

        // Fetch Contact
        fetchContacts: builder.query({
            query: () => ({
                url: `${CORE_URL}/all-contacts/`,
            }),
        }),

        // Create Contact
        createContact: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/create-contact/`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useFetchContactInfoQuery,
    useCreateContactInfoMutation,
    useUpdateContactInfoMutation,
    useDeleteContactInfoMutation,

    useFetchBannersQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,

    useFetchFeaturedQuery,
    useCreateFeaturedMutation,
    useUpdateFeaturedMutation,
    useDeleteFeaturedMutation,

    useFetchBrandsQuery,
    useCreateBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,

    useFetchTestimonialsQuery,
    useFetchNewslettersQuery,

    useFetchContactsQuery,
    useCreateContactMutation,
} = coreApi;
