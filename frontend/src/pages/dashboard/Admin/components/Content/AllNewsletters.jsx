import React from 'react';
import {
    useFetchNewslettersQuery,
} from '../../../../../redux/features/core/coreApi';

const AllNewsletters = () => {

    const { data: newsletters } = useFetchNewslettersQuery();


    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Newsletter Subscriptions</h3>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Subscribtion Date</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {newsletters && newsletters.length > 0 ? (
                        newsletters.map((item, index) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{item.email}</td>
                                <td className="border px-4 py-2">{item.subscribed_at}</td>
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
                                No Subscribers available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AllNewsletters