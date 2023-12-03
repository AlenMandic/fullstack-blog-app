/* eslint-disable */
describe('Blog posting app', () => {

  beforeEach(function() {
    cy.visit('http://localhost:5173/')
 })

  it('Front page is rendered and contains a blog', function()  {
    cy.contains('Random Blog 1')
  })

  it('Login form can be opened and then closed', function() {
    cy.contains('Log in').click()
    cy.contains('Cancel').click()
  })
  // needs to be completed
  it('User can login successfully', function() {
    cy.contains('Log in').click()
    cy.contains('#username').type('test-username1')
    cy.contains('#password').type('test-password1')

    cy.contains('test-username1 logged in successfully.')
  })
})