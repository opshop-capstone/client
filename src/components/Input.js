import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.inputLabel};
`;

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  padding: 20px 10px;
  font-size: 16px;
  border: 1px solid;
  border-radius: 4px;
`;

const Input = ({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
  placeholder,
  returnKeyType,
  maxLength,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
      />
    </Container>
  );
};

export default Input;
