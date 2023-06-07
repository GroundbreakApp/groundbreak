
import { NewStory } from "@/components/new-story";
const stories = [
  {
    overlayColor: "#566169",
    startTime: 0,
    duration: 14.7 * 1000
  },
  {
    startTime: 14.8 * 1000,
    duration: 13.1 * 1000,
    overlayColor: "#CCB89E",
  },
  {
    startTime: 28.0 * 1000,
    duration: 14.8 * 1000,
    overlayColor: "#DFD1D6",
  },
  {
    startTime: 42.8 * 1000,
    duration: 16.7 * 1000,
    overlayColor: "#D3DCDD",

  },
  {
    startTime: 59.6 * 1000,
    duration: 5 * 1000,
    overlayColor: "#000",
  },
]

function NewDemoPage() {
  return (
    <div>
      <NewStory
        stories={stories}
        playbackId="1d8xHnlwAKVyWKaYFqHfkl6TSuJVKfS01PaJBVLz00SfM"
      />
    </div>
  )
}

export default NewDemoPage;