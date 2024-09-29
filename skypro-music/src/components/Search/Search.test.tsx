import ReduxProvider from "@/store/ReduxProvider"
import { render, screen } from "@testing-library/react"
import Search from "./Search"
import "@testing-library/jest-dom";

describe("Search component", () => {
    it("renders search", () => {
        render(
          <ReduxProvider>
            <Search/>
          </ReduxProvider>
        );
    
        expect(screen.getByPlaceholderText("Поиск")).toBeInTheDocument();
      });
    
})