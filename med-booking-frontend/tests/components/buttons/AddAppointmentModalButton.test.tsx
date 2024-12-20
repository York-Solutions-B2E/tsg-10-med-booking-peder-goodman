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
    expect(screen.getByText("Patient Details")).toBeInTheDocument();
    expect(screen.getByText("Confirm Appointment")).toBeInTheDocument();
  });

  test("opens the cancel confirmation modal on cancel submission", () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );
    fireEvent.click(screen.getByText("Add Appointment"));
    // ? SWEEET the data-testId is included in the MUI component
    fireEvent.click(screen.getByTestId("CloseIcon"));
    expect(screen.getByText("Are you sure you want to cancel?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /yes/i })).toBeVisible();
  });

  test("closes the cancel confirmation modal on cancel the cancel modal", () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );

    expect(screen.queryByText("Create Appointment")).not.toBeInTheDocument();

    // open the form modal, then try to cancel it
    fireEvent.click(screen.getByText("Add Appointment"));
    fireEvent.click(screen.getByTestId("CloseIcon"));
    // cancel the cancel modal
    fireEvent.click(screen.getByText("Yes"));

    expect(screen.queryByText("Are you sure you want to cancel?")).not.toBeVisible();
    expect(screen.queryByText("Create Appointment")).toBeInTheDocument();
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
    });
  });
});

//
describe("AddAppointmentModalButton Form Submission modal", () => {
  // jest.mock("../../../src/Components/modals/ConfirmationAppointmentModal", () => <div>ConfirmationAppointmentModal</div>);

  
  test.skip("opens the confirmation modal on form submission", () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );

    // Open the form modal
    fireEvent.click(screen.getByText("Add Appointment"));

    // Mock the form submission handler to directly open the confirmation modal
    fireEvent.click(screen.getByText("Confirm Appointment"));

    // Check if the confirmation modal is open
    expect(screen.getByText("ConfirmationAppointmentModal")).toBeInTheDocument();
  });

  test.skip("dispatches actions on confirm submission", async () => {
    render(
      <Provider store={store}>
        <AddAppointmentModalButton />
      </Provider>
    );
    fireEvent.click(screen.getByText("Add Appointment"));
    fireEvent.submit(screen.getByText("Confirm Appointment"));
    fireEvent.click(screen.getByText("Submit"));
    // Add assertions to check if the appropriate actions are dispatched
    expect(screen.queryByText("ConfirmationAppointmentModal")).not.toBeInTheDocument();
  });
});
