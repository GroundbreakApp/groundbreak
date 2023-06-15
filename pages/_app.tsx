import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import store from "../stores/store";
import { queryClient } from '@/lib/react-query';
import { register } from 'swiper/element/bundle';
register();

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component  {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  </Provider>
}
