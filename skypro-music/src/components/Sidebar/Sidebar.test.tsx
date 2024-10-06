import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";

describe("Sidebar component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
