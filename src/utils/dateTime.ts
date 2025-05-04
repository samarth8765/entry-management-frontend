export const FormatDateTime = (dateString: string) => {
	if (!dateString) return "N/A";
	const date = new Date(dateString);
	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	});
};

export const FormatHour = (utcHour: number) => {
	const date = new Date();
	date.setUTCHours(utcHour, 0, 0, 0); // set UTC hour and 0 minutes

	const localHour = date.getHours();
	const localMinutes = date.getMinutes();
	const period = localHour >= 12 ? "PM" : "AM";
	const hour12 = localHour % 12 === 0 ? 12 : localHour % 12;

	const paddedMinutes = localMinutes.toString().padStart(2, "0");
	return `${hour12}:${paddedMinutes} ${period}`;
};
