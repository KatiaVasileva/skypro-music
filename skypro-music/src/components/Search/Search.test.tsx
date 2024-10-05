import { render, screen } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";

jest.mock("../../store/store");

const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockUseAppSelector = useAppSelector as jest.Mock;
const mockDispatch = jest.fn();

describe("Search component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) =>
      selector({
        filter: {
          searchState: "",
        },
      })
    );
  });

  it("renders correctly", () => {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();
    expect(screen.getByPlaceholderText("Поиск")).toBeInTheDocument();
  });

  it("should show current search value", () => {
    const searchValue = "test";
    mockUseAppSelector.mockReturnValue({ searchState: searchValue });

    render(<Search />);

    const input = screen.getByPlaceholderText("Поиск");
    expect(input).toHaveValue(searchValue);
  });
});
