describe('Happy path test', () => {
    it('user should be able to write phrase and choose one of the results to see them in more detail', () => {
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
        cy.get('[data-cy="search-page-results"]').get('[data-cy="search-page-card"]').first().click()
    })
})