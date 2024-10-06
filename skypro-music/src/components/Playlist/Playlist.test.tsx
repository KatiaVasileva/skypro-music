import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Playlist from "./Playlist";

describe("Playlist component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <Playlist allTracks={[]} />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});