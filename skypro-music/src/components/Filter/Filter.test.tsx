import ReduxProvider from "@/store/ReduxProvider";
import { fireEvent, render, screen } from "@testing-library/react";
import Filter from "./Filter";
import "@testing-library/jest-dom";

describe("Filter component", () => {

  const performers = ["Author1", "Author2"];
  const genres = ["Genre1", "Genre2"];
  const years = ["По умолчанию"];


  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <Filter performers={performers} genres={genres} years={years} />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render filter titles correctly", () => {
    render(
      <ReduxProvider>
        <Filter performers={performers} genres={genres} years={years} />
      </ReduxProvider>
    );
    expect(screen.getByText("Искать по:")).toBeInTheDocument();
    expect(screen.getByText("исполнителю")).toBeInTheDocument();
    expect(screen.getByText("году выпуска")).toBeInTheDocument();
    expect(screen.getByText("жанру")).toBeInTheDocument();
  });

  it("should switch filters correctly", () => {
    render(
      <ReduxProvider>
        <Filter performers={performers} genres={genres} years={years} />
      </ReduxProvider>
    );
    const authorFilter = screen.getByText("исполнителю");
    fireEvent.click(authorFilter);
    expect(authorFilter).toHaveClass("filterButtonActive");
  });
});
