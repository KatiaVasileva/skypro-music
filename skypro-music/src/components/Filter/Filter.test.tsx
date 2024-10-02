import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import Filter from "./Filter";
import "@testing-library/jest-dom";
import FilterItem from "../FilterItem/FilterItem";

describe("Filter component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <Filter performers={[]} genres={[]} years={[]}          
        />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
