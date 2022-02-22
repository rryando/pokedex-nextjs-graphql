import React from "react";
import { useRouter } from "next/router";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../pages/index";
import pokemonData from "./mocks/pokemonData.json";

describe("Home", () => {
  it("renders a correctly", async () => {
    const { container } = render(<Home />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
