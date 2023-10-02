/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextType {
	favorites: string[];
	toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined
);

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [favorites, setFavorites] = useState<string[]>([]);

	const toggleFavorite = (cityId: string) => {
		if (favorites.includes(cityId)) {
			const newFavorites = favorites.filter(
				(favorite) => favorite !== cityId
			);
			setFavorites(newFavorites);
		} else {
			setFavorites([...favorites, cityId]);
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
