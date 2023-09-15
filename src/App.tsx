import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Header } from '@/components/ui/Header.tsx';
import { CityListCard } from '@/components/CityListCard.tsx';
import { TemperatureUnitSelect } from '@/components/TemperatureUnitSelect.tsx';
import { fetchCitiesData } from './lib/fechCityData';
import { useQuery } from 'react-query';
import { useFavorites } from './state/context';

export type TemperatureUnit = 'CELSIUS' | 'FAHRENHEIT';
export type TWeatherDescription = 'cloudy' | 'sunny' | 'stormy';
export type TDataItem = {
	id: string;
	city: string;
	temperatureCelsius: number;
	description: TWeatherDescription;
};

function App() {
	const [citiesData, setCitiesData] = useState<TDataItem[]>([]);
	const [temperaturUnit, setTemperaturUnit] =
		useState<TemperatureUnit>('CELSIUS');

	const { favorites } = useFavorites();

	const { isLoading, isError, data } = useQuery({
		queryKey: ['citiesWeather'],
		queryFn: fetchCitiesData,
	});

	useEffect(() => {
		setCitiesData(data);
	}, [data]);

	const handleFilter = (search: string) => {
		const lowercaseSearch = search.toLowerCase();
		const filteredData = data.filter(
			(item: TDataItem) =>
				item.city.toLowerCase().includes(lowercaseSearch) ||
				item.city.toLowerCase().startsWith(lowercaseSearch)
		);
		setCitiesData(filteredData);
	};

	return (
		<>
			<Header />
			<div
				className={
					'container max-w-lg mx-auto my-4 flex flex-col gap-4'
				}
			>
				<div className={'flex justify-between gap-4'}>
					<Input
						onChange={(e) => {
							handleFilter(e.target.value);
						}}
						className={'flex-grow'}
						placeholder={'Search city...'}
					/>
					<TemperatureUnitSelect
						value={temperaturUnit}
						onChange={(_val: TemperatureUnit) => {
							setTemperaturUnit(_val);
						}}
					/>
				</div>

				<CityListCard
					title={'Weather in cities'}
					citiesData={citiesData}
					temperaturUnit={temperaturUnit}
					isLoading={isLoading}
					isError={isError}
				/>
				{favorites.length > 0 && (
					<CityListCard
						title={'Favorites'}
						citiesData={favorites}
						temperaturUnit={temperaturUnit}
					/>
				)}
			</div>
		</>
	);
}

export default App;
