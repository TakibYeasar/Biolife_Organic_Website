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

        // Create Testimonial
        createTestimonial: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/create-testimonial/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Testimonial
        updateTestimonial: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CORE_URL}/update-testimonial/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Testimonial
        deleteTestimonial: builder.mutation({
            query: (id) => ({
                url: `${CORE_URL}/delete-testimonial/${id}/`,
                method: "DELETE",
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
    useFetchBrandsQuery,
    useCreateBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
    useFetchTestimonialsQuery,
    useCreateTestimonialMutation,
    useUpdateTestimonialMutation,
    useDeleteTestimonialMutation,
} = coreApi;
