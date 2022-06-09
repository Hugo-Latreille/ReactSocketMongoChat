import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../assets/logo.svg";
import Logo2 from "./../assets/image.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIroutes";

const Login = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (handleValidation()) {
			const { username, password } = values;

			const { data } = await axios.post(loginRoute, {
				username,
				password,
			});
			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}
			if (data.status === true) {
				localStorage.setItem("chat-app-user", JSON.stringify(data.user));
				navigate("/");
			}
		}
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const toastOptions = {
		position: "bottom-right",
		autoClose: 800,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	const handleValidation = () => {
		const { username, password } = values;
		if (username.length === "") {
			toast.error("Email is required", toastOptions);
			return false;
		}
		if (password.length === "") {
			toast.error("Password is required", toastOptions);
			return false;
		}
		return true;
	};

	useEffect(() => {
		if (localStorage.getItem("chat-app-user")) {
			navigate("/");
		}
	});

	return (
		<>
			<FormContainer>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="brand">
						<img src={Logo2} alt="logo" />
						<h1>Develott</h1>
					</div>
					<input
						type="text"
						name="username"
						placeholder="username"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					<button type="submit">Login</button>
					<span>
						Don't have an account ? <Link to="/register">Register</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
};

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 6rem;
			display: block;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #00000076;
		border-radius: 2rem;
		padding: 3rem 5rem;
	}
	input {
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		color: white;
		width: 100%;
		font-size: 1rem;
		&:focus {
			border: 0.1rem solid #997af0;
			outline: none;
		}
	}
	button {
		background-color: #4e0eff;
		color: white;
		padding: 1rem 2rem;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		text-transform: uppercase;
		&:hover {
			background-color: #4e0eff;
		}
	}
	span {
		color: white;
		text-transform: uppercase;
		a {
			color: #4e0eff;
			text-decoration: none;
			font-weight: bold;
		}
	}
`;

export default Login;
