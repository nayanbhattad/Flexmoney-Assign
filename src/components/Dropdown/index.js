import React, { useState } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

export default function Dropdown({ label, onChange, options, labelKey, valueKey }) {
	const [value, setValue] = useState("")

	const handleChange = (event) => {
		setValue(event.target.value)
		onChange(event.target.value)
	}

	return (
		<Box>
			<FormControl fullWidth size="small">
				<InputLabel id={label}>Age</InputLabel>
				<Select
					labelId={label}
					id={label}
					value={value}
					label={label}
					onChange={handleChange}
				>
					{options.map((option,index) => {
						return (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						)
					})}
				</Select>
			</FormControl>
		</Box>
	)
}
