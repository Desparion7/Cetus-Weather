import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card.tsx';
import { CityListItem } from '@/components/CityListItem.tsx';
import { TDataItem, TemperatureUnit } from '@/App';

type CityListCardProps = {
	title: string;
	citiesData: TDataItem[];
	temperaturUnit: TemperatureUnit;
	isLoading?: boolean;
	isError?: boolean;
};
export const CityListCard = ({
	title,
	citiesData,
	temperaturUnit,
	isLoading,
	isError,
}: CityListCardProps) => {
	const content = isLoading ? (
		<p className={'text-center'}>Loading...</p>
	) : citiesData && citiesData.length > 0 ? (
		citiesData.map((city) => (
			<CityListItem
				key={city.id}
				cityData={city}
				temperaturUnit={temperaturUnit}
			/>
		))
	) : (
		<p className={'text-center'}>
			No cities found with this search criteria
		</p>
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				{content}
				{isError && (
					<p className={'text-center'}>Data fetching error</p>
				)}
			</CardContent>
		</Card>
	);
};
