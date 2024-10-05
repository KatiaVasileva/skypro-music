import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from "./SignUp";

describe("Signup component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <SignUp />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
