import ReduxProvider from "@/store/ReduxProvider";
import { render, screen } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom";

describe("Search component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByPlaceholderText("Поиск")).toBeInTheDocument();
  });
});
