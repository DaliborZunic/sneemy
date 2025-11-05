import "./PaymentForm.css"

export default function About() {
  return (
    <section className="payment-form-section">
      <div className="section-content-wrapper">
        <h1>Za početak ne treba puno...</h1>
        <div className="payment-form">
          <div className="form-row">
            <div className="form-input-item">
              <input type="text" placeholder="ime i prezime*" />
            </div>
            <div className="form-input-item">
              <input type="text" placeholder="e-mail*" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-input-item">
              <input type="text" placeholder="broj telefona" />
            </div>
            <div className="form-input-item">
              <input type="text" placeholder="web stranica" />
            </div>
          </div>
          <div className="form-row">
            <textarea className="order-description" name="" id="" placeholder="opišite nam tko ste i što nudite svojim klijentima"></textarea>
          </div>
          <div className="form-row">
            <div className="upload-field">
              <span>ovdje povucite svoj logo, fotografije, brošure...</span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-input-item">
              <input type="text" placeholder="naziv tvrtke, obrta, OPG-a..." />
            </div>
            <div className="form-input-item">
              <input type="text" placeholder="OIB tvrtke, obrta, OPG-a..." />
            </div>
          </div>
          <button className="pay-video-button">Plati video</button>
        </div>
      </div>
    </section>
  );
}
