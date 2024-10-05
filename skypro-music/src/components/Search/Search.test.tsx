import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setSearchState } from "@/store/features/filterSlice";

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
    mockUseAppSelector.mockReturnValue({ searchState: "test" });
    render(<Search />);
    const input = screen.getByPlaceholderText("Поиск");
    expect(input).toHaveValue("test");
  });

  it("should dispatch setSearchState when input value changes", () => {
    mockUseAppSelector.mockReturnValue({ searchState: "" });
    render(<Search />);
    const input = screen.getByPlaceholderText("Поиск");
    fireEvent.change(input, { target: { value: "test" } });
    expect(mockDispatch).toHaveBeenCalledWith(setSearchState("test"));  
  });
});
