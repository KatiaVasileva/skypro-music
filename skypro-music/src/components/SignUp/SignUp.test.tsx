import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from "./SignUp";
import { useAppDispatch } from "@/store/store";

jest.mock("../../store/store");

const mockUseAppDispatch = useAppDispatch as jest.Mock;

describe("Signup component", () => {
  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(jest.fn());
  });

  it("renders correctly", () => {
    const { container } = render(<SignUp />);
    expect(container).toMatchSnapshot();
  });

  it("should display error when username field is empty on submit", () => {
    render(<SignUp />);
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(screen.getByText("Введите имя")).toBeInTheDocument();
  });

  it("should display error when username field is less than 3 symbols on submit", () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), {
      target: { value: "An" },
    });
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(
      screen.getByText("Имя пользователя должно быть не менее 3 символов")
    ).toBeInTheDocument();
  });

  it("should display error when email field is empty on submit", () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), {
      target: { value: "Ann" },
    });
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(screen.getByText("Введите почту")).toBeInTheDocument();
  });

  it("should display error when email field does not include @", () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), {
      target: { value: "Ann" },
    });
    fireEvent.change(screen.getByPlaceholderText("Почта"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(screen.getByText("Неверный формат почты")).toBeInTheDocument();
  });

  it("should display error when password field is empty on submit", () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), {
      target: { value: "Ann" },
    });
    fireEvent.change(screen.getByPlaceholderText("Почта"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(screen.getByText("Введите пароль")).toBeInTheDocument();
  });

  it("should display error when password field contains less than 6 symbols", () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), {
      target: { value: "Ann" },
    });
    fireEvent.change(screen.getByPlaceholderText("Почта"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Пароль"), {
      target: { value: "12345" },
    });
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(
      screen.getByText("Пароль должен быть более 6 символов")
    ).toBeInTheDocument();
  });

  it("should display error when password and repeat password are different", () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Имя пользователя"), {
      target: { value: "Ann" },
    });
    fireEvent.change(screen.getByPlaceholderText("Почта"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Пароль"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Повторите пароль"), {
      target: { value: "123457" },
    });
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(screen.getByText("Пароли не совпадают")).toBeInTheDocument();
  });
});
