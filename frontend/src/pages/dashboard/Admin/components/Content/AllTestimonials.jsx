import React from 'react';
import {
    useFetchTestimonialsQuery,
} from '../../../../../redux/features/core/coreApi';

const AllTestimonials = () => {

    const { data: testimonials } = useFetchTestimonialsQuery();


    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Positions</th>
                        <th className="border px-4 py-2">Comment</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials && testimonials.length > 0 ? (
                        testimonials.map((item, index) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    <img src={item.image} alt="User Image" className="w-10 h-10" />
                                </td>
                                <td className="border px-4 py-2">{item.name}</td>
                                <td className="border px-4 py-2">{item.position}</td>
                                <td className="border px-4 py-2">{item.comment}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                No Testimonials available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AllTestimonials