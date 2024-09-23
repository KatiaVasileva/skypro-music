import ReduxProvider from "../../store/ReduxProvider";
import CenterBlock from "./CenterBlock";
import { render } from "@testing-library/react";

describe("Track component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
        <ReduxProvider>
        <CenterBlock allTracks={[]} />
      </ReduxProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});