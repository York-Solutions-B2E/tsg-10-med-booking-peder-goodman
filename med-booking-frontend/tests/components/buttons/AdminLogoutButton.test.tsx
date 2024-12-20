import { fireEvent, render } from "@testing-library/react";
import { AdminLogoutButton } from "../../../src/Components/buttons/AdminLogoutButton";
import { logoutUser } from "../../../src/store/actions/userActions";
import { store } from "../../../src/store/store";

jest.mock("../../../src/store/store");
jest.mock("../../../src/store/actions/userActions");

describe("AdminLogoutButton", () => {
  test("renders the logout button", () => {
    const { getByText } = render(<AdminLogoutButton />);
    expect(getByText("Logout")).toBeInTheDocument();
  });

  test("dispatches logoutUser async thunk on button click", async () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
    const mockLogoutUser = logoutUser as jest.MockedFunction<typeof logoutUser>;
    mockLogoutUser.mockReturnValue(jest.fn());

    const { getByText } = render(<AdminLogoutButton />);
    fireEvent.click(getByText("Logout"));

    expect(mockDispatch).toHaveBeenCalledWith(logoutUser());
  });
});
