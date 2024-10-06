import CenterBlock from "./CenterBlock";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";

jest.mock("../../store/store", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe("Track component", () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  it("renders correctly and renders heading", () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        track: {
          playlistState: tracks,
          myPlaylistState: tracks,
        },
        filter: {
          performerState: [],
          genreState: [],
          dateState: "",
        },
        user: {
          tokens: { acess: "", refresh: "" },
          userState: { email: "", username: "", _id: 0 },
        },
      })
    );

    const { container } = render(
      <CenterBlock allTracks={tracks} title="Title" />
    );
    expect(container).toMatchSnapshot();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("should render 'Треки не найдены' when no tracks are present", () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        track: {
          playlistState: [],
        },
        filter: {
          performerState: [],
          genreState: [],
          dateState: "",
        },
        user: {
          tokens: { acess: "", refresh: "" },
          userState: { email: "", username: "", _id: 0 },
        },
      })
    );

    render(<CenterBlock allTracks={[]} title={"Title"} />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Треки не найдены")).toBeInTheDocument();
  });
});
