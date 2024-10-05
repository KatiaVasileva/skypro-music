import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "./SignIn";

describe("Signin component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <SignIn />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
