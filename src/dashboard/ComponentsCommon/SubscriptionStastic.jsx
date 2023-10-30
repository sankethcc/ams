import React from 'react'

const SubscriptionStastic = ({total, active, expired}) => {
  return (
    <div className="lap-5">
        <div className="lap-6">
          <div className="bike-29">Total management</div>
          <div className="bike-30">{total}</div>
          {/* <p className="pk">10% increase in last 28 days</p> */}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'6fr 6fr', gridRowGap:'20px', justifyContent:'center', textAlign:'center'}}>
        <div className="nonactive-subscription">
          Active <br />
          subscription
        </div>
        <div className="expired-people">
          Expired <br />
          Subscription
        </div>
        <div className="gold-31">{active}</div>
        <div className="gold-32">{expired}</div>
      </div>

        </div>
  )
}

export default SubscriptionStastic
