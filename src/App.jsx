import { useEffect, useState } from "react"
import styled from "styled-components"
import './hover.css'

function App() {
	const [text, setText] = useState('텍스트에 마우스를 올려 Hover 효과를 체험해보세요. 처음 위치에서 마우스가 올라간 곳 까지 텍스트 색이 채워지는 효과가 더해지는 이전에 없던 새로운 효과를 체험 해보세요.')
	const [type, setType] = useState(true)
	const [result, setResult] = useState([])
	const [hoverIdx, setHoverIdx] = useState(0)

	useEffect(() => {
		let resultArray = []
		for(var i=0; i<text.length; i++){
			resultArray.push((
				<ResultText 
					onMouseEnter={onMouseUpHandler} 
					key={i}
					data-idx={i}
					className={i<=hoverIdx?'hover':'nohover'}
				>
					{text[i]}
				</ResultText>
			))
		}
		setResult(resultArray)
	}, [text, hoverIdx])

	const onTextAreaHandler = (e) => {
		setText(e.target.value)
	}

	const onChangeBtnHandler = () => {
		setType((prev)=>!prev)
	}

	const onMouseUpHandler = (e) => {
		setHoverIdx(e.target.dataset.idx)
	}

	return (
		<div className="App">
			<Wrapper>
				{type?(
					<>
						<h3>Write</h3>
						<TextArea onChange={onTextAreaHandler} value={text}></TextArea>
					</>
				):(
					<>
						<h3>Result</h3>
						<Result>
							{result}
						</Result>
					</>
				)}
				<ChangeBtn onClick={onChangeBtnHandler}>Change</ChangeBtn>
			</Wrapper>
		</div>
	)
}

export default App

const Wrapper = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	flex-flow: column;
`
const TextArea = styled.textarea`
	resize:none;
	width:500px;
	height:500px;
	padding:0;
`

const ChangeBtn = styled.button`
	width:500px;
	height:30px;
	background-color:#eee;
	border: 1px solid #999;
	cursor:pointer;
	&:hover{
		border-color:#333;
		background-color:#ddd;
	}
`

const Result = styled.div`
	width:500px;
	height:500px;
	border:1px solid #999;
	cursor:pointer;
	overflow:auto;
`

const ResultText = styled.span`
	font-size:45px;
	font-weight:bold;
	-webkit-text-stroke: 2px red;
`