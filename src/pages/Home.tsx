import { useEffect, useState } from 'react';
import { EntryExitForm } from '../components/EntryExitForm';
import { getCurrentPersons } from '../services/api';
import type { Person } from '../types/api';
import { PersonHistory } from '../components/PersonHistory';
import { FormatDateTime } from '../utils/dateTime';

export const Home = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const response = await getCurrentPersons();
                setPersons(response.data);
                setError('');
            } catch (err: unknown) {
                setError('Failed to fetch current persons');
                console.error('Error fetching persons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPersons();
        const interval = setInterval(fetchPersons, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <EntryExitForm setPersons={setPersons} />

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Current People in Building</h2>
                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : error ? (
                    <div className="text-center py-4 text-red-600">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Entry
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Exit
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {persons.map((person) => (
                                    <tr key={person.personId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {person.personId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {person.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${person.currentlyInside
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {person.currentlyInside ? 'Inside' : 'Outside'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {FormatDateTime(person.lastEntry)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {FormatDateTime(person.lastExit)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <PersonHistory />
        </div>
    );
}; 