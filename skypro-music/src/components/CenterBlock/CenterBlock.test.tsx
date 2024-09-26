import ReduxProvider from "../../store/ReduxProvider";
import CenterBlock from "./CenterBlock";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Track component", () => {
  it("renders a heading", () => {
    render(
      <ReduxProvider>
        <CenterBlock allTracks={[]} title=""/>
      </ReduxProvider>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <CenterBlock allTracks={[]} title=""/>
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
