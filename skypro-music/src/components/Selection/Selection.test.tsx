import ReduxProvider from "@/store/ReduxProvider";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectionItem from "./Selection";

describe("Selection component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <SelectionItem id={""} />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
