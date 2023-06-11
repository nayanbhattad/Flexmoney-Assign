import React, { useState } from "react"
import { Form, Field } from "react-final-form"
import { Button, CircularProgress, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, TextField } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import Dropdown from "../../components/Dropdown"
import { LoadingButton } from "@mui/lab"

import logo from "../../assests/images/logo.png"
import sucess from '../../assests/images/success.png'
import error from '../../assests/images/error.png'
import InfoDialog from "../../components/Dialog"

function CredDetailsForm() {
	const [loading, setLoading] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [data, setData] = useState({})

	const handleClose = () => {
		setOpenDialog(false)
	}

	const validate = (values) => {
		const errors = {}
		let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
		let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/
		// let amexpRegEx = /^(?:3[47][0-9]{13})$/;
		// let discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

		if (!values.name) {
			errors.name = "This field is required"
		}
		if (!values.cardNo) {
			errors.cardNo = "This field is required"
		}
		if (values.cardNo && !values.cardNo.match(visaRegEx) && !values.cardNo.match(mastercardRegEx)) {
			errors.cardNo = "Invalid Visa or Mastercard"
		}
		if (!values.cvv) {
			errors.cvv = "This field is required"
		}
		if (values.cvv && values.cvv.length !== 3) {
			errors.cvv = "Invalid CVV"
		}
		if (!values.expiryMonth) {
			errors.expiryMonth = "This field is required"
		}
		if (values.expiryMonth && values.expiryMonth > 12) {
			errors.expiryMonth = "Invalid Month"
		}
		if (values.expiryMonth && values.expiryMonth.length !== 2) {
			errors.expiryMonth = "Invalid Format"
		}

		if (!values.expiryYear) {
			errors.expiryYear = "This field is required"
		}
		if (values.expiryYear && values.expiryYear < 23) {
			errors.expiryYear = "Invalid Year"
		}
		if (values.expiryYear && values.expiryYear.length !== 2) {
			errors.expiryYear = "Invalid Format"
		}
		return errors
	}
	const onSubmit = (values) => {
		setLoading(true)
		fetch("https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9", {
			method: "POST",
			headers: {
				Accept: "application.json",
				"Content-Type": "application/json",
				Origin: "https://instacred.me",
			},
			body: JSON.stringify(values),
		})
			.then((response) => {
				setLoading(false)
				return response.json()
			})
			.then((data) => {
				setLoading(false)
				setOpenDialog(true)
				setData(data)
				console.log(data)
			})
			.catch((error) => {
				setLoading(false)
				setData(error)
				setOpenDialog(true)
				console.log(error)
			})
	}
	return (
		<div className="card-details max-w-[800px]  min-w-[300px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
			<Paper elevation={4}>
				<div className="flex items-center gap-1 justify-between border-b-2 p-4">
					<div className="text-xl font-Bold md:text-lg sm:text-[16px] ">Credit Card Detail</div>
					<div>
						<img src={logo} alt="logo" width={105} />
					</div>
				</div>
				<div className="p-8">
					<Form
						style="width: 100%"
						onSubmit={onSubmit}
						validate={validate}
						render={({ handleSubmit, form, submitting, pristine, values, submitSucceeded }) => (
							<form onSubmit={handleSubmit}>
								<Field name="cardNo">
									{({ input, meta }) => (
										<div style={{ padding: "10px 0" }}>
											<TextField {...input} type="number" label="Card Number" size="small" fullWidth />
											{meta.error && meta.touched && (
												<div className="flex gap-1 items-center">
													<IconButton sx={{ px: 0 }} disabled>
														<ErrorOutlineIcon color="error" />
													</IconButton>
													<span className="text-red-600">{meta.error}</span>
												</div>
											)}
										</div>
									)}
								</Field>
								<Field name="name">
									{({ input, meta }) => (
										<div style={{ padding: "10px 0" }}>
											<TextField {...input} type="text" label="Name on Card" size="small" fullWidth />
											{meta.error && meta.touched && (
												<div className="flex gap-1 items-center">
													<IconButton sx={{ px: 0 }} disabled>
														<ErrorOutlineIcon color="error" />
													</IconButton>
													<span className="text-red-600">{meta.error}</span>
												</div>
											)}
										</div>
									)}
								</Field>

								<div className="flex md:flex-wrap sm:flex-wrap items-start 2xl:gap-4 xl:gap-4 lg:gap-4">
									<div className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-full sm:w-full">
										<Field name="expiryMonth">
											{({ input, meta }) => (
												<div style={{ padding: "10px 0" }}>
													<TextField {...input} type="number" label="Expiry Month (mm)" size="small" fullWidth />
													{meta.error && meta.touched && (
														<div className="flex gap-1 items-center">
															<IconButton sx={{ px: 0 }} disabled>
																<ErrorOutlineIcon color="error" />
															</IconButton>
															<span className="text-red-600">{meta.error}</span>
														</div>
													)}
												</div>
											)}
										</Field>
									</div>
									<div className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-full sm:w-full">
										<Field name="expiryYear">
											{({ input, meta }) => (
												<div style={{ padding: "10px 0" }}>
													<TextField {...input} type="number" label="Expiry Year (YY)" size="small" fullWidth />
													{meta.error && meta.touched && (
														<div className="flex gap-1 items-center">
															<IconButton sx={{ px: 0 }} disabled>
																<ErrorOutlineIcon color="error" />
															</IconButton>
															<span className="text-red-600">{meta.error}</span>
														</div>
													)}
												</div>
											)}
										</Field>
									</div>
								</div>
								<div className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 w-full">
									<Field name="cvv">
										{({ input, meta }) => (
											<div style={{ padding: "10px 0" }}>
												<TextField {...input} type="number" label="CVV" size="small" fullWidth />
												{meta.error && meta.touched && (
													<div className="flex gap-1 items-center">
														<IconButton sx={{ px: 0 }} disabled>
															<ErrorOutlineIcon color="error" />
														</IconButton>
														<span className="text-red-600">{meta.error}</span>
													</div>
												)}
											</div>
										)}
									</Field>
								</div>

								<div className="pt-2">
									<LoadingButton
										loading={loading}
										fullWidth
										type="submit"
										variant="contained"
										disableElevation
										size="medium"
										className="uppercase"
										disabled={pristine == false ? false : true}
									>
										Submit
									</LoadingButton>
								</div>
								{/* {loading && (
									<CircularProgress
										style={{
											position: "absolute",
											top: "45%",
											left: "45%",
											transform: `translate(-50%, -50%)`,
										}}
									/>
								)} */}
							</form>
						)}
					/>
				</div>
			</Paper>
			{openDialog && (
				<InfoDialog handleDialogClose={handleClose} dialogOpen={openDialog}>
					<DialogTitle id="alert-dialog-title">{"success" in data && data.success == true ? "Success" : "Error"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{"success" in data && data.success == true && (
								<div>
                                    <div className="flex items-center mx-auto pb-5">
                                        <img style={{margin:"0 auto"}} src={sucess} width={150}/>
                                    </div>
									<div>Request ID : {data.data.requestId}</div>
									<div>name : {data.data.name}</div>
									<div>requestDate : {data.data.requestDate}</div>
								</div>
							)}
                            {"success" in data && data.success == false && (
								<div>
                                    <div className="flex items-center mx-auto pb-5">
                                        <img style={{margin:"0 auto"}} src={error} width={150}/>
                                    </div>
									<div>Error: {data.data}</div>
								</div>
							)}
						</DialogContentText>
					</DialogContent>
					{/* <DialogActions>
						<Button onClick={handleClose}>Disagree</Button>
						<Button onClick={handleClose} autoFocus>
							Agree
						</Button>
					</DialogActions> */}
				</InfoDialog>
			)}
		</div>
	)
}

export default CredDetailsForm
