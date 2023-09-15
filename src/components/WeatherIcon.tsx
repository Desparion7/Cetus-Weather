import { IconType } from 'react-icons';
import {
	TiWeatherPartlySunny,
	TiWeatherStormy,
	TiWeatherSunny,
} from 'react-icons/ti';

export const WeatherIcon = ({ weatherType }: { weatherType: string }) => {
	let Icon;

	if (weatherType === 'cloudy') {
		Icon = TiWeatherPartlySunny;
	} else if (weatherType === 'stormy') {
		Icon = TiWeatherStormy;
	} else if (weatherType === 'sunny') {
		Icon = TiWeatherSunny;
	} else {
	
		Icon = TiWeatherPartlySunny; // Default icon
	}
	return <Icon size={'2rem'} />;
};
