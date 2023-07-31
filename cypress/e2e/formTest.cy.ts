describe('search from submit phrase', () => {
    it('user should be able to browse nasa library', () => {
        cy.visit('/')
        cy.get('input[name="phrase"]').type('drink')
        cy.get('button').contains('Search').click()
    })
})

describe('Check phrase input empty and validation length', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('user should not be able to submit empty phrase', () => {
        cy.get('input[name="phrase"]:empty')
        cy.get('button').contains('Search').click()
    })
    it('user should not be able to submit empty phrase', () => {
        cy.get('input[name="phrase"]').type("a")
        cy.get('button').contains('Search').click()
    })
})

describe('Check phrase input validation length', () => {
    it('user should not be able to submit empty phrase', () => {
        cy.visit('/')
        cy.get('input[name="phrase"]').type("moon")
        cy.get('input[name="yearStart"]')
            .click()
            .parent()
            .parent()
            .parent()
            .contains('2019').click();
        cy.get('input[name="yearEnd"]')
            .click()
            .parent()
            .parent()
            .parent()
            .contains('2022').click();
        cy.get('button').contains('Search').click()
    })
})