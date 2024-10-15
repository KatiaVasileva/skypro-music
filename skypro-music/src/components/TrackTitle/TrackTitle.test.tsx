import ReduxProvider from "@/store/ReduxProvider";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrackTitle from "./TrackTitle";

describe("Search component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <TrackTitle />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText("Трек")).toBeInTheDocument();
    expect(screen.getByText("Исполнитель")).toBeInTheDocument();
    expect(screen.getByText("Альбом")).toBeInTheDocument();
  });
});
