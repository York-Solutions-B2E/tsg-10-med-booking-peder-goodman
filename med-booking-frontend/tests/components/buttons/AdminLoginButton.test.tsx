import { fireEvent, render, screen } from "@testing-library/react";
import { AdminLoginButton } from "../../../src/Components/buttons/AdminLoginButton";

describe("AdminLoginButton", () => {
  const originalLocation = window.location;

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { ...originalLocation, href: "", port: "", hostname: "localhost" },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: originalLocation,
    });
  });

  test("renders the Admin Login button", () => {
    render(<AdminLoginButton />);
    expect(screen.getByText("Admin Login")).toBeInTheDocument();
  });

  test("redirects to the correct login URL when port is 3000", () => {
    window.location.port = "3000";
    render(<AdminLoginButton />);
    fireEvent.click(screen.getByText("Admin Login"));
    expect(window.location.href).toBe("//localhost:8080/api/auth/login");
  });

  test("redirects to the correct login URL when port is not 3000", () => {
    window.location.port = "4000";
    render(<AdminLoginButton />);
    fireEvent.click(screen.getByText("Admin Login"));
    expect(window.location.href).toBe("//localhost:4000/api/auth/login");
  });

  test("redirects to the correct login URL when port is empty", () => {
    window.location.port = "";
    render(<AdminLoginButton />);
    fireEvent.click(screen.getByText("Admin Login"));
    expect(window.location.href).toBe("//localhost/api/auth/login");
  });
});
