import { useState } from 'react';
import { getPersonHistory } from '../services/api';
import type { HistoryEvent } from '../types/api';
import { FormatDateTime } from '../utils/dateTime';

export const PersonHistory = () => {
    const [personId, setPersonId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [history, setHistory] = useState<HistoryEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setHistory([]);
        if (!personId.trim() || !startDate || !endDate) {
            setError('Person ID, Start Date, and End Date are required.');
            return;
        }
        setLoading(true);
        try {
            const data = await getPersonHistory(personId, startDate, endDate);
            if (data && Array.isArray(data.data)) {
                if (data.data.length === 0) {
                    setError('No history found for this person in the selected range.');
                } else {
                    setHistory(data.data);
                }
            } else if (
                data &&
                typeof data === 'object' &&
                ('status' in data || 'error' in data)
            ) {
                const res = data as { status?: boolean; error?: string };
                if (res.status === false || res.error) {
                    setError(res.error || 'API Error occurred.');
                    return;
                }
            } else {
                setError('Unexpected response from server.');
            }
        } catch (err: unknown) {
            let errorMsg = 'Error occurred. Please try again.';
            if (err && typeof err === 'object') {
                if ('error' in err && typeof (err as { error?: string }).error === 'string') {
                    errorMsg = (err as { error: string }).error;
                }
            }
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Person History</h2>
            <form className="space-y-4 mb-4" onSubmit={handleFetch}>
                <div>
                    <label htmlFor="personId" className="block text-sm font-medium text-gray-700">Person ID</label>
                    <input
                        type="text"
                        id="personId"
                        value={personId}
                        onChange={e => setPersonId(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-3"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-3"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-3"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Fetch History
                </button>
            </form>
            {loading && <div className="text-center py-4">Loading...</div>}
            {error && <div className="text-center py-4 text-red-600">{error}</div>}
            {!loading && !error && history.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {history.map((event) => (
                                <tr key={event._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.eventType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.gate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{FormatDateTime(event.timestamp)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}; 