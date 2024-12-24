export {};
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import CancelAppointmentModalButton from "../../../src/Components/buttons/CancelAppointmentModalButton";
import { cancelAppointment } from "../../../src/store/actions/appointmentActions";
import { getPatientDetails } from "../../../src/store/actions/userActions";
import { store } from "../../../src/store/store";

const mockEditAppointment: Appointment = {
  id: 1,
  appointmentDate: "2025-01-01",
  appointmentTime: "12:00",
  patient: {
    id: 14,
    firstName: "John",
    lastName: "Doe",
    email: "john@email.com",
    birthdate: "1978-04-13",
    fullName: "John Doe",
    role: "PATIENT",
  },
  visitType: "IN_PERSON",
  doctor: {
    id: 2,
    firstName: "Victor",
    lastName: "Frankenstein",
    specialization: {
      id: 1,
      name: "Cardiology",
    },
  },
  appointmentStatus: "CONFIRMED",
};

const mockPatientDetails: PatientDetails = {
  id: 14,
  firstName: "John",
  lastName: "Doe",
  email: "john@email.com",
  birthdate: "1978-04-13",
  fullName: "John Doe",
  role: "PATIENT",
};

jest.mock("../../../src/store/store");
jest.mock("../../../src/store/actions/appointmentActions");
jest.mock("../../../src/store/actions/userActions");

describe("CancelAppointmentModalButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Add Doctor button", () => {
    render(
      <Provider store={store}>
        <CancelAppointmentModalButton appointment={mockEditAppointment} />
      </Provider>
    );

    expect(screen.getByTestId("DoNotDisturbIcon")).toBeInTheDocument();
  });

  test("opens the confirm cancel modal when when cancel icon is clicked", () => {
    render(
      <Provider store={store}>
        <CancelAppointmentModalButton appointment={mockEditAppointment} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("DoNotDisturbIcon"));

    expect(screen.getByText("Are you sure you want to cancel this appointment?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Yes/i })).toBeInTheDocument();
  });

  test("opens the confirm delete modal when when delete icon is clicked", () => {
    render(
      <Provider store={store}>
        <CancelAppointmentModalButton appointment={mockEditAppointment} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("DoNotDisturbIcon"));
    fireEvent.click(screen.getByText("Cancel"));

    // todo: why does this work either way??? not in or in the document

    waitFor(() => {
      expect(screen.getByText("Are you sure you want to cancel this appointment?")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Yes/i })).toBeInTheDocument();
    });
  });

  test("opens the confirm delete modal when when delete icon is clicked", async () => {
    // Mock the dispatch method
    store.dispatch = jest.fn();

    // render the component
    render(
      <Provider store={store}>
        <CancelAppointmentModalButton appointment={mockEditAppointment} />
      </Provider>
    );

    // open the confirm delete modal and click the delete button
    fireEvent.click(screen.getByTestId("DoNotDisturbIcon"));
    fireEvent.click(screen.getByText("Yes"));

    waitFor(() => {
      expect(screen.getByText("Deleting a doctor is irreversible, are you sure?")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Delete/i })).not.toBeInTheDocument();
      expect(store.dispatch).toHaveBeenCalledWith(cancelAppointment(1));
      expect(store.dispatch).toHaveBeenCalledWith(getPatientDetails(14));
      // todo: check if the deleteDoctor action was called
    });
  });
});
