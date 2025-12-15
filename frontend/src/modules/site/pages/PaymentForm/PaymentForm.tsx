import "./PaymentForm.css";
import checkboxUncheckedIcon from "../../../../assets/checkbox-unchecked.svg";
import checkboxCheckedIcon from "../../../../assets/checkbox-checked.svg";
import { useState } from "react";
import type { ChangeEvent } from "react";
import StripePaymentModal from "./components/StripePaymentModal/StripePaymentModal";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    nameAndLastName: "",
    eMail: "",
    phoneNumber: "",
    website: "",
    customerRequest: "",
    isR1Reciept: false,
    companyName: "",
    companyOIB: ""
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const ORDER_AMOUNT = 100;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleR1 = () => {
    setFormData(prev => ({ ...prev, isR1Reciept: !prev.isR1Reciept }));
  };

  const onPayButton = () => {
    setError(null);
    setSuccess(false);

    if (!formData.nameAndLastName || !formData.eMail) {
      setError("Molimo ispunite ime i prezime te e-mail.");
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSuccess(true);
    
    setFormData({
      nameAndLastName: "",
      eMail: "",
      phoneNumber: "",
      website: "",
      customerRequest: "",
      isR1Reciept: false,
      companyName: "",
      companyOIB: ""
    });
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  return (
    <section className="payment-form-section">
      <div className="section-content-wrapper">
        <h1>Za početak ne treba puno...</h1>

        {error && <div className="form-error">{error}</div>}
        {success && (
          <div className="form-success">Vaša narudžba je zaprimljena i plaćena!</div>
        )}

        <div className="payment-form">
          <div className="form-row">
            <div className="form-input-item">
              <input
                type="text"
                name="nameAndLastName"
                placeholder="ime i prezime*"
                value={formData.nameAndLastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-input-item">
              <input
                type="email"
                name="eMail"
                placeholder="e-mail*"
                value={formData.eMail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-input-item">
              <input
                type="text"
                name="phoneNumber"
                placeholder="broj telefona"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-input-item">
              <input
                type="text"
                name="website"
                placeholder="web stranica"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <textarea
              className="order-description"
              name="customerRequest"
              placeholder="opišite nam tko ste i što nudite svojim klijentima"
              value={formData.customerRequest}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="upload-field">
              <span>ovdje povucite svoj logo, fotografije, brošure...</span>
            </div>
          </div>

          <div className="form-row">
            <div
              className="checkbox-wrapper"
              onClick={toggleR1}
              role="button"
            >
              <img
                className="checkbox-icon"
                src={
                  formData.isR1Reciept
                    ? checkboxCheckedIcon
                    : checkboxUncheckedIcon
                }
                alt=""
              />
              <span className="checkbox-label">želim R1 račun</span>
            </div>
          </div>

          {formData.isR1Reciept && (
            <div className="form-row">
              <div className="form-input-item">
                <input
                  type="text"
                  name="companyName"
                  placeholder="naziv tvrtke, obrta, OPG-a..."
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-item">
                <input
                  type="text"
                  name="companyOIB"
                  placeholder="OIB tvrtke, obrta, OPG-a..."
                  value={formData.companyOIB}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <button
            className="pay-video-button"
            onClick={onPayButton}
            disabled={showPaymentModal}
          >
            Plati €{ORDER_AMOUNT.toFixed(2)}
          </button>
        </div>

        {showPaymentModal && (
          <StripePaymentModal
            formData={formData}
            amount={ORDER_AMOUNT}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        )}
      </div>
    </section>
  );
}