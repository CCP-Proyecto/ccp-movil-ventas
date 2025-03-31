import React from "react";
import { render } from "@testing-library/react-native";
import Rutas from "@/app/rutas";

describe("Rutas Screen", () => {
  it('debería mostrar el texto "Rutas"', () => {
    const { getByText } = render(<Rutas />);

    const titleText = getByText("Rutas");

    expect(titleText).toBeTruthy();
  });
});
