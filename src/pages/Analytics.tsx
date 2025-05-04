import { useEffect, useState } from 'react';
import { getAnalytics } from '../services/api';
import type { Analytics as AnalyticsType } from '../types/api';

export const Analytics = () => {
    const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getAnalytics();
                const analyticsData: AnalyticsType = {
                    currentOccupancyInsideBuilding: data.data.currentOccupancyInsideBuilding,
                    averageStayDuration: data.data.averageStayDuration,
                    peakEntryTime: data.data.peakEntryTime,
                    peakExitTime: data.data.peakExitTime,
                    gateUsage: data.data.gateUsage,
                };
                setAnalytics(analyticsData);
                setError('');
            } catch (err: unknown) {
                setError('Failed to fetch analytics data');
                console.error('Error fetching analytics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const formatHour = (hour: number) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        return `${hour12} ${period}`;
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">{error}</div>;
    }

    if (!analytics) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Current Building Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Current Occupancy Inside Building</h3>
                        <p className="text-3xl font-bold">{analytics.currentOccupancyInsideBuilding}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Average Stay Duration</h3>
                        <p className="text-3xl font-bold">{analytics.averageStayDuration?.toFixed(2) || 'N/A'} minutes</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Peak Times</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Peak Entry Time</h3>
                        <p className="text-lg">{formatHour(analytics.peakEntryTime.hour)} ({analytics.peakEntryTime.count} entries)</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Peak Exit Time</h3>
                        <p className="text-lg">{formatHour(analytics.peakExitTime.hour)} ({analytics.peakExitTime.count} exits)</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Popular Gates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Entry Gates</h3>
                        <ul className="list-disc pl-5">
                            {Object.entries(analytics.gateUsage.entryGates).map(([gate, count]) => (
                                <li key={`entry-gate-${gate}`}>{gate}: {count} times</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Exit Gates</h3>
                        <ul className="list-disc pl-5">
                            {Object.entries(analytics.gateUsage.exitGates).map(([gate, count]) => (
                                <li key={`exit-gate-${gate}`}>{gate}: {count} times</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}; 