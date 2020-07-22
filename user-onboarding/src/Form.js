import React, { useState, useEffect } from 'react'
import * as  yup from 'yup'
import styled from 'styled-components'
import axios from 'axios'


const StyledInput = styled.input`
width:20%;
margin:5px;
`

const ButtonStyle = styled.button`
background-color:crimson;
color:ivory;
/* border-radius:5px; */
width: 100px;
padding:10px;
outline:none;
border:none;
border-radius:10px;

`

const TitleStyle = styled.div`
color:ivory;
background-color:crimson;
width:20%;
margin:auto;
display:flex;
justify-content:center;
text-align:center;
padding:10px;
border-radius:10px;
align-items:baseline;
`

const FormTitle = styled.div`
color:ivory;
background-color:crimson;
width:20%;
margin:auto;
display:flex;
justify-content:flex-start;
padding:10px;
border-radius:10px;
align-items:baseline;
`

const StyledForm = styled.div`

display:flex;
justify-content:center;
align-content:center;
text-align:center;
flex-direction:column;
margin:10px;
padding:10px;

`

const InnerDiv = styled.div`

margin:10px;
`

const ErrorMessage = styled.p`
color:red;
`

function Form() {

    const defaultForm = {
        name:'',
        email:'',
        password:'',
        terms:false
    }
    
    const defaultErrors = {
        name:'',
        email:'',
        password:'',
        terms:''
    }
    
    let defaultSchema = yup.object().shape({
        name: yup.string().required('That is not a real name. Please try again.'),
        email: yup.string().email('Please enter a valid e-mail address.').required('A valid e-mail address is required.'),
        password: yup.string().required('This is not a valid password.'),
        terms: yup.boolean().oneOf([true],'Must agree to continue.')
    })
    
    

    const [newForm, setForm] = useState(defaultForm)
    const [errors, setErrors] = useState(defaultErrors)
    const [disableButton, setButton] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        defaultSchema.validate(newForm)
        .then(valid => setButton(!valid) )
    },[newForm, defaultSchema])

    const validationCheck = (event) => {
        event.persist()
        yup.reach(defaultSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => setErrors(
            {...errors, [event.target.name]:''}
        ))
        .catch(error => 
            setErrors(
                {...errors, [event.target.name]: error.errors[0]}
                ));
    }

    const onSubmit = (event) => {
        event.preventDefault()
        console.log('submit start')
        axios.post('https://reqres.in/api/users', newForm)
        .then(value => {
            /*test*/
            const newTeamMember = value.data
            setUsers([newTeamMember],...users)
            setUsers(value.data)})
        .catch(error => console.log('error', error))
    }
    
    const onChange = (event) => {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setForm({...newForm, [event.target.name]: value})
        validationCheck(event)
    }

    return(
        <div>
        <StyledForm>
        <form onSubmit={onSubmit}>
        <TitleStyle><h1>User Onboarding</h1></TitleStyle>
             <InnerDiv>
            <label htmlFor="name">
            <FormTitle>Name:</FormTitle>
                <StyledInput 
                type="text" 
                name="name"
                onChange={onChange}
                value={newForm.name}
                errors={errors}
                />
                <ErrorMessage>{errors.name}</ErrorMessage>
            </label>
            </InnerDiv>
            <InnerDiv>
            <label htmlFor="email">
               <FormTitle>E-mail:</FormTitle>
                <StyledInput 
                type="email" 
                name="email"
                onChange={onChange}
                value={newForm.email}
                errors={errors}
                />
                <ErrorMessage>{errors.email}</ErrorMessage>
            </label>
            </InnerDiv>
            <InnerDiv>
            <label htmlFor="password">
                <FormTitle>Password:</FormTitle>
                <StyledInput
                type="password" 
                name="password"
                onChange={onChange}
                value={newForm.password}
                errors={errors}
                />
                <ErrorMessage>{errors.password}</ErrorMessage>
            </label>
            </InnerDiv>
            <InnerDiv>
            <label htmlFor="terms">
               <FormTitle>Terms of Service:</FormTitle> 
                <StyledInput
                type="checkbox"
                name="terms"
                onChange={onChange}
                value={newForm.terms}
                errors={errors}
                />
                <ErrorMessage>{errors.terms}</ErrorMessage>
            </label>
            </InnerDiv>

            <ButtonStyle disabled={disableButton}>Submit</ButtonStyle>
        </form>
        </StyledForm>
        <p>This is the user display test: {JSON.stringify(users)}</p>
        </div>
    )
}

export default Form;