export interface EntryExitEvent {
	personId: string;
	timestamp: string;
	gate: string;
}

export interface Person {
	_id: string;
	personId: string;
	name: string;
	currentlyInside: boolean;
	createdAt: string;
	updatedAt: string;
	lastEntry: string;
	lastExit: string;
}

export interface Analytics {
	currentOccupancyInsideBuilding: number;
	averageStayDuration: number;
	peakEntryTime: { count: number; hour: number };
	peakExitTime: { count: number; hour: number };
	gateUsage: {
		entryGates: Record<string, number>;
		exitGates: Record<string, number>;
	};
}

export interface HistoryEvent {
	_id: string;
	personId: string;
	eventType: "entry" | "exit";
	timestamp: string;
	gate: string;
}

export interface ApiResponse<T> {
	status: boolean;
	meta: {
		totalCount: number;
		totalPages: number;
		currentPage: number;
		limit: number;
	};
	data: T;
}

export interface ApiErrorResponse {
	status: boolean;
	error: string;
}
