import styled from 'react-emotion';

export const StyledButton = styled('button')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 6px;
  width: 32px;
  height: 28px;
  background: ${props => props.pressed ? '#4B5671' : '#E1E2E9'};
  border-radius: 39px;
	cursor: pointer;
	border: none;
	margin-top: 14px;
	margin-right: 6px;
`;
