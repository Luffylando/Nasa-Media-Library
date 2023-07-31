describe('Check pagination next, first, last, previous, page', () => {
    it('user should be able to use pagination and all its buttons clearly', () => {
        cy.visit('/')

        cy.get('input[name="phrase"]').type('drink')
        cy.get('button').contains('Search').click()
        cy.get('[data-cy="pagination-next"]').click()
        cy.get('[data-cy="pagination-current"]').should('contain', 2)
        cy.get('[data-cy="pagination-last"]').click()
        cy.get('[data-cy="pagination-previous"]').click()
        cy.get('[data-cy="pagination-current"]').should('contain', 1)
    })
})