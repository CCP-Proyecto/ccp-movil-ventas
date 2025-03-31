import React from "react";
import { render } from "@testing-library/react-native";
import Home from "@/app/index";

describe("Home Screen", () => {
  it("debería mostrar los 4 botones del menú", () => {
    const { getByText } = render(<Home />);

    expect(getByText("Clientes")).toBeTruthy();
    expect(getByText("Rutas")).toBeTruthy();
    expect(getByText("Visitas")).toBeTruthy();
    expect(getByText("Cerrar Sesión")).toBeTruthy();
  });
});
