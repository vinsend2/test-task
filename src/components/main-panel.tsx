import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import ErrorMessage from './error-msg';
import LoadButton from './load-btn';
import ClearButton from './clear-btn';
import GroupedButton from './group-btn';
import styled from 'styled-components';


const Panel = styled.div`
	display: flex;
	width: fit-content;

	margin: 30px auto;

	color: grey;
	@media (max-width: 768px) {
		 {
			flex-wrap: wrap;
		}
	  }
`;

const TegInput = styled.input`
	width: 400px;
	padding: 10px;

	border: 1px solid grey;
	border-radius: 5px;

	font-size: 17px;
`;

const List = styled.ul`
	width: 1460px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;

	list-style-type: none;
`;

const Item = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 480px;
	box-sizing: border-box;
	margin-right: 10px;
	margin-top: 10px;

	border: 1px solid grey;
	overflow: hidden;

	&:nth-child(3n) {
		margin-right: 0;
	}
`;

const ItemImg = styled.img``;

const Groups = styled.div`
	width: 1460px;
	margin: 0 auto;
	margin-top: 20px;
`;

const Group = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 10px;
	border: 1px solid grey;
	border-radius: 5px;

	> img {
		margin-left: 10px;
	}
`;

const GroupTitle = styled.h3`
	margin-left: 10px;
	font-size: 27px;
`;


const MainPanel: React.FC = () => {
	const inputRef: any = useRef(null);
	const [grouped, setGrouped] = useState(false);
	const [error, setError] = useState('');
	const [tag, setTag] = useState('');

	const list: [] = useSelector((state: { imgs: [] }) => state.imgs);

	
	function unique(arr: any[]) {
		return Array.from(new Set(arr));
	}

	const groups: string[] = [];
	list.forEach((img: { tag: string }) => groups.push(img.tag));
	const uniqGroups = unique(groups);

	function clearInput() {
		inputRef.current.value = '';
	}

	return (
		<React.Fragment>
			<Panel>
				{error && <ErrorMessage errorText={error} error={setError} />}
				<TegInput
					ref={inputRef}
					type='text'
					placeholder='Введите ТЕГ'
					onKeyPress={(evt) => {
						const regExp = new RegExp('[A-Za-z,]');
						if (!regExp.test(evt.key)) {
							evt.preventDefault();
						}
					}}
					onChange={() => setTag(inputRef.current.value.toLowerCase())}
					pattern={'[A-Za-z]'}
				/>
				<LoadButton tag={tag} setError={setError} />
				<ClearButton clearInput={clearInput} />
				<GroupedButton grouped={grouped} setGrouped={setGrouped} />
			</Panel>
			{!grouped ? (
				<List>
					{list.map((img: { img: any; tag: string }, index: number) => (
						<Item
							key={index}
							onClick={() => {
								setTag(img.tag);
								inputRef.current.value = img.tag;
							}}
						>
							{typeof img.img === 'string' ? (
								<ItemImg src={img.img} />
							) : (
								img.img.map((imgsrc: string) => {
									return <ItemImg src={imgsrc} />;
								})
							)}
						</Item>
					))}
				</List>
			) : (
				<Groups>
					{uniqGroups.map((group, index) => {
						return (
							<React.Fragment>
								<GroupTitle>{group}</GroupTitle>
								<Group key={index}>
									{list.slice().filter((img: { tag: string }) => img.tag === group).map((img: { tag: string; img: any }, index) => {
											return (
												<Item
													key={index}
													onClick={() => {
														setTag(img.tag);
														inputRef.current.value = img.tag;
													}}
												>
													{typeof img.img === 'string' ? (
														<ItemImg src={img.img} />
													) : (
														img.img.map((imgsrc: string) => {
															return <ItemImg src={imgsrc} />;
														})
													)}
												</Item>
											);
										})}
								</Group>
							</React.Fragment>
						);
					})}
				</Groups>
			)}
		</React.Fragment>
	);
};

export default MainPanel;
