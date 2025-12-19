import "./PaymentForm.css";
import checkboxUncheckedIcon from "../../../../assets/checkbox-unchecked.svg";
import checkboxCheckedIcon from "../../../../assets/checkbox-checked.svg";
import { useState, useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";
import StripePaymentModal from "./components/StripePaymentModal/StripePaymentModal";

const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_EXTENSIONS = ['.pdf', '.ppt', '.pptx', '.doc', '.docx', '.txt', '.jpeg', '.jpg', '.png', '.gif', '.zip', '.rar'];
const BLOCKED_EXTENSIONS = ['.exe', '.bat', '.cmd', '.com', '.msi', '.scr', '.ps1', '.vbs', '.js', '.dll'];

const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot >= 0 ? filename.substring(lastDot).toLowerCase() : '';
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

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
  files?: string;
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
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ORDER_AMOUNT = 100;

  const getTotalFileSize = (fileList: File[]): number => {
    return fileList.reduce((sum, file) => sum + file.size, 0);
  };

  const validateFiles = (newFiles: File[]): string | null => {
    for (const file of newFiles) {
      const ext = getFileExtension(file.name);
      if (BLOCKED_EXTENSIONS.includes(ext)) {
        return `Vrsta datoteke '${ext}' nije dozvoljena`;
      }
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return `Vrsta datoteke '${ext}' nije podržana`;
      }
    }

    const totalSize = getTotalFileSize([...files, ...newFiles]);
    if (totalSize > MAX_TOTAL_SIZE) {
      return `Ukupna veličina datoteka prelazi 25MB limit (${formatFileSize(totalSize)})`;
    }

    return null;
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;

    const fileArray = Array.from(newFiles);
    const error = validateFiles(fileArray);

    if (error) {
      setErrors(prev => ({ ...prev, files: error }));
      return;
    }

    setErrors(prev => ({ ...prev, files: undefined }));
    setFiles(prev => [...prev, ...fileArray]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => ({ ...prev, files: undefined }));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

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
    setFiles([]);

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
            <div className="upload-wrapper">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.jpeg,.jpg,.png,.gif,.zip,.rar"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
              <div
                className={`upload-field ${isDragging ? 'upload-field-dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileDialog}
              >
                <span>ovdje povucite svoj logo, fotografije, brošure... ili kliknite za odabir</span>
              </div>
              {files.length > 0 && (
                <div className="file-pills">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="file-pill">
                      <span className="file-pill-name">{file.name}</span>
                      <span className="file-pill-size">({formatFileSize(file.size)})</span>
                      <button
                        type="button"
                        className="file-pill-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="file-total-size">
                    Ukupno: {formatFileSize(getTotalFileSize(files))} / 25 MB
                  </div>
                </div>
              )}
              {errors.files && <span className="field-error">{errors.files}</span>}
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
            files={files}
            amount={ORDER_AMOUNT}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        )}
      </div>
    </section>
  );
}