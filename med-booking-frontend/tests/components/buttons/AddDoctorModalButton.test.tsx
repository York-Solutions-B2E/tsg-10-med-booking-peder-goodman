import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import AddDoctorModalButton from "../../../src/Components/buttons/AddDoctorModalButton";
import { store } from "../../../src/store/store";

export {};

describe("AddDoctorModalButton Form Open and Cancel", () => {
  test("renders the Add Doctor button", () => {
    render(
      <Provider store={store}>
        <AddDoctorModalButton />
      </Provider>
    );
    expect(screen.getByText("Add New Doctor")).toBeInTheDocument();
  });

  test("opens the form modal when Add New Doctor button is clicked", () => {
    render(
      <Provider store={store}>
        <AddDoctorModalButton />
      </Provider>
    );
    fireEvent.click(screen.getByText("Add New Doctor"));
    expect(screen.getByRole("button", { name: /Add Doctor/i })).toBeInTheDocument();
  });

  test("opens the cancel confirmation modal on cancel submission", () => {
    render(
      <Provider store={store}>
        <AddDoctorModalButton />
      </Provider>
    );

    fireEvent.click(screen.getByText("Add New Doctor"));
    fireEvent.click(screen.getByTestId("CloseIcon"));

    expect(screen.getByText("Are you sure you want to cancel?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /yes/i })).toBeVisible();
  });

  test("closes the cancel confirmation modal only, aka: cancel the cancel", async () => {
    render(
      <Provider store={store}>
        <AddDoctorModalButton />
      </Provider>
    );

    // open the form modal, then try to cancel it
    fireEvent.click(screen.getByText("Add New Doctor"));
    fireEvent.click(screen.getByTestId("CloseIcon"));
    // cancel the cancel modal
    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Add Doctor/i })).toBeInTheDocument();
      expect(screen.queryByText("Are you sure you want to cancel?")).not.toBeInTheDocument();
    });
  });

  test("closes the form modal and cancel modal on confirm the cancel modal", async () => {
    render(
      <Provider store={store}>
        <AddDoctorModalButton />
      </Provider>
    );

    // open the form modal, then try to cancel it
    fireEvent.click(screen.getByText("Add New Doctor"));
    fireEvent.click(screen.getByTestId("CloseIcon"));
    // cancel the cancel modal
    fireEvent.click(screen.getByText("Yes"));

    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to cancel?")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /Add Doctor/i })).not.toBeInTheDocument();
    });
  });
});
