import "./PaymentForm.css";
import checkboxUncheckedIcon from "../../../../assets/checkbox-unchecked.svg";
import checkboxCheckedIcon from "../../../../assets/checkbox-checked.svg";
import { useState } from "react";
import type { ChangeEvent } from "react";
import StripePaymentModal from "./components/StripePaymentModal/StripePaymentModal";

// Croatian OIB validation using ISO 7064, MOD 11-10 algorithm
const isValidOib = (oib: string): boolean => {
  if (!oib || oib.length !== 11) return false;
  if (!/^\d{11}$/.test(oib)) return false;

  let remainder = 10;
  for (let i = 0; i < 10; i++) {
    const digit = parseInt(oib[i], 10);
    remainder = remainder + digit;
    remainder = remainder % 10;
    if (remainder === 0) remainder = 10;
    remainder = (remainder * 2) % 11;
  }

  let checkDigit = 11 - remainder;
  if (checkDigit === 10) checkDigit = 0;

  return checkDigit === parseInt(oib[10], 10);
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  // Allow digits, spaces, dashes, parentheses, and optional + at start
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 6;
};

const isValidWebsite = (url: string): boolean => {
  if (!url) return true; // Optional field
  // Must start with http:// or https:// or be a valid domain pattern
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i;
  return urlRegex.test(url);
};

type FieldErrors = {
  nameAndLastName?: string;
  eMail?: string;
  phoneNumber?: string;
  website?: string;
  companyName?: string;
  companyOIB?: string;
};

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

  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const ORDER_AMOUNT = 100;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FieldErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleR1 = () => {
    setFormData(prev => ({ ...prev, isR1Reciept: !prev.isR1Reciept }));
  };

  const validateForm = (): FieldErrors => {
    const newErrors: FieldErrors = {};

    if (!formData.nameAndLastName.trim()) {
      newErrors.nameAndLastName = "Obavezno polje";
    }

    if (!formData.eMail.trim()) {
      newErrors.eMail = "Obavezno polje";
    } else if (!isValidEmail(formData.eMail)) {
      newErrors.eMail = "Neispravna e-mail adresa";
    }

    if (formData.phoneNumber && !isValidPhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Neispravan format";
    }

    if (formData.website && !isValidWebsite(formData.website)) {
      newErrors.website = "Neispravna web adresa";
    }

    if (formData.isR1Reciept) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Obavezno za R1 račun";
      }

      if (!formData.companyOIB.trim()) {
        newErrors.companyOIB = "Obavezno za R1 račun";
      } else if (!isValidOib(formData.companyOIB)) {
        newErrors.companyOIB = "Neispravan OIB";
      }
    }

    return newErrors;
  };

  const onPayButton = () => {
    setSuccess(false);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSuccess(true);
    setErrors({});

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
                className={errors.nameAndLastName ? "input-error" : ""}
              />
              {errors.nameAndLastName && <span className="field-error">{errors.nameAndLastName}</span>}
            </div>
            <div className="form-input-item">
              <input
                type="email"
                name="eMail"
                placeholder="e-mail*"
                value={formData.eMail}
                onChange={handleChange}
                className={errors.eMail ? "input-error" : ""}
              />
              {errors.eMail && <span className="field-error">{errors.eMail}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-input-item">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="broj telefona"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? "input-error" : ""}
              />
              {errors.phoneNumber && <span className="field-error">{errors.phoneNumber}</span>}
            </div>
            <div className="form-input-item">
              <input
                type="url"
                name="website"
                placeholder="web stranica"
                value={formData.website}
                onChange={handleChange}
                className={errors.website ? "input-error" : ""}
              />
              {errors.website && <span className="field-error">{errors.website}</span>}
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
                  placeholder="naziv tvrtke, obrta, OPG-a...*"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={errors.companyName ? "input-error" : ""}
                />
                {errors.companyName && <span className="field-error">{errors.companyName}</span>}
              </div>
              <div className="form-input-item">
                <input
                  type="text"
                  name="companyOIB"
                  placeholder="OIB tvrtke, obrta, OPG-a...*"
                  value={formData.companyOIB}
                  onChange={handleChange}
                  className={errors.companyOIB ? "input-error" : ""}
                />
                {errors.companyOIB && <span className="field-error">{errors.companyOIB}</span>}
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