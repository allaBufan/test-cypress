let textAreaId = '';

describe('Selectors tests', () => {
    beforeEach(() => {
      cy.visit('https://qauto.forstudy.space/', {
          auth: {
              username: 'guest',
              password: 'welcome2qauto'
          }
      })
      // cy.pause()
  })

    it('Header selectors', () => {
        cy.get('.hero-descriptor')                
        .find('button')            
        .should('exist');  
    })

    it('Footer selectors', () => {
     
          cy.get('.socials_link').each(($link) => {
          cy.wrap($link).within(() => {
            // Check icon exists before test 
            cy.get('.socials_icon').should('exist');
            
            // Get href from current link
            const linkHref = $link.prop('href');
            
            // Check if link is correct for each icon and redirects to Hillel page
            if ($link.find('.icon-facebook').length) {
              expect(linkHref).to.include('facebook.com/Hillel.IT.School');
            }
            if ($link.find('.icon-telegram').length) {
              expect(linkHref).to.include('t.me/ithillel_kyiv');
            }
            if ($link.find('.icon-youtube').length) {
              expect(linkHref).to.include('youtube.com/user/HillelITSchool?sub_confirmation=1');
            }
            if ($link.find('.icon-instagram').length) {
              expect(linkHref).to.include('instagram.com/hillel_itschool');
            }
            if ($link.find('.icon-linkedin').length) {
              expect(linkHref).to.include('linkedin.com/school/ithillel');
            }
          });
        });
        

  })

        
})