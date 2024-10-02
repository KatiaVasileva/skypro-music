import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterItem from "../FilterItem/FilterItem";
import Icon from "./Icon";

describe("Icon component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <Icon name={"name"} />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
