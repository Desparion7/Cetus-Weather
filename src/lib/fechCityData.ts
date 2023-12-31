
export const fetchCitiesData = async () => {
	try {
		const response = await fetch('/api/weather');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};
