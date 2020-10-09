Cypress.Commands.add('login', (credentials) => {
  cy.request('POST', 'http://localhost:3001/api/login', credentials)
    .then(({ body }) => {
      localStorage.setItem('bloglist-user', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
})

describe('Blogs app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/testing/init')

    cy.request({
      url: 'http://localhost:3001/api/users',
      method: 'POST',
      body: {
        username: 'oscar2',
        password: '1234',
        name: 'Esteban Agostini'
      }
    })

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('It succeds with correct credentials', function() {
      cy.get('input:first')
        .type('oscar2')

      cy.get('input:last')
        .type('1234{enter}')

      cy.get('html')
        .contains('Welcome Esteban')
    })

    it('It fails with incorrect credentials', function() {
      cy.get('input:first')
        .type('invalid user')
      cy.get('input:last')
        .type('invalid{enter}')

      cy.get('.error')
        .contains(/incorrect username or password/i)
        .and('have.css','color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(() => {
      cy.login({ username: 'oscarj', password: 'oscar1234' })
      cy.request('http://localhost:3001/api/blogs')
        .its('body')
        .as('blogs')
    })

    it('user can add a new blog', function() {
      cy.contains(/new note/i).click()

      cy.get('#title').type('React State Management Strategies')
      cy.get('#author').type('Oscar Jauregui')
      cy.get('#url').type('www.reactivapp.com')
      cy.get('form').contains('create').click()

      cy.contains(/^React State Management Strategies/i)
    })

    it('user can like a blog', function() {
      cy.contains('show')
        .click()
        .parent()
        .contains('like')
        .click()
        .parent()
        .contains(`${this.blogs[1].likes + 1}`)
    })

    it('user can delete his added blogs', function() {
      const blogToDelete = this.blogs[1].title

      cy.contains(blogToDelete)
        .contains('show')
        .click()
        .parent()
        .contains('delete')
        .click()

      cy.get('html')
        .should('to.not.contain', blogToDelete)
    })

    it('user can only delete own blogs', function() {
      const otherUserBlog = this.blogs[0].title

      cy.contains(otherUserBlog)
        .contains('show')
        .click()
        .parent()
        .should('to.not.contain', /delete/)
    })

    it.only('blogs are ordered by likes count', function() {
      cy.get('button')
        .should('contain', 'show')
        .then(btns => btns.get().forEach((btn) => {
          if(btn.textContent === 'show') btn.click()
        }))

      cy.get('span')
        .then(btns => {
          btns
            .get()
            .map(btn => btn.textContent.split(' ')[0])
            .reduce((acc, next) => acc.concat(Number(next)) ,[])
            .reduce((val, next) => {
              expect(val).to.be.at.least(next)
              return next
            })
        })
    })
  })
})