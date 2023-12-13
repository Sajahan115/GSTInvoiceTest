import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Header from "../../components/Header";
import SaveIcon from "../../assets/save.png";
import EditIcon from "../../assets/edit.png";
import RemoveIcon from "../../assets/remove.png";
import "./GSTInvoice.css";
import AddItemModal from "./AddItemModal";

const GSTInvoice = () => {
  const [buyerDetails, setBuyerDetails] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState();
  const [GST, setGST] = useState({
    shipping: "",
    sgst: "",
    cgst: "",
    igst: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setBuyerDetails(data);
    setReadOnly(true);
  };

  const [itemData, setItemData] = useState([]);

  const addItem = (data) => {
    setItemData([...itemData, data]);
  };

  const removeItem = (index) => {
    const updatedItems = [...itemData];
    updatedItems.splice(index, 1);
    setItemData(updatedItems);
  };

  const subTotalCalc = () => {
    const subAmount = itemData.reduce(
      (total, item) => total + item.quantity * parseFloat(item.rate),
      0
    );
    setSubTotal(subAmount);
  };

  const handleGSTChanges = (event) => {
    const { name, value } = event.target;

    setGST({
      ...GST,
      [name]: value,
    });
  };

  console.log(GST);

  const calculateTotal = () => {
    if (!GST.igst) {
      console.log("no igst");
      let gst = parseInt(GST.cgst) + parseInt(GST.sgst);
      let totalAmount = parseInt(GST.shipping) + subTotal + subTotal * (gst / 100);
      setTotal(totalAmount);
    }
    if (GST.igst) {
      console.log("igst");
      let totalAmount = parseInt(GST.shipping) + subTotal + subTotal * (GST.igst / 100);
      setTotal(totalAmount);
    }
  };

  useEffect(() => {
    subTotalCalc();
    setGST({
      shipping: "",
      sgst: "",
      cgst: "",
      igst: "",
    });
    setTotal('')
  }, [itemData]);

  return (
    <>
      <Header title={"Create GST Invoice"} />
      <div className="container mt-60 p-md-3">
        <p className="pt-2 text-decoration-underline">
          Enter Details to generate Invoice
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container border border-2 border-warning rounded p-md-4 p-2 shadow"
        >
          <p>Buyer's details :</p>
          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="buyerName" className="mb-2">
                Buyer Name<span className="text-danger">*</span> :
              </label>
              <input
                id="buyerName"
                type="text"
                placeholder="Enter Buyer Name"
                className="form-control"
                value={buyerDetails?.name}
                {...register("buyerName", {
                  required: "Buyer Name is required",
                })}
                readOnly={readOnly}
              />
              {errors.buyerName && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.buyerName.message}
                </p>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="phoneNumber" className="mb-2">
                Phone Number<span className="text-danger">*</span> :
              </label>
              <input
                id="phoneNumber"
                type="number"
                placeholder="Enter Phone Number"
                className="form-control"
                value={buyerDetails?.phoneNumber}
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                readOnly={readOnly}
              />
              {errors.phoneNumber && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="gstIn" className="mb-2">
                GSTIN<span className="text-danger">*</span> :
              </label>
              <input
                id="gstIn"
                type="text"
                placeholder="Enter GSTIN"
                className="form-control"
                value={buyerDetails?.gstIn}
                {...register("gstIn", { required: "GSTIN is required" })}
                readOnly={readOnly}
              />
              {errors.gstIn && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.gstIn.message}
                </p>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="code" className="mb-2">
                Code<span className="text-danger">*</span> :
              </label>
              <input
                id="code"
                type="number"
                placeholder="Enter State Code"
                className="form-control"
                value={buyerDetails?.code}
                {...register("code", { required: "State Code is required" })}
                readOnly={readOnly}
              />
              {errors.code && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.code.message}
                </p>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="invoiceNo" className="mb-2">
                Invoice No<span className="text-danger">*</span> :
              </label>
              <input
                id="invoiceNo"
                type="text"
                placeholder="Enter Invoice No"
                className="form-control"
                value={buyerDetails?.invoiceNo}
                {...register("invoiceNo", {
                  required: "Invoice No is required",
                })}
                readOnly={readOnly}
              />
              {errors.invoiceNo && (
                <p role="alert" className="m-0 text-danger px-2">
                  {errors.invoiceNo.message}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            {!readOnly ? (
              <button className="btn btn-primary px-3 w-50" disabled={readOnly}>
                <img className="icon" src={SaveIcon} alt="SaveIcon" />
                Save
              </button>
            ) : (
              <div
                className="bg-warning border rounded w-50 px-3 py-2 justify-content-center align-items-center d-flex"
                onClick={() => setReadOnly(false)}
              >
                <img className="icon" src={EditIcon} alt="EditIcon" />
                Edit
              </div>
            )}
          </div>
        </form>
        {!itemData?.length > 0 ? (
          <div className="w-100 text-center my-3">
            <button
              className="btn btn-primary"
              onClick={() => setModalShow(true)}
            >
              Add Item
            </button>
          </div>
        ) : (
          <div className="border border-2 border-warning rounded p-md-4 p-2 shadow my-3 item-container">
            <p>Item Details:</p>
            <div className="overflow-auto">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-nowrap text-center" scope="col-5">
                      Sl.no
                    </th>
                    <th className="text-nowrap text-center" scope="col-5">
                      Description
                    </th>
                    <th className="text-nowrap text-center" scope="col-2">
                      HSN
                    </th>
                    <th className="text-nowrap text-center" scope="col-1">
                      Rate
                    </th>
                    <th className="text-nowrap text-center" scope="col">
                      Quantity
                    </th>
                    <th className="text-nowrap text-center" scope="col">
                      Net Amount
                    </th>
                    <th className="text-nowrap text-center" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((item, index) => (
                    <tr key={index}>
                      <th className="text-nowrap text-center" scope="row">
                        {index + 1}.
                      </th>
                      <th className="text-nowrap text-center" scope="row">
                        {item.description}
                      </th>
                      <th className="text-nowrap text-center" scope="row">
                        {item.HSN}
                      </th>
                      <th className="text-nowrap text-center" scope="row">
                        Rs.{item.rate}
                      </th>
                      <th className="text-nowrap text-center" scope="row">
                        {item.quantity}
                      </th>
                      <th className="text-nowrap text-center" scope="row">
                        Rs.{item.rate * item.quantity}
                      </th>
                      <th className="text-nowrap text-center" scope="row">
                        <img
                          src={RemoveIcon}
                          alt="remove"
                          style={{ width: "30px" }}
                          onClick={() => removeItem(index)}
                        />
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end m-2">
              <p className="fw-bold">Sub Total: Rs.{subTotal}</p>
            </div>
            <div className="d-flex justify-content-end m-2">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 fw-bold">Shipping: </p>
                  <input
                    type="number"
                    name="shipping"
                    value={GST.shipping}
                    onChange={handleGSTChanges}
                    placeholder="Enter Shipping Charges"
                    className="form-control"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 fw-bold">IGST: </p>
                  <input
                    type="number"
                    name="igst"
                    placeholder="Enter IGST"
                    className="form-control"
                    value={GST.igst}
                    onChange={handleGSTChanges}
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 fw-bold">CGST: </p>
                  <input
                    type="number"
                    name="cgst"
                    value={GST.cgst}
                    onChange={handleGSTChanges}
                    placeholder="Enter CGST"
                    className="form-control"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 fw-bold">SGST: </p>
                  <input
                    type="number"
                    name="sgst"
                    value={GST.sgst}
                    onChange={handleGSTChanges}
                    placeholder="Enter SGST"
                    className="form-control"
                  />
                </div>
                <div className="d-flex row align-items-center mb-3">
                  <button
                    className="btn btn-success mb-3"
                    onClick={calculateTotal}
                  >
                    Calculate Total
                  </button>
                  <p className="m-0 fw-bold">Total: Rs. {total}</p>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary rounded-circle add"
              onClick={() => setModalShow(true)}
            >
              +
            </button>
          </div>
        )}
      </div>
      <AddItemModal
        show={modalShow}
        setModalShow={setModalShow}
        addItem={addItem}
      />
    </>
  );
};

export default GSTInvoice;
