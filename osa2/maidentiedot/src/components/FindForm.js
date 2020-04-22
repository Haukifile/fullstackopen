import React from 'react'

const FindForm = (props) => (
	<form>
		<div>
		Filter: <input
			value={props.content}
			onChange={props.controlFunc}
		/>
		</div>
      </form>
	  )


export default FindForm