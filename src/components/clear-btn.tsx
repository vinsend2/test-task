import React from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '../redux/actions';
import styled from 'styled-components';

const Button = styled.button`
	display: block;
	box-sizing: border-box;

	padding: 10px;
	margin-left: 10px;

	border: none;
	border-radius: 5px;
	background-color: red;

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

interface ClearButtonProps {
	clearInput(): void;
}

const ClearButton: React.FC<ClearButtonProps> = (props) => {
	const { clearInput } = props;	
	const dispatch = useDispatch();
	const setLoading = (set: boolean) => dispatch(Actions.setLoading(set));	
	const setDelay = (set: boolean) => dispatch(Actions.setDelay(set));	

	return (
		<Button
			onClick={() => {
				dispatch(Actions.setImgs([]));
				setLoading(false);
				setDelay(false);
				clearInput();
			}}
		>
			{' '}
			Очистить
		</Button>
	);
};

export default ClearButton;
