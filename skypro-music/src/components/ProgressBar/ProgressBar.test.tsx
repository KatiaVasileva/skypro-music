import { render } from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import { ChangeEvent } from "react";

describe("ProgressBar component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <ProgressBar
        max={0}
        value={0}
        step={0}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});