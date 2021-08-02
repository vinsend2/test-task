import React, {useEffect } from 'react';
import { getImg } from '../services/api';
import { Actions } from '../redux/actions';
import { useSelector, useDispatch, RootStateOrAny} from 'react-redux';
import random from 'lodash/random';
import styled from 'styled-components';

const Button = styled.button`
	display: block;
	box-sizing: border-box;

	padding: 10px;
	margin-left: 10px;

	border: none;
	border-radius: 5px;
	background-color: ${(props: { loading: string }) =>
		props.loading ? 'grey' : '#00c04b'};

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

interface LoadButtonProps {
	tag: string;
	setError(text: string): void;
}


const LoadButton: React.FC<LoadButtonProps> = (props) => {
	const { tag, setError} = props;
	
	const list: [] = useSelector((state: { imgs: [] }) => state.imgs);
	const dispatch = useDispatch();
	
	const loading = useSelector((state: RootStateOrAny) => state.loading); 
	const delay = useSelector((state: RootStateOrAny) => state.delay); 

	const setLoading = (set: boolean) => dispatch(Actions.setLoading(set));	
	const setDelay = (set: boolean) => dispatch(Actions.setDelay(set));	
	
	

	function setImgs(img: string | string[], tag: string) {
		if (img) {
			let copy: any = list.slice();
			let newImg: {} = { img, tag };
			copy.push(newImg);
			setLoading(false);

			dispatch(Actions.setImgs(copy));
		} else {
			setError(`По тегу ${tag} ничего не найдено`);
			setLoading(false);
		}
	}

	function getMultipleImgs(tagsInput: string) {
		let tags = tagsInput.split(',');
		let imgs: string[] = [];

		let LoadImgs = new Promise(resolve => {
			function pushImage(link: string) {
				imgs.push(link);
				if (imgs.length === tags.length) {
					resolve('ready');
				}
			}
			tags.forEach((tag, index) => {
				getImg(tag, pushImage, serverError);
			});
		});

		LoadImgs.then(() => {
			setImgs(imgs, tagsInput);
		});
	}

	function randomString(i: number, randomLength = true) {
		let rnd = '';
		while (rnd.length < i)
			rnd += Math.random().toString(36).substring(2);	
			if (randomLength) {
				return rnd.substring(0, random(1, i));
			 }
	
		return rnd.substring(0, i);
	};		

	function serverError(error: string) {
		setError(error);
		setLoading(false);
	}
	

	useEffect(() => {		
        let effect: NodeJS.Timeout | undefined;
        if (delay) {
			setLoading(true);
            effect = setTimeout(async () => {
                const randomTag = randomString(10, true); 
				console.log(randomTag) 				         
                await getImg(
					randomTag,								
					setImgs,
					serverError				
				);                
            }, 5000);			
        }	
        return () => {			
            if (effect) clearTimeout(effect);
        };
    });
	
	return (
		<Button
			onClick={() => {
				if (tag) {
					setLoading(true);
					if (tag === 'delay') {
						setDelay(true)						
					} else if (tag.split(',').length <= 1) {					
						getImg(tag, setImgs, serverError);
					} else {
						getMultipleImgs(tag);
					}
				} else {
					setError('Введите ТЕГ');
				}
			}}
			disabled={loading}
			loading={loading ? 'loading' : ''}
		>
			{loading ? 'Загрузка...' : 'Загрузить'}
		</Button>
	);
};

export default LoadButton;
