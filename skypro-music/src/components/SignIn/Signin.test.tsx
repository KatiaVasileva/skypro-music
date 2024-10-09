import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "./SignIn";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

jest.mock("../../store/store");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockRouterPush = jest.fn();

describe("Signin component", () => {

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(jest.fn());
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("renders correctly", () => {
    const { container } = render(<SignIn />);
    expect(container).toMatchSnapshot();
  });

  it("should display error when email field is empty on submit", () => {
    render(<SignIn />);
    fireEvent.click(screen.getByText("Войти"));
    expect(screen.getByText("Введите почту")).toBeInTheDocument();
  });

  it("should display error when password field is empty on submit", () => {
    render(<SignIn />);
    fireEvent.change(screen.getByPlaceholderText("Почта"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Войти"));
    expect(screen.getByText("Введите пароль")).toBeInTheDocument();
  });

  it("should display error when email field does not include @", () => {
    render(<SignIn />);
    fireEvent.change(screen.getByPlaceholderText("Почта"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Войти"));
    expect(screen.getByText("Неверный формат почты")).toBeInTheDocument();
  });

  it("should display error when password field contains less than 6 symbols", () => {
    render(<SignIn />);
    fireEvent.change(screen.getByPlaceholderText("Почта"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Пароль"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Войти"));
    expect(
      screen.getByText("Пароль должен быть более 6 символов")
    ).toBeInTheDocument();
  });
});
