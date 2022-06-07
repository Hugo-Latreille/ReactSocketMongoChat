/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIroutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const getCurrentUser = async () => {
			if (!localStorage.getItem("chat-app-user")) {
				return navigate("/login");
			}
			setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
			setIsLoaded(true);
		};
		getCurrentUser();
	}, []);

	useEffect(() => {
		const getAllUsers = async () => {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					const { data } = await axios.get(
						`${allUsersRoute}/${currentUser._id}`
					);
					return setContacts(data);
				}

				navigate("/setAvatar");
			}
		};
		getAllUsers();
	}, [currentUser]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<Container>
			<div className="container">
				<Contacts
					contacts={contacts}
					currentUser={currentUser}
					changeChat={handleChatChange}
				/>
				{isLoaded && currentChat === undefined ? (
					<Welcome />
				) : (
					<ChatContainer currentChat={currentChat} currentUser={currentUser} />
				)}
			</div>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background-color: #131324;
	.container {
		height: 85vh;
		width: 85vw;
		background-color: #00000076;
		display: grid;
		grid-template-columns: 25% 75%;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}
	}
`;

export default Chat;
