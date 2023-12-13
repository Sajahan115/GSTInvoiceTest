import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

const AddItemModal = (props) => {
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    props.addItem(data);
    reset();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="form-container border border-2 border-warning rounded p-md-4 p-2 shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="description" className="mb-2">
                Item Description<span className="text-danger">*</span> :
              </label>
              <input
                id="description"
                type="text"
                placeholder="Enter Item Description"
                autoComplete="off"
                className="form-control"
                {...register("description", {
                  required: "Item Description is required",
                })}
              />
              {errors.description && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="phoneNumber" className="mb-2">
                HSN<span className="text-danger">*</span> :
              </label>
              <input
                id="HSN"
                type="number"
                placeholder="Enter HSN"
                className="form-control"
                {...register("HSN", {
                  required: "HSN is required",
                })}
              />
              {errors.HSN && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.HSN.message}
                </p>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="rate" className="mb-2">
                Rate<span className="text-danger">*</span> :
              </label>
              <input
                id="rate"
                type="number"
                placeholder="Enter Rate"
                step="any"
                className="form-control"
                {...register("rate", { required: "Rate is required" })}
              />
              {errors.rate && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.rate.message}
                </p>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="quantity" className="mb-2">
                Quanity<span className="text-danger">*</span> :
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Enter Quanity"
                className="form-control"
                {...register("quantity", { required: "Quanity is required" })}
              />
              {errors.quantity && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-100 text-center mt-2 d-flex justify-content-around">
            <button
              style={{ width: "45%" }}
              className="btn btn-primary px-3"
              onClick={() => {
                if (isValid) props.setModalShow(false);
              }}
            >
              Add
            </button>
            <div
              style={{ width: "45%" }}
              className="btn btn-danger px-3"
              onClick={() => {
                reset();
                props.setModalShow(false);
              }}
            >
              Close
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModal;
