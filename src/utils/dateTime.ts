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
