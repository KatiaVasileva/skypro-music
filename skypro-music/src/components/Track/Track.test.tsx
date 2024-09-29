import ReduxProvider from "../../store/ReduxProvider";
import { render } from "@testing-library/react";
import { Track } from "@/types/Track.types";
import TrackItem from "./Track";

describe("Track component", () => {
  it("renders correctly", () => {
    const track = {
      _id: 1,
      name: "Track1",
      author: "Author1",
      album: "Album1",
      duration_in_seconds: 100,
      release_date: "2024-09-22",
      genre: ["Rock"],
      track_file: "track1.mp3",
    };

    const tracks: Array<Track> = [
      {
        _id: 1,
        name: "Track1",
        author: "Author1",
        album: "Album1",
        duration_in_seconds: 100,
        release_date: "2024-09-22",
        genre: ["Rock"],
        track_file: "track1.mp3",
      },
    ];

    const { asFragment } = render(
      <ReduxProvider>
        <TrackItem track={track} tracks={tracks} />
      </ReduxProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
