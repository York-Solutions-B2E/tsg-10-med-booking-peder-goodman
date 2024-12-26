export {};
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import DeactivateDoctorModalButton from "../../../src/Components/buttons/DeactivateDoctorModalButton";
import { deactivateDoctor, getSpecializationsAndDoctors } from "../../../src/store/actions/doctorActions";
import { store } from "../../../src/store/store";

const mockEditDoctor: DoctorDetails = {
  id: 3,
  firstName: "Victor",
  lastName: "Frankenstein",
  specialization: {
    id: 1,
    name: "Cardiology",
  },
};

jest.mock("../../../src/store/store");
jest.mock("../../../src/store/actions/doctorActions");

describe("DeactivateDoctorModalButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Add Doctor button", () => {
    render(
      <Provider store={store}>
        <DeactivateDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );

    expect(screen.getByTestId("DeleteForeverIcon")).toBeInTheDocument();
  });

  test("opens the confirm delete modal when when delete icon is clicked", () => {
    render(
      <Provider store={store}>
        <DeactivateDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("DeleteForeverIcon"));

    expect(screen.getByText("Deleting a doctor is irreversible, are you sure?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  test("closes the confirm delete modal without deleting doctor", async () => {
    render(
      <Provider store={store}>
        <DeactivateDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("DeleteForeverIcon"));
    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Deleting a doctor is irreversible, are you sure?")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /Yes/i })).not.toBeInTheDocument();
    });
  });

  test("triggers delete doctor thunks & closes the confirm delete modal", async () => {
    // Mock the dispatch method
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    // render the component
    render(
      <Provider store={store}>
        <DeactivateDoctorModalButton doctor={mockEditDoctor} />
      </Provider>
    );

    // open the confirm delete modal and click the delete button
    fireEvent.click(screen.getByTestId("DeleteForeverIcon"));
    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(screen.queryByText("Deleting a doctor is irreversible, are you sure?")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /Delete/i })).not.toBeInTheDocument();
    });

    expect(mockDispatch).toHaveBeenCalledWith(deactivateDoctor(3));
    expect(mockDispatch).toHaveBeenCalledWith(getSpecializationsAndDoctors());
  });
});
