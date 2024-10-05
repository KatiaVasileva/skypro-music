import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterItem from "../FilterItem/FilterItem";
import Bar from "./Bar";

describe("Bar component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <Bar />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
