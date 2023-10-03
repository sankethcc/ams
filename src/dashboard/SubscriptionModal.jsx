import React, { useEffect, useState } from "react";

import Select from "react-select";

const SubscriptionModal = (props) => {
  const { showModal, setShowModal, dataHandler } = props;
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState("");
  const [tax, setTax] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(feature);
    const lines = await feature.split('\n').map((line) => line.trim());
    // console.log(lines);
    // Filter out empty lines
    const nonEmptyLines = await lines.filter((line) => line !== '');


    const obj = {
      name,
      amount,
      period,
      nonEmptyLines,
      description,
      tax,
      TotalAmount,
      selectedOption
    };
    console.log(obj);
    dataHandler(obj);
    setName("");
    setAmount("");
    setPeriod("");
    setDescription("");
    setFeature("");
    setTax("");
    // setListItems([]);
    setTotalAmount("");
    setSelectedOption('');
    setShowModal(false);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  return (
    <>
      <div className="modal1-wrapper1">
        <div className="modal1-content1">
          <h3 className="text1-wrapper1-modal1">Create Subscription</h3>
          <div className="content1-wrapper1-2">
            <h5 className="modal1-type1-name1">Name</h5>
            <input
              type="text"
              className="modal1-type1"
              style={{width:"375px"}}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

          </div>
          <div className="content1-wrapper1-1">

            <div className="modal1-discount1-div1" style={{ width: "50%" }}>
              <h5 className="modal1-discount1-name1">Amount</h5>
              <input
                type="text"
                className="modal1-discount1"
                placeholder="00"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>

            <div className="modal1-validity1-div1" style={{ width: "50%", marginLeft:"5px"}}>
              <h5 className="modal1-validity1-name1">Period</h5>
              <select  className="modal1-validity2" onChange={(e) => {
                  setPeriod(e.target.value);
                }}>
                <option value="">Select an option</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
          </div>
          <div className="content1-wrapper1-4">
            <h5 className="modal1-desc1-name1">Description</h5>
            <input
              type="text"
              className="modal1-desc1"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="content1-wrapper1-2">
            <h5 className="modal1-type1-name1">Feature offering</h5>
            <textarea
              value={feature}
              type="text"
              className="modal1-type2"
              placeholder="example"
              style={{ width:"375px"}}
              onChange={(e) => {
                setFeature(e.target.value);
              }}
            />

          </div>
          <div className="content1-wrapper1-1">

            <div className="modal1-discount1-div1"  style={{ width:"50%"}}>
              <h5 className="modal1-discount1-name1">Tax regime</h5>
              <input
                type="text"
                className="modal1-discount1"
                placeholder="18%"
                onChange={(e) => {
                  setTax(e.target.value);
                }}
              />
            </div>

            <div className="modal1-validity1-div1" style={{ width:"50%"}}>
              <h5 className="modal1-validity1-name1">Total amount</h5>
              <input
                type="text"
                className="modal1-validity1"
               
                onChange={(e) => {
                  setTotalAmount(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="sub1_last1">
            <input type="radio" className="i" name="option"
              value="Included"
              onChange={handleOptionChange}
              checked={selectedOption === 'Included'}></input>
            <label>Included</label>
            <input type="radio" className="i1" name="option"
              value="Excluded"
              onChange={handleOptionChange}
              checked={selectedOption === 'Excluded'}></input>
            <label>Excluded</label>
          </div>


          <div className="modal1-buttons1">
            <button className="modal1-create1" onClick={submitHandler}>
              Create
            </button>
            <button
              className="modal1-cancel1"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionModal;
