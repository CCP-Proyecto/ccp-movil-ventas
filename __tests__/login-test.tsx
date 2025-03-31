import React from "react";
import { render } from "@testing-library/react-native";
import Login from "@/app/login";

describe("Login Screen", () => {
  it("debería renderizar los inputs de usuario y contraseña", () => {
    const { getByPlaceholderText } = render(<Login />);

    const usernameInput = getByPlaceholderText("Usuario");
    const passwordInput = getByPlaceholderText("Contraseña");

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
});
