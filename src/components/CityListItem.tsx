import { TDataItem, TemperatureUnit } from '@/App';
import { WeatherIcon } from '@/components/WeatherIcon.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TbHeart } from 'react-icons/tb';
import { useFavorites } from '@/state/context';

type CityListItemProps = {
	cityData: TDataItem;
	temperaturUnit: TemperatureUnit;
};

export const CityListItem = ({
	cityData,
	temperaturUnit,
}: CityListItemProps) => {
	const { favorites, toggleFavorite } = useFavorites();

	const isFavorite = favorites.find((item) => item.id === cityData.id);

	const handleClickFavorite = () => {
		toggleFavorite(cityData);
	};

	return (
		<div
			className={
				'flex gap-4 items-center p-4 border-b last-of-type:border-none'
			}
		>
			<WeatherIcon weatherType={cityData.description} />
			<div className={'flex flex-col'}>
				<span>{cityData.city}</span>
				<small className={'text-sm text-gray-600 capitalize'}>
					{cityData.description}
				</small>
			</div>
			<strong className={'ml-auto'}>
				{temperaturUnit === 'CELSIUS' &&
					`${cityData.temperatureCelsius} °C`}
				{temperaturUnit === 'FAHRENHEIT' &&
					`${(
						(cityData.temperatureCelsius * 9) / 5 +
						32
					).toFixed()} °F`}
			</strong>

			{/* Set variant to 'default' when item is marked as favorite */}
			<Button
				variant={isFavorite ? 'default' : 'outline'}
				size={'icon'}
				onClick={() => {
					handleClickFavorite();
				}}
			>
				<TbHeart />
			</Button>
		</div>
	);
};
