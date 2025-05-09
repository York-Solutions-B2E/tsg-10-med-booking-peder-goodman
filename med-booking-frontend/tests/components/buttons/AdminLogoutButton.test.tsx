import { fireEvent, render, screen } from "@testing-library/react";
import { AdminLogoutButton } from "../../../src/Components/buttons/AdminLogoutButton";
import { logoutUser } from "../../../src/store/actions/userActions";
import { store } from "../../../src/store/store";

jest.mock("../../../src/store/store");
jest.mock("../../../src/store/actions/userActions");

describe("AdminLogoutButton", () => {
  test("renders the logout button", () => {
    render(<AdminLogoutButton />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("dispatches logoutUser async thunk on button click", async () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    render(<AdminLogoutButton />);
    fireEvent.click(screen.getByText("Logout"));

    expect(mockDispatch).toHaveBeenCalledWith(logoutUser());
  });
});
