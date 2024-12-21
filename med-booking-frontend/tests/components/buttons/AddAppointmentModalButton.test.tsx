export {};
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import AddAppointmentModalButton from "../../../src/Components/buttons/AddAppointmentModalButton";
import { store } from "../../../src/store/store";

describe("AddAppointmentModalButton Form Open and Cancel", () => {
  test("renders the Add Appointment button", () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );
    expect(screen.getByText("Add Appointment")).toBeInTheDocument();
  });

  test("opens the form modal when Add Appointment button is clicked", () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );
    fireEvent.click(screen.getByText("Add Appointment"));
    expect(screen.getByText("Create Appointment")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Confirm Appointment/i })).toBeInTheDocument();
  });

  test("opens the cancel confirmation modal on cancel submission", () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );
    fireEvent.click(screen.getByText("Add Appointment"));
    fireEvent.click(screen.getByTestId("CloseIcon"));

    expect(screen.getByText("Are you sure you want to cancel?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /yes/i })).toBeVisible();
  });

  test("closes the cancel confirmation modal only, aka: cancel the cancel", async () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );

    // open the form modal, then try to cancel it
    fireEvent.click(screen.getByText("Add Appointment"));
    fireEvent.click(screen.getByTestId("CloseIcon"));
    // cancel the cancel modal
    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to cancel?")).not.toBeInTheDocument();
      expect(screen.queryByText("Create Appointment")).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /Confirm Appointment/i })).toBeInTheDocument();
    });
  });

  test("closes the form modal and cancel modal on confirm the cancel modal", async () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );

    // open the form modal, then try to cancel it
    fireEvent.click(screen.getByText("Add Appointment"));
    fireEvent.click(screen.getByTestId("CloseIcon"));
    // cancel the cancel modal
    fireEvent.click(screen.getByText("Yes"));

    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to cancel?")).not.toBeInTheDocument();
      expect(screen.queryByText("Create Appointment")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /Confirm Appointment/i })).not.toBeInTheDocument();
    });
  });
});
