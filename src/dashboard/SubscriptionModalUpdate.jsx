/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  updateSubscription,
  getSubscriptionById,
  deleteSubscription,
} from "../API/apis.js";
import { enqueueSnackbar } from "notistack";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";

const SubscriptionModalUpdate = (props) => {
  const { setShowModalUpdate, index } = props;
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState([""]);
  const [tax, setTax] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [btn, setbtn] = useState("");
  const user_allowed = ["student", "teacher", "management", "parent"];
  const [userAllowed, setUserAllowed] = useState([]);

  const [selectedValue, setSelectedValue] = useState();

  const handleRadioChange = (event) => {
    const newValue = event.target.value === "true";
    setSelectedValue(newValue);
  };

  const handleCheckboxChange = (e, role) => {
    const newSelectedOption = [...userAllowed];
    const currentSelected = newSelectedOption.indexOf(role);
    if (currentSelected === -1) {
      newSelectedOption.push(role);
    } else {
      newSelectedOption.splice(currentSelected, 1);
    }
    setUserAllowed(newSelectedOption);
    console.log(userAllowed);
  };

  const deleteHandler = async () => {
    try {
      const response = await deleteSubscription(index);
      console.log(response);
      enqueueSnackbar(
        `Subscription ${
          btn === true ? "Activated" : "Deactivated"
        } Successfully`,
        { variant: "success" }
      );
      setShowModalUpdate(true);
    } catch (error) {
      console.error("Error creating coupon:", error);
      enqueueSnackbar(`Network Error`, { variant: "error" });
    }
  };
  const handleFeatureChange = (event, index) => {
    const newFeature = [...feature];
    newFeature[index] = event.target.value;
    setFeature(newFeature);
  };
  const handleRemoveFeature = (index) => {
    const newFeature = [...feature];
    newFeature.splice(index, 1);
    setFeature(newFeature);
  };
  const handleAddFeature = () => {
    if (feature.length <= 9) {
      const newFeature = [...feature, ""];
      setFeature(newFeature);
    }
    console.log(feature);
  };
  useEffect(() => {
    getSubscriptionById(index)
      .then((response) => {
        setName(response.name);
        setAmount(response.amount);
        setPeriod(response.period);
        setDescription(response.description);
        setFeature(JSON.parse(response.feature_offering));
        setTax(response.tax_regime);
        setTotalAmount(response.total);
        setSelectedValue(response.tax_excluded);
        setbtn(response.blocked);
        setUserAllowed(response.user_allowed);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }, [index]);
  const submitHandler = async (e) => {
    if (!name || !amount || !period || !description) {
      enqueueSnackbar(`Please fill all fields`, { variant: "error" });
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("amount", amount);
      formData.append("period", period);
      formData.append("description", description);
      formData.append("feature_offering", JSON.stringify(feature));
      formData.append("tax_regime", tax);
      formData.append("tax_excluded", selectedValue);
      formData.append("user_allowed", userAllowed);
      updateSubscription(index, formData)
        .then((data) => {
          console.log(data);
          enqueueSnackbar(`Subscription Updated Successfully`, {
            variant: "success",
          });
          setShowModalUpdate("");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          enqueueSnackbar(`Network Error`, { variant: "error" });
        });

      setName("");
      setAmount("");
      setPeriod("");
      setDescription("");
      setFeature("");
      setTax("");
      setTotalAmount("");
      setShowModalUpdate(false);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <div className="modal-wrapper">
          <div className="modal1-content1">
            <h3 className="text1-wrapper1-modal1">Update Subscription</h3>
            <div className="content1-wrapper1-2">
              <h5 className="modal1-type1-name1">Name</h5>
              <input
                required
                type="text"
                className="modal1-type1"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div style={{ width: "100%" }} className="content-wrapper-3">
              <h5 className="modal-code-name">User Allowed</h5>
              <div class="accordion coupon-select" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Select Role
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      {user_allowed.map((data, i) => {
                        return (
                          <div className="accordion-input-wrapper" key={i}>
                            <input
                              style={{ width: "15%" }}
                              checked={userAllowed?.includes(data)}
                              onChange={(e) => handleCheckboxChange(e, data)}
                              type="checkbox"
                              name={data}
                              id={data}
                              value={data}
                            />
                            <label for={data}>
                              <span style={{ textTransform: "capitalize" }}>
                                {data}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content1-wrapper1-1">
              <div className="modal1-discount1-div1" style={{ width: "100%" }}>
                <h5 className="modal1-discount1-name1">Amount</h5>
                <input
                  required
                  type="text"
                  className="modal1-discount1"
                  placeholder="00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>

              <div className="modal1-validity1-div1" style={{ width: "100%" }}>
                <h5 className="modal1-validity1-name1">Period</h5>
                <select
                  className="modal1-validity2"
                  value={period}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                  }}
                >
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
              </div>
            </div>
            <div className="content1-wrapper1-4" style={{ width: "100%" }}>
              <h5 className="modal1-desc1-name1">Description</h5>
              <input
                required
                type="text"
                value={description}
                className="modal1-desc1"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="content1-wrapper1-2">
              <div className="feature-head">
                <h5 className="modal1-type1-name1">Feature offering</h5>
                <FontAwesomeIcon onClick={handleAddFeature} icon={faAdd} />
              </div>
              <div
                className={`feature-inputs-wrapper ${
                  feature.length > 1 ? "more-feature" : ""
                }`}
              >
                {feature.map((data, index) => {
                  return (
                    <div key={index} className="feature-input-list">
                      <input
                        required
                        maxLength={100}
                        value={data}
                        type="text"
                        className="modal1-type2"
                        placeholder={`Enter Feature ${index + 1}`}
                        onChange={(e) => {
                          handleFeatureChange(e, index);
                        }}
                      />
                      {feature.length > 1 ? (
                        <FontAwesomeIcon
                          icon={faRemove}
                          onClick={() => handleRemoveFeature(index)}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="content1-wrapper1-1">
              <div className="modal1-discount1-div1" style={{ width: "100%" }}>
                <h5 className="modal1-discount1-name1">Tax regime</h5>
                <input
                  disabled={selectedValue}
                  type="text"
                  className="modal1-discount1"
                  placeholder="tax%"
                  value={tax}
                  onChange={(e) => {
                    setTax(e.target.value);
                  }}
                />
              </div>

              <div className="modal1-validity1-div1" style={{ width: "100%" }}>
                <h5 className="modal1-validity1-name1">Total amount</h5>
                <input
                  type="text"
                  className="modal1-validity1"
                  value={`${
                    amount ? (amount * tax) / 100 + parseInt(amount) : ""
                  }`}
                  onChange={(e) => {
                    setTotalAmount(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="sub1_last1">
              <label>
                <input
                  className="i"
                  type="radio"
                  name="status"
                  value="false"
                  checked={!selectedValue}
                  onChange={handleRadioChange}
                />
                Included
              </label>
              <label>
                <input
                  className="i"
                  type="radio"
                  name="status"
                  value="true"
                  checked={selectedValue}
                  onChange={handleRadioChange}
                />
                Excluded
              </label>
            </div>

            <div className="modal1-buttons1">
              <button type="submit" className="modal1-create">
                Update
              </button>
              <button
                className="modal1-create"
                style={{ marginLeft: 2, marginRight: 2 }}
                onClick={deleteHandler}
              >
                {btn === true ? "Active" : "InActive"}
              </button>
              <button
                className="modal1-cancel"
                onClick={() => {
                  setShowModalUpdate(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SubscriptionModalUpdate;
