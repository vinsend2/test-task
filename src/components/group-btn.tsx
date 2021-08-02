import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	display: block;
	box-sizing: border-box;

	padding: 10px;
	margin-left: 10px;

	border: none;
	border-radius: 5px;
	background-color: blue;

	font-size: 17px;
	font-family: Arial, Helvetica, sans-serif;
	color: white;

	cursor: pointer;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		opacity: 0.6;
	}
`;



interface GroupButtonProps {
	setGrouped(isGrouped: boolean): void;
	grouped: boolean;
}

const GroupButton: React.FC<GroupButtonProps> = (props) => {
	const { setGrouped, grouped } = props;

	return (
		<Button
			onClick={() => {
				setGrouped(!grouped);
			}}
		>
			{grouped ? 'Разгруппировать' : 'Группировать'}
		</Button>
	);
};

export default GroupButton;
