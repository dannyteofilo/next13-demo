import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 390px;
  flex-shrink: 0;
  border-radius: 40px;
  border: 3px solid rgba(88, 130, 193, 0.49);
  background: rgba(88, 130, 193, 0.28);
  backdrop-filter: blur(12.5px);
`;

export const Title = styled.h1`
  color: #fff;
  font-family: Gilroy;
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Label = styled.label`
  color: #fff;
  font-family: Gilroy;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;


export const Input = styled.input`
  width: 300px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #bcbec0;
  background: #fff;
  margin-bottom: 12px;
`;

export const Button = styled.button`
  width: 300px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #003465;
  color: #fff;
  font-family: Gilroy;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
