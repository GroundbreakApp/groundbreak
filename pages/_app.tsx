import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { QueryClientProvider } from 'react-query';
import store from "../stores/store";
import { queryClient } from '@/lib/react-query';
import 'swiper/css';
import "@/components/my-story/components/container.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </Provider>
}
