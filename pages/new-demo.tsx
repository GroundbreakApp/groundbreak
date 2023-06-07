
import { NewStory } from "@/components/new-story";
const stories = [
  {
    overlayColor: "#45476d",
    startTime: 0,
    duration: 13 * 1000
  },
  {
    startTime: 13.1 * 1000,
    duration: 4.3 * 1000,
    overlayColor: "#222c67",
  },
  {
    startTime: 17.4 * 1000,
    duration: 3.8 * 1000,
    overlayColor: "#664636",
  },
  {
    startTime: 21.2 * 1000,
    duration: 4.2 * 1000,
    overlayColor: "#b8a0da",
  },
  {
    startTime: 25.4 * 1000,
    duration: 3.5 * 1000,
    overlayColor: "#ebc38e",
  },
  {
    startTime: 29.1 * 1000,
    duration: 6.8 * 1000,
    overlayColor: "#ffffff",
  }
]

function NewDemoPage() {
  return (
    <div>
      <NewStory
        stories={stories}
        playbackId="029eY6D8BeplQr3e9Aa49TSJmVFZsfDTwK1QFb005nH3Y"
      />
    </div>
  )
}

export default NewDemoPage;