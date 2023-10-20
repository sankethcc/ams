import React, { useEffect, useState } from "react";
import { createSubscription} from "../API/apis.js";

import Select from "react-select";
import { enqueueSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

const SubscriptionModal = (props) => {
  const { showModal, setShowModal, dataHandler } = props;
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState(['']);
  const [tax, setTax] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleFeatureChange = (event, index)=>{
    const newFeature = [...feature]
    newFeature[index] = event.target.value
    setFeature(newFeature)
  }
  const handleRemoveFeature = (index)=>{
    const newFeature = [...feature];
    newFeature.splice(index, 1);
    setFeature(newFeature)
  }
  const handleAddFeature = ()=>{
    if(feature.length <= 4){
      const newFeature = [...feature, ""]
      setFeature(newFeature)

    }
  }
  const submitHandler = async (e) => {
    // const lines = await feature.split('\n').map((line) => line.trim());
    // const nonEmptyLines = await lines.filter((line) => line !== '');
    if(!name || !amount ||!period ||!description ||!tax ||!selectedOption){
      enqueueSnackbar(`Please fill all fields`, { variant: 'error' })
    }else{
    e.preventDefault();
    // console.log(feature);
    // console.log(lines);
    // Filter out empty lines
    const formData = new FormData();
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('period', period);
    formData.append('description', description);
    formData.append('feature_offering', feature);
    formData.append('tax_regime', tax);
    formData.append('tax_excluded', selectedOption);

    createSubscription(formData)
      .then((data) => {
        // setUserData(data);
        console.log(data)
        const obj = {
          name,
          amount,
          period,
          feature_offering: feature,
          description,
          tax_regime: tax,
          total: TotalAmount,
          selectedOption,
          _id: data._id
        };
        enqueueSnackbar(`Subscription Created Successfully`, { variant: 'success' })
        dataHandler(obj);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        enqueueSnackbar(`Network Error`, { variant: 'error' })
      });
    
    // console.log(obj);

    // dataHandler(obj);
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
      <div className="modal-wrapper">
        <div className="modal1-content1">
          <h3 className="text1-wrapper1-modal1">Create Subscription</h3>
          <div className="content1-wrapper1-2">
            <h5 className="modal1-type1-name1">Name</h5>
            <input
              type="text"
              className="modal1-type1"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

          </div>
          <div className="content1-wrapper1-1">

            <div className="modal1-discount1-div1" style={{ width: "100%"}}>
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

            <div className="modal1-validity1-div1" style={{ width: "100%"}}>
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
            <div className="feature-head">
            <h5 className="modal1-type1-name1">Feature offering</h5>
            <FontAwesomeIcon onClick={handleAddFeature} icon={faAdd} />

            </div>
              <div className="feature-inputs-wrapper">

              
            {feature.map((data, index)=>{
              return(
                <div className="feature-input-list">
                <input
              maxLength={20}
              value={data}
              type="text"
              className="modal1-type2"
              placeholder="example"
              onChange={(e) => {
                handleFeatureChange(e, index)
              }}
            />
            {feature.length>1?
            <FontAwesomeIcon icon={faRemove} onClick={handleRemoveFeature} />
            :null}
                </div>
              )
            })}
            </div>
            {/* <input
              maxLength={20}
              value={feature}
              type="text"
              className="modal1-type2"
              placeholder="example"
              onChange={(e) => {
                setFeature(e.target.value);
              }}
            /> */}

          </div>
          <div className="content1-wrapper1-1">

            <div className="modal1-discount1-div1"  style={{ width:"100%"}}>
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

            <div className="modal1-validity1-div1" style={{ width:"100%"}}>
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
            <input type="radio" className="i" name="option"
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
