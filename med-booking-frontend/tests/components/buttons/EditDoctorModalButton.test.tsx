import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import EditDoctorModalButton from "../../../src/Components/buttons/EditDoctorModalButton";
import { store } from "../../../src/store/store";


const mockEditDoctor: DoctorDetails = {
  id: 3,
  firstName: "Victor",
  lastName: "Frankenstein",
  specialization: {
    id: 1,
    name: "Cardiology",
  },
  doctorStatus: "ACTIVE"
};

describe("AddDoctorModalButton Form Open and Cancel", () => {
  test("renders the Add Doctor button", () => {
    render(
      <Provider store={store}>
        <EditDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );

    expect(screen.getByTestId("EditIcon")).toBeInTheDocument();
  });

  test("opens the form modal when Add New Doctor button is clicked", () => {
    render(
      <Provider store={store}>
        <EditDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("EditIcon"));

    expect(screen.getByText("Edit Doctor")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save Changes/i })).toBeInTheDocument();
  });

  test("opens the cancel confirmation modal on cancel submission", () => {
    render(
      <Provider store={store}>
        <EditDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("EditIcon"));
    fireEvent.click(screen.getByTestId("CloseIcon"));

    expect(screen.getByText("Are you sure you want to cancel?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /yes/i })).toBeVisible();
  });

  test("closes the cancel confirmation modal only, aka: cancel the cancel", async () => {
    render(
      <Provider store={store}>
        <EditDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );

    // open the form modal, then try to cancel it
    fireEvent.click(screen.getByTestId("EditIcon"));
    fireEvent.click(screen.getByTestId("CloseIcon"));
    // cancel the cancel modal
    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to cancel?")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Save Changes/i })).toBeInTheDocument();
    });
  });

  test("closes the form modal and cancel modal on confirm the cancel modal", async () => {
    render(
      <Provider store={store}>
        <EditDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );

    // open the form modal, then try to cancel it
    fireEvent.click(screen.getByTestId("EditIcon"));
    fireEvent.click(screen.getByTestId("CloseIcon"));
    // cancel the cancel modal
    fireEvent.click(screen.getByText("Yes"));

    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to cancel?")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /Save Changes/i })).not.toBeInTheDocument();
    });
  });
});
