import { fireEvent, render, screen } from "@testing-library/react";
import Filter from "./Filter";
import "@testing-library/jest-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setDateState, setGenreState, setPerformerState } from "@/store/features/filterSlice";

jest.mock("../../store/store");
jest.mock("../../store/features/filterSlice", () => ({
  setPerformerState: jest.fn(),
  setDateState: jest.fn(),
  setGenreState: jest.fn(),
}));

const mockUseAppSelector = useAppSelector as jest.Mock;
const mockUseAppDispatch = useAppDispatch as jest.Mock;

describe("Filter component", () => {
  let dispatchMock: jest.Mock;

  const performers = ["Author1", "Author2"];
  const genres = ["Genre1", "Genre2"];
  const years = ["По умолчанию"];

  beforeEach(() => {
    dispatchMock = jest.fn();
    mockUseAppDispatch.mockReturnValue(dispatchMock);
    mockUseAppSelector.mockImplementation((selector) =>
      selector({
        track: {
          playlistState: [
            {
              _id: 1,
              name: "Track1",
              author: "Author1",
              album: "Album1",
              duration_in_seconds: 100,
              release_date: "2024-09-22",
              genre: ["Genre1"],
              track_file: "track1.mp3",
            },
            {
              _id: 2,
              name: "Track2",
              author: "Author2",
              album: "Album2",
              duration_in_seconds: 100,
              release_date: "2024-09-22",
              genre: ["Genre2"],
              track_file: "track2.mp3",
            },
          ],
        },
        filter: {
          searchState: "",
          performerState: ["Author1", "Author2", "Author3"],
          genreState: ["Genre1", "Genre2"],
          dateState: ["По умолчанию"],
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <Filter performers={performers} genres={genres} years={years} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render filter titles correctly", () => {
    render(<Filter performers={performers} genres={genres} years={years} />);
    expect(screen.getByText("Искать по:")).toBeInTheDocument();
    expect(screen.getByText("исполнителю")).toBeInTheDocument();
    expect(screen.getByText("году выпуска")).toBeInTheDocument();
    expect(screen.getByText("жанру")).toBeInTheDocument();
  });

  it("should switch filters correctly", () => {
    render(<Filter performers={performers} genres={genres} years={years} />);
    const authorFilter = screen.getByText("исполнителю");
    fireEvent.click(authorFilter);
    expect(authorFilter).toHaveClass("filterButtonActive");
  });

  it("should call dispatch with setPerformerState when an author is selected", () => {
    render(<Filter performers={performers} genres={genres} years={years} />);
    fireEvent.click(screen.getByText("исполнителю"));
    fireEvent.click(screen.getByText("Author1"));
    expect(dispatchMock).toHaveBeenCalledWith(setPerformerState("Author2"));
  });

  it("should call dispatch with setGenreState when a genre is selected", () => {
    render(<Filter performers={performers} genres={genres} years={years} />);
    fireEvent.click(screen.getByText("жанру"));
    fireEvent.click(screen.getByText("Genre1"));
    expect(dispatchMock).toHaveBeenCalledWith(setGenreState("Genre1"));
  });  

  it("should call dispatch with setDateState when date order is selected", () => {
    render(<Filter performers={performers} genres={genres} years={years} />);
    fireEvent.click(screen.getByText("году выпуска"));
    fireEvent.click(screen.getByText("По умолчанию"));
    expect(dispatchMock).toHaveBeenCalledWith(setDateState("По умолчанию"));
  }); 

  it("should show correct selected count", () => {
    render(<Filter performers={performers} genres={genres} years={years} />);
    const authorFilter = screen.getByTestId("author-count");
    expect(authorFilter.textContent).toContain("3");
    const yearFilter = screen.getByTestId("date-count");
    expect(yearFilter.textContent).toContain("1");
    const genreFilter = screen.getByTestId("genre-count");
    expect(genreFilter.textContent).toContain("2");
  });
});
