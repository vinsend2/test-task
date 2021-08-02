import React, { useEffect } from 'react';
import styled from 'styled-components';

const ErrorBlock = styled.div`
	position: absolute;
	top: 78px;
	left: 37%;
	padding: 20px;
	border-radius: 20px;
	font-size: 27px;
	color: red;	
	opacity: 0.5;
	border: 1px solid;
`;

interface ErrorMessageProps {
	errorText: string;
	error(text: string): void;	
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
	const { errorText, error} = props;	

	function closeError() {
		error('');
	}

	useEffect(() => {
		document.addEventListener('click', closeError);
		return () => {
			document.removeEventListener('click', closeError);
		};
	});

	return <ErrorBlock>{errorText}</ErrorBlock>;
};

export default ErrorMessage;
