import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { worker } from '@/mocks/browser.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FavoritesProvider } from './state/context';

worker.start();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<FavoritesProvider>
				<App />
			</FavoritesProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
