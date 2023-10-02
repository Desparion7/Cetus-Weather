import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
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
	const { favorites } = useFavorites();

	const [search, setSearch] = useState('');
	const [temperaturUnit, setTemperaturUnit] =
		useState<TemperatureUnit>('CELSIUS');

	const { isLoading, isSuccess, isError, data } = useQuery({
		queryKey: ['citiesWeather'],
		queryFn: fetchCitiesData,
	});

	const handleFilter: ChangeEventHandler<HTMLInputElement> = (event) => {
		setSearch(event.target.value.trim());
	};

	const filteredData = useMemo(() => {
		if (!isSuccess || !data || !data.length) {
			return [];
		}

		return data.filter((item: TDataItem) =>
			item.city.toLowerCase().includes(search.toLowerCase())
		);
	}, [search, data, isSuccess]);

	const favoriteCities = useMemo(
		() =>
			isSuccess
				? data.filter((city: TDataItem) => favorites.includes(city.id))
				: [],
		[data, favorites, isSuccess]
	);

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
							handleFilter(e);
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
					citiesData={data}
					temperaturUnit={temperaturUnit}
					isLoading={isLoading}
					isError={isError}
				/>
				{favorites.length > 0 && (
					<CityListCard
						title={'Favorites'}
						citiesData={favoriteCities}
						temperaturUnit={temperaturUnit}
					/>
				)}
			</div>
		</>
	);
}

export default App;
