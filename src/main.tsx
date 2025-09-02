import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // 데이터 항상 fresh → 재마운트/이동 시 재요청 안 함
      refetchOnWindowFocus: false, // 탭 포커스 시 재요청 금지
      refetchOnReconnect: false, // 네트워크 재연결 시 재요청 금지
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
