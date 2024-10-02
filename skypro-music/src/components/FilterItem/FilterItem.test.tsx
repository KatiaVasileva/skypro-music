import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterItem from "../FilterItem/FilterItem";

describe("FilterItem component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <FilterItem
          filterName=""
          filterContent={[]}
          selectedValues={[]}
          isFilterElementClicked={false}
          handleFilterItemClick={function (filterElement: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});