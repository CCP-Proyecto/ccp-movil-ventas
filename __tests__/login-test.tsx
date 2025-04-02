import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "@/app/(auth)/login-screen"; // Asegúrate de que apunta al archivo correcto, no a index.tsx

// Mock del cliente de autenticación
jest.mock("@/services/auth/auth-client", () => ({
  authClient: {
    useSession: jest.fn(() => ({ data: null })),
    signIn: jest.fn(),
    signOut: jest.fn(),
  },
}));

describe("Login Screen", () => {
  it("renders correctly with all elements", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    expect(getByText("CCP")).toBeTruthy();
    expect(getByText("COMPRAS FÁCILES, ENVÍOS RÁPIDOS")).toBeTruthy();
    expect(getByText("Bienvenido")).toBeTruthy();
    expect(getByText("Inicio de sesión")).toBeTruthy();

    expect(getByPlaceholderText("Usuario")).toBeTruthy();
    expect(getByPlaceholderText("Contraseña")).toBeTruthy();

    expect(getByText("Iniciar sesión")).toBeTruthy();
    expect(getByText("Regístrate")).toBeTruthy();
  });

  it("updates username input correctly", () => {
    const { getByPlaceholderText } = render(<Login />);
    const usernameInput = getByPlaceholderText("Usuario");

    fireEvent.changeText(usernameInput, "testuser");
    expect(usernameInput.props.value).toBe("testuser");
  });

  it("updates password input correctly", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText("Contraseña");

    fireEvent.changeText(passwordInput, "testpass");
    expect(passwordInput.props.value).toBe("testpass");
  });

  it("password input should have secureTextEntry enabled", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText("Contraseña");

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("has correct styles", () => {
    const { getByText } = render(<Login />);
    const logoText = getByText("CCP");

    expect(logoText.props.style).toMatchObject({
      fontSize: 48,
      textAlign: "center",
    });
  });
});
