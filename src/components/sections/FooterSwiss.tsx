import Link from 'next/link'

const FooterSwiss = () => {
  return (
    <div className="admin-footer">
      <div className="admin-container">
        <div className="admin-footer-grid">
          
          <div>
            <h4>Débarras Pro</h4>
            <ul>
              <li><Link href="/">À propos de nous</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/feedback">Feedback</Link></li>
            </ul>
          </div>
          
                      <div>
              <h4>Services</h4>
              <ul>
                <li><Link href="/services">Débarras résidentiel</Link></li>
                <li><Link href="/services">Débarras commercial</Link></li>
                <li><Link href="/services">Nettoyage professionnel</Link></li>
                <li><Link href="/services">Tri et recyclage</Link></li>
              </ul>
            </div>
            
            <div>
              <h4>Informations</h4>
              <ul>
                <li><Link href="/contact">Documentation</Link></li>
                <li><Link href="/contact">Bases légales</Link></li>
                <li><Link href="/contact">Protection des données</Link></li>
                <li><Link href="/contact">Accessibility</Link></li>
              </ul>
            </div>
          
                      <div>
              <h4>Suivez-nous</h4>
              <ul>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><Link href="/feedback">Témoignages</Link></li>
              </ul>
            </div>
            
          </div>
          
          <div style={{ 
            borderTop: '1px solid var(--border-gray)', 
            paddingTop: '20px', 
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'var(--text-medium)'
          }}>
            <div>
              © 2024 Débarras Pro Sàrl. Tous droits réservés.
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/contact" style={{ color: 'var(--text-medium)' }}>Mentions légales</Link>
              <Link href="/contact" style={{ color: 'var(--text-medium)' }}>Impressum</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default FooterSwiss 