describe('check the site and input values', () => {
    it('can navigate to the app', () => {
        cy.visit('http://localhost:3000/')
        cy.url().should('include', 'localhost')
    })

    it('get the name input and type a name in it', () => {
        cy.get('input[name="name"]')
        .type('George')
        .should('have.value','George')
    })
    
    it('get the email input and type an address in it', () => {
        cy.get('input[name="email"]')
        .type('george@george.com')
        .should('have.value','george@george.com')
    })

    it('get the password input and type a password in it', () => {
        cy.get('input[name="password"]')
        .type('newpassword')
        .should('have.value','newpassword')
    })

    it('check the terms of service', () => {
        cy.get('input[name="terms"]')
        .check().should('be.checked')
    })

    it('can submit the form', () => {
        cy.get('button').click()
    })
})


describe('check for form validation if input is empty', () =>{
    it('can navigate to the app', () => {
        cy.visit('http://localhost:3000/')
    })

    it('check for an empty name input', () => {
        cy.get('input[name="name"]')
        .should('have.value','')
    })

    it('submit button is disabled if input is empty',() =>{
        cy.get('button').should('be.disabled')
    })
})