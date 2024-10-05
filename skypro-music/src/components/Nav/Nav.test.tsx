import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "./Nav";

describe("Nav component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
