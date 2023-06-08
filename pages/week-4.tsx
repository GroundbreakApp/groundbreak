import { NewStory } from "@/components/new-story";
const stories = [
  {
    overlayColor: "#566169",
    startTime: 0,
    duration: 7 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 7 * 1000,
    duration: 11 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 18.5 * 1000,
    duration: 15 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 34 * 1000,
    duration: 8 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 41 * 1000,
    duration: 13 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 54 * 1000,
    duration: 16 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 70 * 1000,
    duration: 12 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 82 * 1000,
    duration: 10 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 92 * 1000,
    duration: 15 * 1000,
  },
  {
    overlayColor: "#566169",
    startTime: 111 * 1000,
    duration: 5 * 1000,
  },
];

function NewDemoPage() {
  return (
    <div>
      <NewStory
        stories={stories}
        playbackId="993fZeHs00PBkIuDXhxC9IaAbWG4bELIPM1LLwUHyrv00"
      />
    </div>
  );
}

export default NewDemoPage;
