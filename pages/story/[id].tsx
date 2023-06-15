import { NewStory } from '@/components/new-story';
import { useGetStoryInfo } from '@/services/api';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Head from 'next/head'
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

  const stories = storyInfo.data.data.videodata;
  const playbackId = storyInfo.data.data.playbackId;
  console.log("storyInfo.data", storyInfo.data)
  console.log("stories", stories);
  console.log("playbackId", playbackId);
  return <>
    <Head>
      {storyInfo?.data?.data?.previewGif && <meta property="og:image:secure_url" content={storyInfo.data.data.previewGif} />}
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