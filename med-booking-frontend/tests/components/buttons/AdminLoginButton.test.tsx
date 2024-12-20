// import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
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
    window.location = originalLocation;
  });

    test("renders the Admin Login button", () => {
      const { getByText } = render(<AdminLoginButton />);
      expect(getByText("Admin Login")).toBeInTheDocument();
    });

  test("redirects to the correct login URL when port is 3000", () => {
    window.location.port = "3000";
    const { getByText } = render(<AdminLoginButton />);
    fireEvent.click(getByText("Admin Login"));
    expect(window.location.href).toBe("//localhost:8080/api/auth/login");
  });

  test("redirects to the correct login URL when port is not 3000", () => {
    window.location.port = "4000";
    const { getByText } = render(<AdminLoginButton />);
    fireEvent.click(getByText("Admin Login"));
    expect(window.location.href).toBe("//localhost:4000/api/auth/login");
  });

  test("redirects to the correct login URL when port is empty", () => {
    window.location.port = "";
    const { getByText } = render(<AdminLoginButton />);
    fireEvent.click(getByText("Admin Login"));
    expect(window.location.href).toBe("//localhost/api/auth/login");
  });
});
