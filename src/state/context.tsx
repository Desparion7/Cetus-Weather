/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TDataItem } from '@/App';

interface FavoritesContextType {
	favorites: TDataItem[];
	toggleFavorite: (city: TDataItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined
);

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [favorites, setFavorites] = useState<TDataItem[]>([]);

	const toggleFavorite = (city: TDataItem) => {
		if (favorites.includes(city)) {
			const newFavorites = favorites.filter(
				(favorite) => favorite !== city
			);
			setFavorites(newFavorites);
		} else {
			setFavorites([...favorites, city]);
		}
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				toggleFavorite,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = (): FavoritesContextType => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error('useFavorites must be use in FavoritesProvider');
	}
	return context;
};

export { FavoritesProvider };
