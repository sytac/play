import React from 'react'

import Loader from 'halogen/PulseLoader'

export default (props) => {
  return (
    <center>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        >
          <Loader
            color={props.color}
          />
        </div>
      </div>
    </center>
  )
}
