import ReduxProvider from "@/store/ReduxProvider";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Player from "./Player";

describe("Player component", () => {
  let playStub: jest.SpyInstance<Promise<void>, [], any>;
  let pauseStub: jest.SpyInstance;

  beforeEach(() => {
    playStub = jest.spyOn(window.HTMLMediaElement.prototype, "play");
    pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    playStub.mockRestore();
    pauseStub.mockRestore();
  });

  it("renders correctly", () => {
    playStub.mockResolvedValue();

    const { container } = render(
      <ReduxProvider>
        <Player />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
