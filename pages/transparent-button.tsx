
import { NewStory } from "@/components/new-story";
const stories = [
  {
    overlayColor: "#566169",
    startTime: 0,
    duration: 4.6 * 1000,
    widgets: [
      {
        spawnTime: 0,
        duration: 7000,
        render: () => <>
          <a
            href="https://groundbreakapp.com"
            target="_blank"
            style={{
              position: "absolute",
              width: "34%",
              height: "12%",
              right: "13%",
              zIndex: "10011",
              top: "5%",
            }}>
          </a>
        </>
      }
    ]
  },
]

function NewDemoPage() {
  return (
    <div>
      <NewStory
        stories={stories}
        playbackId="QI502Ad7DpnPiVoczh9WsuMkIgu3DLPdpQ9qMaBK4vxk"
      />
    </div>
  )
}

export default NewDemoPage;