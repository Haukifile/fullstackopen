import React from 'react'

const InputForm = (props) => (
	<form>
		<div>
		{props.title}<input
			value={props.content}
			onChange={props.controlFunc}
		/>
		</div>
      </form>
	  )


export default InputForm;