import { NewStory } from '@/components/new-story';
import { getStoryInfo, useGetStoryInfo } from '@/services/api';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { QueryClient, dehydrate } from '@tanstack/react-query';

export const getServerSideProps = async (ctx: any) => {

  const { id } = ctx.params;

  const queryClient = new QueryClient()

  // prefetch data on the server
  await queryClient.fetchQuery(['getStoryInfo', id], () => getStoryInfo(id))

  return {
    props: {
      // dehydrate query cache
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Page() {
  const router = useRouter();
  let id: string = router?.query?.id as string ?? '';;

  const storyInfo = useGetStoryInfo(id);

  const [height, setHeight] = useState('100vh'); // default to vh

  useEffect(() => {
    if ('CSS' in window && CSS.supports('height', '100svh')) {
      setHeight('100svh'); // switch to svh if supported
    }

  }, []);

  if (storyInfo.isLoading) {
    return <> Loading Story...</>
  }

  const stories = storyInfo.data.videodata;
  const playbackId = storyInfo.data.playbackId;

  return <>
    <Head>
      {storyInfo?.data?.previewGif && <>

        <meta
          content={storyInfo.data.previewGif}
          property="og:image"
        />
        <meta
          content="Groundbreak - Break Through the Noise"
          property="twitter:title"
        />
        <meta
          content="Groundbreak is a B2B vertical video platform that gets your foot in the door through personalized, disruptive experiences."
          property="twitter:description"
        />
        <meta
          content={storyInfo.data.previewGif}
          property="twitter:image"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          property="og:image:secure_url"
          content={storyInfo.data.previewGif}
        />
        <meta property="og:image:type" content="image/gif" />
        <meta property="og:image:width" content="270" />
        <meta property="og:image:height" content="480" />
      </>}
    </Head>
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100svh", overflow: "hidden" }}>
      <NewStory
        stories={stories}
        playbackId={playbackId}
      />
    </div>
    );
  </>
}