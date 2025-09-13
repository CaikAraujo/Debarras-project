'use client'

import { sendEmail } from '@/app/_actions/sendEmail'
import useI18n from '@/components/i18n/useI18n'

const ContactSwiss = () => {
  const { t } = useI18n()
  return (
    <div className="admin-container" id="contact">
      <div className="admin-main-layout">
        <div className="admin-content">
          
          <div className="admin-section">
            <h2>{t.contact.title}</h2>
            <p style={{ marginBottom: '30px' }}>{t.contact.desc}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              
              {/* Formulaire */}
              <div>
                <h3 style={{ marginBottom: '20px' }}>{t.contact.formTitle}</h3>
                <form action={async (formData) => {
                  await sendEmail(formData)
                }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">{t.contact.name}</label>
                    <input 
                      type="text"
                      name="name"
                      className="admin-form-input"
                      required
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">{t.contact.email}</label>
                    <input 
                      type="email"
                      name="senderEmail"
                      className="admin-form-input"
                      required
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">{t.contact.phone}</label>
                    <input 
                      type="tel"
                      name="phone"
                      className="admin-form-input"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">{t.contact.service}</label>
                    <input 
                      type="text"
                      name="service"
                      className="admin-form-input"
                      placeholder={t.contact.servicePlaceholder}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">{t.contact.description}</label>
                    <textarea 
                      name="message"
                      className="admin-form-input"
                      rows={5}
                      placeholder={t.contact.descriptionPlaceholder}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="admin-btn">
                    {t.contact.submit}
                  </button>
                </form>
              </div>
              
              {/* Informations de contact */}
              <div>
                <h3 style={{ marginBottom: '20px' }}>{t.contact.infoTitle}</h3>
                
                <div className="admin-card">
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '15px' }}>{t.contact.company}</h4>
                  <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <strong>{t.contact.addressLabel}</strong><br/>
                      Avenue des Communes-Réunies 43<br/>
                      1212 Grand-Lancy<br/>
                      {t.contact.city}
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                      <strong>{t.contact.phoneLabel}</strong><br/>
                      <a href="tel:+41229391549" style={{ color: 'var(--link-blue)' }}>
                        +41 22 939 15 49
                      </a>
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                      <strong>{t.contact.emailLabel}</strong><br/>
                      <a href="mailto:info@suisse-debarras.ch" style={{ color: 'var(--link-blue)' }}>
                        info@suisse-debarras.ch
                      </a>
                    </div>
                    
                    <div>
                      <strong>{t.contact.hoursLabel}</strong><br/>
                      {t.contact.hours[0]}<br/>
                      {t.contact.hours[1]}<br/>
                      {t.contact.hours[2]}
                    </div>
                  </div>
                </div>
                
                <div className="admin-card">
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '15px' }}>{t.contact.urgentTitle}</h4>
                  <p style={{ fontSize: '14px' }}>
                    {t.contact.urgentDesc}
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--swiss-red)' }}>
                    +41 22 939 15 49
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="admin-sidebar">
          <div className="admin-sidebar-item">
            <h4>{t.contact.sidebar.freeQuote}</h4>
            <p>{t.contact.sidebar.freeQuoteDesc}</p>
          </div>
          
          <div className="admin-sidebar-item">
            <h4>{t.contact.sidebar.payment}</h4>
            <p>{t.contact.sidebar.paymentDesc}</p>
          </div>
          
          <div className="admin-sidebar-item">
            <h4>{t.contact.sidebar.insurance}</h4>
            <p>{t.contact.sidebar.insuranceDesc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSwiss 