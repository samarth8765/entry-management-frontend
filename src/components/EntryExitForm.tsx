import { useState } from 'react';
import { getCurrentPersons, registerEntry, registerExit } from '../services/api';
import type { Person } from '../types/api';

export const EntryExitForm = ({ setPersons }: { setPersons: (persons: Person[]) => void }) => {
    const [personId, setPersonId] = useState('');
    const [gate, setGate] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent, isEntry: boolean) => {
        e.preventDefault();
        if (!personId.trim() || !gate.trim()) {
            setMessage('Both Person ID and Gate are required.');
            setIsError(true);
            return;
        }
        try {
            // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
            let response;
            if (isEntry) {
                response = await registerEntry(personId, gate);
            } else {
                response = await registerExit(personId, gate);
            }
            // If the API returns a status or error property, handle it
            if (
                response &&
                typeof response === 'object' &&
                ('status' in response || 'error' in response)
            ) {
                const res = response as { status?: boolean; error?: string };
                if (res.status === false || res.error) {
                    setMessage(res.error || 'API Error occurred.');
                    setIsError(true);
                    return;
                }
            }
            setMessage(isEntry ? 'Entry registered successfully' : 'Exit registered successfully');
            setIsError(false);
            setPersonId('');
            setGate('');

            // Fetch the updated persons list
            const peopleInsideBuilding = await getCurrentPersons();
            setPersons(peopleInsideBuilding.data);
        }
        catch (error: unknown) {
            let errorMsg = 'Error occurred. Please try again.';
            if (error && typeof error === 'object') {
                if ('message' in error && typeof (error as { message?: string }).message === 'string') {
                    errorMsg = (error as { message: string }).message;
                }
                if ('error' in error && typeof (error as { error?: string }).error === 'string') {
                    errorMsg = (error as { error: string }).error;
                }
            }
            setMessage(errorMsg);
            setIsError(true);
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Register Entry/Exit</h2>
            {message && (
                <div className={`mb-4 p-3 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}
            <form className="space-y-4">
                <div>
                    <label htmlFor="personId" className="block text-sm font-medium text-gray-700">
                        Person ID
                    </label>
                    <input
                        type="text"
                        id="personId"
                        value={personId}
                        onChange={(e) => setPersonId(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-3"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gate" className="block text-sm font-medium text-gray-700">
                        Gate
                    </label>
                    <input
                        type="text"
                        id="gate"
                        value={gate}
                        onChange={(e) => setGate(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-3"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        onClick={(e) => handleSubmit(e, true)}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Register Entry
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => handleSubmit(e, false)}
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Register Exit
                    </button>
                </div>
            </form>
        </div>
    );
}; 