import type {
	EntryExitEvent,
	Person,
	Analytics,
	HistoryEvent,
	ApiResponse,
} from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerEntry = async (
	personId: string,
	gate: string,
): Promise<EntryExitEvent> => {
	const response = await fetch(`${API_BASE_URL}/event/entry`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ personId, gate }),
	});
	return response.json();
};

export const registerExit = async (
	personId: string,
	gate: string,
): Promise<EntryExitEvent> => {
	const response = await fetch(`${API_BASE_URL}/event/exit`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ personId, gate }),
	});
	return response.json();
};

export const getCurrentPersons = async (): Promise<ApiResponse<Person[]>> => {
	const response = await fetch(`${API_BASE_URL}/person`);
	return response.json();
};

export const getPersonHistory = async (
	personId: string,
	startDate: string,
	endDate: string,
): Promise<ApiResponse<HistoryEvent[]>> => {
	const response = await fetch(
		`${API_BASE_URL}/person/${personId}/history?startDate=${startDate}&endDate=${endDate}`,
	);
	return response.json();
};

export const getAnalytics = async (): Promise<ApiResponse<Analytics>> => {
	const response = await fetch(`${API_BASE_URL}/analytics`);
	return response.json();
};
