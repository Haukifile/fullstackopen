/* eslint-disable react/prop-types */
import React from 'react'

const FilterForm = (props) => (
  <form>
    <div>
		Filter: <input
        value={props.content}
        onChange={props.controlFunc}
      />
    </div>
  </form>
)


export default FilterForm