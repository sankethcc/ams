import React, { useEffect, useState } from "react";
import { updateSubscription,getSubscriptionById,deleteSubscription} from "../API/apis.js";
import { enqueueSnackbar } from "notistack";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";

const SubscriptionModalUpdate = (props) => {
  const { setShowModalUpdate, index } = props;
  // console.log(index)
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState(['']);
  const [tax, setTax] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [btn,setbtn]=useState("")

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const deleteHandler = async () => {
      try {
        const response = await deleteSubscription(index)
        console.log(response)
        enqueueSnackbar(`Subscription ${btn===true?"Activated": "Deactivated"} Successfully`, { variant: 'success' })
        setShowModalUpdate(true)

      }catch (error) {
        console.error("Error creating coupon:", error);
        enqueueSnackbar(`Network Error`, { variant: 'error' })
      }
  }
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
    console.log(feature)
  }
  useEffect(() => {
    getSubscriptionById(index)
      .then((response) => {
        // console.log(response)
        setName(response.name)
        setAmount(response.amount)
        setPeriod(response.period)
        setDescription(response.description)
        setFeature(JSON.parse(response.feature_offering))
        setTax(response.tax_regime)
        setTotalAmount(response.total)
        setSelectedOption(response.tax_excluded)
        setbtn(response.blocked)

      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }, [index]);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(TotalAmount)
    // console.log(feature);
    // const lines = await feature.split('\n').map((line) => line.trim());
    // console.log(lines);
    // Filter out empty lines
    // const nonEmptyLines = await lines.filter((line) => line !== '');
    if(!name || !amount ||!period ||!description ||!tax ||!selectedOption){
      enqueueSnackbar(`Please fill all fields`, { variant: 'error' })
    }else{

   
    const formData = new FormData();
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('period', period);
    formData.append('description', description);
    formData.append('feature_offering', JSON.stringify(feature));
    formData.append('tax_regime', tax);
    formData.append('tax_excluded', selectedOption);

    updateSubscription(index,formData)
      .then((data) => {
        // setUserData(data);
        console.log(data)
        enqueueSnackbar(`Subscription Updated Successfully`, { variant: 'success' })
        setShowModalUpdate('')
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        enqueueSnackbar(`Network Error`, { variant: 'error' })
      });
    
    // console.log(obj);

  
    setName("");
    setAmount("");
    setPeriod("");
    setDescription("");
    setFeature("");
    setTax("");
    // setListItems([]);
    setTotalAmount("");
    setSelectedOption('');
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
      <div className="modal-wrapper">
        <div className="modal1-content1">
          <h3 className="text1-wrapper1-modal1">Update Subscription</h3>
          <div className="content1-wrapper1-2">
            <h5 className="modal1-type1-name1">Name</h5>
            <input
              type="text"
              className="modal1-type1"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

          </div>
          <div className="content1-wrapper1-1">

            <div className="modal1-discount1-div1" style={{ width: "100%" }}>
              <h5 className="modal1-discount1-name1">Amount</h5>
              <input
                type="text"
                className="modal1-discount1"
                placeholder="00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>

            <div className="modal1-validity1-div1" style={{ width: "100%"}}>
              <h5 className="modal1-validity1-name1">Period</h5>
              <select  className="modal1-validity2" value={period} onChange={(e) => {
                  setPeriod(e.target.value);
                }}>
                
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
          </div>
          <div className="content1-wrapper1-4" style={{width:'100%'}}>
            <h5 className="modal1-desc1-name1">Description</h5>
            <input
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
            <div className={`feature-inputs-wrapper ${feature.length>1? 'more-feature':''}`}>

              
            {feature.map((data, index)=>{
              return(
                <div key={index} className="feature-input-list">
                <input
              maxLength={20}
              value={data}
              type="text"
              className="modal1-type2"
              placeholder={`Enter Feature ${index+1}`}
              onChange={(e) => {
                handleFeatureChange(e, index)
              }}
            />
            {feature.length>1?
            <FontAwesomeIcon icon={faRemove} onClick={()=>handleRemoveFeature(index)} />
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
                placeholder="tax%"
                value={tax}
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
                value={`${amount?(amount*tax/100)+parseInt(amount):''}`}
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
            <button className="modal1-create" onClick={submitHandler}>
              Update
            </button>
            <button className="modal1-create" style={{marginLeft:2, marginRight:2} } onClick={deleteHandler}>
              {btn===true?"Active": "InActive"}
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
    </>
  );
};

export default SubscriptionModalUpdate;
