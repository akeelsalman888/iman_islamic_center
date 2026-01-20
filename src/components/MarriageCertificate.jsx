import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import "./MarriageCertificate.css";
import emailjs from '@emailjs/browser';
import StatusModal from './StatusModal';
import { DatePicker, TimePicker } from './DateTimePicker';

function MarriageCertificate() {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        groomName: "",
        groomLicenseId: "",
        groomLicenseState: "",
        groomBirthPlace: "",
        groomBirthDate: "",
        brideName: "",
        brideLicenseId: "",
        brideLicenseState: "",
        brideBirthPlace: "",
        brideBirthDate: "",
        groomSignature: "",
        groomSignatureDate: "",
        brideRepSignature: "",
        brideRepSignatureDate: "",
        brideRepLicenseId: "",
        brideRepLicenseState: "",
        witness1Name: "",
        witness1Id: "",
        witness2Name: "",
        witness2Id: "",
        authorizedPersonName: "",
        authorizedPersonId: "",
        dowryAmount: "",
        nikaahDate: "",
        appointmentDate: "",
        appointmentTime: "",
        appointmentLocation: "masjid",
        homeAddress: "",
        email: ""
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [errors, setErrors] = useState({});

    // Validation helper functions
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidDate = (dateStr) => !isNaN(Date.parse(dateStr));
    const isPastDate = (dateStr) => new Date(dateStr) < new Date(new Date().toDateString());
    const isFutureOrTodayDate = (dateStr) => new Date(dateStr) >= new Date(new Date().toDateString());

    // Validate Step 1 fields
    const validateStep1 = () => {
        const newErrors = {};

        // Groom validation
        if (!formData.groomName.trim()) newErrors.groomName = 'Groom name is required';
        if (!formData.groomLicenseId.trim()) newErrors.groomLicenseId = 'License ID is required';
        if (!formData.groomLicenseState) newErrors.groomLicenseState = 'State is required';
        if (!formData.groomBirthPlace.trim()) newErrors.groomBirthPlace = 'Place of birth is required';
        if (!formData.groomBirthDate) {
            newErrors.groomBirthDate = 'Date of birth is required';
        } else if (!isPastDate(formData.groomBirthDate)) {
            newErrors.groomBirthDate = 'Date of birth must be in the past';
        }

        // Bride validation
        if (!formData.brideName.trim()) newErrors.brideName = 'Bride name is required';
        if (!formData.brideLicenseId.trim()) newErrors.brideLicenseId = 'License ID is required';
        if (!formData.brideLicenseState) newErrors.brideLicenseState = 'State is required';
        if (!formData.brideBirthPlace.trim()) newErrors.brideBirthPlace = 'Place of birth is required';
        if (!formData.brideBirthDate) {
            newErrors.brideBirthDate = 'Date of birth is required';
        } else if (!isPastDate(formData.brideBirthDate)) {
            newErrors.brideBirthDate = 'Date of birth must be in the past';
        }

        // Signatures validation
        if (!formData.groomSignature.trim()) newErrors.groomSignature = 'Groom signature is required';
        if (!formData.groomSignatureDate) newErrors.groomSignatureDate = 'Date is required';
        if (!formData.brideRepSignature.trim()) newErrors.brideRepSignature = 'Representative signature is required';
        if (!formData.brideRepSignatureDate) newErrors.brideRepSignatureDate = 'Date is required';
        if (!formData.brideRepLicenseId.trim()) newErrors.brideRepLicenseId = 'License ID is required';
        if (!formData.brideRepLicenseState) newErrors.brideRepLicenseState = 'State is required';

        // Witnesses validation
        if (!formData.witness1Name.trim()) newErrors.witness1Name = 'Witness 1 name is required';
        if (!formData.witness1Id.trim()) newErrors.witness1Id = 'Witness 1 ID is required';
        if (!formData.witness2Name.trim()) newErrors.witness2Name = 'Witness 2 name is required';
        if (!formData.witness2Id.trim()) newErrors.witness2Id = 'Witness 2 ID is required';

        // Dowry validation
        if (!formData.dowryAmount.trim()) newErrors.dowryAmount = 'Dowry amount is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate Step 2 fields
    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.appointmentDate) {
            newErrors.appointmentDate = 'Appointment date is required';
        } else if (!isFutureOrTodayDate(formData.appointmentDate)) {
            newErrors.appointmentDate = 'Appointment date cannot be in the past';
        }

        if (!formData.appointmentTime) newErrors.appointmentTime = 'Appointment time is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.appointmentLocation === 'home' && !formData.homeAddress.trim()) {
            newErrors.homeAddress = 'Home address is required for home visits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Real-time validation for a single field
    const validateField = (name, value) => {
        let error = '';

        // Required field check
        const requiredFields = [
            'groomName', 'groomLicenseId', 'groomLicenseState', 'groomBirthPlace', 'groomBirthDate',
            'brideName', 'brideLicenseId', 'brideLicenseState', 'brideBirthPlace', 'brideBirthDate',
            'groomSignature', 'groomSignatureDate', 'brideRepSignature', 'brideRepSignatureDate',
            'brideRepLicenseId', 'brideRepLicenseState',
            'witness1Name', 'witness1Id', 'witness2Name', 'witness2Id',
            'dowryAmount', 'appointmentDate', 'appointmentTime', 'email'
        ];

        if (requiredFields.includes(name) && (!value || !value.toString().trim())) {
            error = 'This field is required';
        }

        // Date of birth validation (must be in the past)
        if ((name === 'groomBirthDate' || name === 'brideBirthDate') && value) {
            if (!isPastDate(value)) {
                error = 'Date of birth must be in the past';
            }
        }

        // Appointment date validation (must be today or future)
        if (name === 'appointmentDate' && value) {
            if (!isFutureOrTodayDate(value)) {
                error = 'Appointment date cannot be in the past';
            }
        }

        // Email validation
        if (name === 'email' && value && !isValidEmail(value)) {
            error = 'Please enter a valid email address';
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Real-time validation
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    // Validate on blur (when user leaves the field)
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors({ ...errors, [name]: error });
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const margin = 15;
        const contentWidth = pageWidth - (margin * 2);

        // Helper function to convert 24-hour time to 12-hour AM/PM format
        const formatTime12Hour = (time24) => {
            if (!time24) return "_______________";
            const [h, m] = time24.split(':');
            const hourNum = parseInt(h);
            const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
            const ampm = hourNum >= 12 ? 'PM' : 'AM';
            return `${hour12}:${m} ${ampm}`;
        };

        // Helper function to draw section box
        const drawSectionBox = (startY, height, title) => {
            // Draw shaded header
            doc.setFillColor(39, 86, 155); // Blue color matching your theme
            doc.rect(margin, startY, contentWidth, 8, 'F');

            // Title in white
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(title, margin + 3, startY + 5.5);

            // Reset text color
            doc.setTextColor(0, 0, 0);

            // Draw border around section
            doc.setDrawColor(39, 86, 155);
            doc.setLineWidth(0.3);
            doc.rect(margin, startY, contentWidth, height);

            return startY + 8; // Return position after header
        };

        // Helper function to add field in two-column layout
        const addField = (label, value, xPos, yPos, isFullWidth = false) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text(label + ":", xPos, yPos);

            doc.setFont("helvetica", "normal");
            const labelWidth = doc.getTextWidth(label + ": ");
            const maxWidth = isFullWidth ? contentWidth - 6 : (contentWidth / 2) - 8;
            const lines = doc.splitTextToSize(value || "_______________", maxWidth - labelWidth);
            doc.text(lines, xPos + labelWidth, yPos);

            return yPos + (lines.length * 4);
        };

        let yPos = 15;

        // ===== HEADER =====
        doc.setFillColor(181, 216, 255); // Lighter blue color
        doc.rect(0, 0, pageWidth, 45, 'F');

        // Add stretched logo on the left
        doc.addImage(logo, 'PNG', 12, 8, 40, 30);

        doc.setTextColor(0, 0, 0); // Black text for better contrast on light blue
        doc.setFontSize(18); // Smaller heading
        doc.setFont("helvetica", "bold");
        doc.text("IMAN ISLAMIC CENTER", pageWidth / 2, 16, { align: "center" });

        doc.setFontSize(12); // Smaller subtitle
        doc.setFont("helvetica", "normal");
        doc.text("Marriage Certificate Application", pageWidth / 2, 25, { align: "center" });

        doc.setFontSize(8);
        doc.text("901 W Dawes Avenue, Lincoln, NE 68521", pageWidth / 2, 33, { align: "center" });
        doc.text("Phone: (402) 730-3883 | Email: info@iman-islam.org", pageWidth / 2, 39, { align: "center" });

        doc.setTextColor(0, 0, 0);
        yPos = 53;

        // ===== GROOM'S INFORMATION =====
        let sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 38, "GROOM'S INFORMATION");
        yPos += 3;

        const leftCol = margin + 3;
        const rightCol = margin + (contentWidth / 2) + 3;

        yPos = addField("Full Name", formData.groomName, leftCol, yPos, true);
        yPos += 1;

        let tempY = addField("License ID", formData.groomLicenseId, leftCol, yPos);
        addField("State", formData.groomLicenseState, rightCol, yPos);
        yPos = tempY + 1;

        tempY = addField("Place of Birth", formData.groomBirthPlace, leftCol, yPos);
        addField("Date of Birth", formData.groomBirthDate, rightCol, yPos);
        yPos = tempY + 5;

        // ===== BRIDE'S INFORMATION =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 38, "BRIDE'S INFORMATION");
        yPos += 3;

        yPos = addField("Full Name", formData.brideName, leftCol, yPos, true);
        yPos += 1;

        tempY = addField("License ID", formData.brideLicenseId, leftCol, yPos);
        addField("State", formData.brideLicenseState, rightCol, yPos);
        yPos = tempY + 1;

        tempY = addField("Place of Birth", formData.brideBirthPlace, leftCol, yPos);
        addField("Date of Birth", formData.brideBirthDate, rightCol, yPos);
        yPos = tempY + 5;

        // ===== SIGNATURES =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 42, "SIGNATURES");
        yPos += 3;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Groom's Signature:", leftCol, yPos);
        yPos += 4;

        tempY = addField("Name", formData.groomSignature, leftCol, yPos);
        addField("Date", formData.groomSignatureDate, rightCol, yPos);
        yPos = tempY + 2;

        doc.setFont("helvetica", "bold");
        doc.text("Bride's Representative:", leftCol, yPos);
        yPos += 4;

        tempY = addField("Name", formData.brideRepSignature, leftCol, yPos);
        addField("Date", formData.brideRepSignatureDate, rightCol, yPos);
        yPos = tempY + 1;

        tempY = addField("License ID", formData.brideRepLicenseId, leftCol, yPos);
        addField("State", formData.brideRepLicenseState, rightCol, yPos);
        yPos = tempY + 5;

        // ===== WITNESSES =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 22, "WITNESSES");
        yPos += 3;

        tempY = addField("Witness 1", formData.witness1Name, leftCol, yPos);
        addField("ID Number", formData.witness1Id, rightCol, yPos);
        yPos = tempY + 1;

        tempY = addField("Witness 2", formData.witness2Name, leftCol, yPos);
        addField("ID Number", formData.witness2Id, rightCol, yPos);
        yPos = tempY + 5;

        // ===== IIC OFFICIALS =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 18, "IIC OFFICIALS");
        yPos += 3;

        tempY = addField("Authorized Person", formData.authorizedPersonName, leftCol, yPos);
        addField("License ID", formData.authorizedPersonId, rightCol, yPos);
        yPos = tempY + 5;

        // ===== ADDITIONAL INFORMATION =====
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, 18, "ADDITIONAL INFORMATION");
        yPos += 3;

        tempY = addField("Dowry Amount", formData.dowryAmount, leftCol, yPos);
        addField("Date of Marriage", formData.nikaahDate, rightCol, yPos);
        yPos = tempY + 5;

        // ===== APPOINTMENT DETAILS =====
        const appointmentHeight = formData.appointmentLocation === 'home' && formData.homeAddress ? 26 : 22;
        sectionStart = yPos;
        yPos = drawSectionBox(sectionStart, appointmentHeight, "APPOINTMENT DETAILS");
        yPos += 3;

        tempY = addField("Date", formData.appointmentDate, leftCol, yPos);
        addField("Time", formatTime12Hour(formData.appointmentTime), rightCol, yPos);
        yPos = tempY + 1;

        const location = formData.appointmentLocation === 'masjid' ? 'At the Masjid' : 'Home Visit';
        yPos = addField("Location", location, leftCol, yPos, true);

        if (formData.appointmentLocation === 'home' && formData.homeAddress) {
            yPos += 1;
            yPos = addField("Address", formData.homeAddress, leftCol, yPos, true);
        }
        yPos += 5;

        // ===== FOOTER =====
        yPos += 5;
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos, contentWidth, 18, 'F');

        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(60, 60, 60);
        doc.text("This is a copy of your marriage certificate application.", pageWidth / 2, yPos + 6, { align: "center" });
        doc.text("Please bring this document to your appointment at the Islamic Center.", pageWidth / 2, yPos + 11, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("For questions, contact: (402) 730-3883 | info@iman-islam.org", pageWidth / 2, yPos + 15, { align: "center" });

        // Save the PDF
        doc.save("Marriage_Certificate_Application.pdf");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            // Validate Step 1 before moving to Step 2
            if (!validateStep1()) {
                setStatus({ type: 'error', message: 'Please fix the errors highlighted below.' });
                return;
            }
            setErrors({});
            setStatus({ type: '', message: '' });
            setStep(2);
            window.scrollTo(0, 0);
        } else {
            // Validate Step 2 before submitting
            if (!validateStep2()) {
                setStatus({ type: 'error', message: 'Please fix the errors highlighted below.' });
                return;
            }
            setStatus({ type: 'info', message: 'Processing application...' });

            // 1. Send Confirmation Email via EmailJS FIRST
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            console.log("EmailJS Config Check:", {
                hasService: !!serviceId,
                hasTemplate: !!templateId,
                hasKey: !!publicKey
            });

            if (!serviceId || !templateId || !publicKey) {
                const errorMsg = 'System Error: Email configuration is missing. Keys loaded: ' +
                    (serviceId ? 'Service✅ ' : 'Service❌ ') +
                    (templateId ? 'Template✅ ' : 'Template❌ ') +
                    (publicKey ? 'Key✅' : 'Key❌');
                console.error(errorMsg);
                setStatus({ type: 'error', message: errorMsg + '. Downloading PDF anyway...' });
                // Download PDF anyway so user doesn't lose data
                generatePDF();
                return;
            }

            // Explicitly initialize with public key
            emailjs.init(publicKey);

            // Prepare template parameters
            const templateParams = {
                to_email: formData.email,
                admin_email: 'akeelsalman888@gmail.com', // Explicitly pass admin email
                groomName: formData.groomName,
                brideName: formData.brideName,
                appointmentDate: formData.appointmentDate,
                appointmentTime: formData.appointmentTime,
                appointmentLocation: formData.appointmentLocation === 'masjid' ? 'Masjid' : 'Home Visit',
                homeAddress: formData.appointmentLocation === 'home' ? formData.homeAddress : 'N/A',
                nikaahDate: formData.nikaahDate
            };

            try {
                const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
                console.log('Email sent successfully!', response.status, response.text);
                setStatus({
                    type: 'success',
                    message: `Application Success! Confirmation email sent to ${formData.email}. Downloading PDF...`
                });
            } catch (err) {
                console.error('Failed to send email:', err);
                setStatus({
                    type: 'warning',
                    message: 'Application Success! Failed to send confirmation email, but downloading PDF. Error: ' + (err.text || JSON.stringify(err))
                });
            } finally {
                // 2. Generate and download PDF regardless of email success
                generatePDF();
            }
        }
    };

    const handleBack = () => {
        setStep(1);
        window.scrollTo(0, 0);
    };

    const usStates = t('states') || [];

    return (
        <div className="marriage-certificate-page">
            <section className="marriage-certificate-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="marriage-certificate-card">
                                <div className="text-center mb-4">
                                    <h2 className="marriage-title">
                                        {step === 1 ? t('marriageCertificate.title') : t('marriageCertificate.appointmentTitle')}
                                    </h2>
                                    {step === 2 && t('marriageCertificate.appointmentNote') && (
                                        <p className="marriage-subtitle">{t('marriageCertificate.appointmentNote')}</p>
                                    )}
                                    <div className="required-note mb-4">
                                        <span>{t('marriageCertificate.allFieldsRequired')}</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-body">
                                        {step === 1 && (
                                            <>
                                                {/* Groom's Information */}
                                                <h4 className="section-heading">{t('marriageCertificate.groomInfo')}</h4>

                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <label className="form-label">{t('marriageCertificate.groomName')}</label>
                                                        <input
                                                            type="text"
                                                            name="groomName"
                                                            className={`form-control ${errors.groomName ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.groomName}
                                                        />
                                                        {errors.groomName && <span className="error-message">{errors.groomName}</span>}
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.licenseId')}</label>
                                                        <input
                                                            type="text"
                                                            name="groomLicenseId"
                                                            className={`form-control ${errors.groomLicenseId ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.groomLicenseId}
                                                        />
                                                        {errors.groomLicenseId && <span className="error-message">{errors.groomLicenseId}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.state')}</label>
                                                        <select
                                                            name="groomLicenseState"
                                                            className={`form-control ${errors.groomLicenseState ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.groomLicenseState}
                                                        >
                                                            <option value="">{t('marriageCertificate.selectState')}</option>
                                                            {usStates.map(state => (
                                                                <option key={state} value={state}>{state}</option>
                                                            ))}
                                                        </select>
                                                        {errors.groomLicenseState && <span className="error-message">{errors.groomLicenseState}</span>}
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.placeOfBirth')}</label>
                                                        <input
                                                            type="text"
                                                            name="groomBirthPlace"
                                                            className={`form-control ${errors.groomBirthPlace ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.groomBirthPlace}
                                                        />
                                                        {errors.groomBirthPlace && <span className="error-message">{errors.groomBirthPlace}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <DatePicker
                                                            label={t('marriageCertificate.dateOfBirth')}
                                                            name="groomBirthDate"
                                                            value={formData.groomBirthDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            required
                                                            maxDate={new Date().toISOString().split('T')[0]}
                                                            error={errors.groomBirthDate}
                                                        />
                                                        {errors.groomBirthDate && <span className="error-message">{errors.groomBirthDate}</span>}
                                                    </div>
                                                </div>

                                                {/* Bride's Information */}
                                                <h4 className="section-heading">{t('marriageCertificate.brideInfo')}</h4>

                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <label className="form-label">{t('marriageCertificate.brideName')}</label>
                                                        <input
                                                            type="text"
                                                            name="brideName"
                                                            className={`form-control ${errors.brideName ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.brideName}
                                                        />
                                                        {errors.brideName && <span className="error-message">{errors.brideName}</span>}
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.licenseId')}</label>
                                                        <input
                                                            type="text"
                                                            name="brideLicenseId"
                                                            className={`form-control ${errors.brideLicenseId ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.brideLicenseId}
                                                        />
                                                        {errors.brideLicenseId && <span className="error-message">{errors.brideLicenseId}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.state')}</label>
                                                        <select
                                                            name="brideLicenseState"
                                                            className={`form-control ${errors.brideLicenseState ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.brideLicenseState}
                                                        >
                                                            <option value="">{t('marriageCertificate.selectState')}</option>
                                                            {usStates.map(state => (
                                                                <option key={state} value={state}>{state}</option>
                                                            ))}
                                                        </select>
                                                        {errors.brideLicenseState && <span className="error-message">{errors.brideLicenseState}</span>}
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.placeOfBirth')}</label>
                                                        <input
                                                            type="text"
                                                            name="brideBirthPlace"
                                                            className={`form-control ${errors.brideBirthPlace ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.brideBirthPlace}
                                                        />
                                                        {errors.brideBirthPlace && <span className="error-message">{errors.brideBirthPlace}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <DatePicker
                                                            label={t('marriageCertificate.dateOfBirth')}
                                                            name="brideBirthDate"
                                                            value={formData.brideBirthDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            required
                                                            maxDate={new Date().toISOString().split('T')[0]}
                                                            error={errors.brideBirthDate}
                                                        />
                                                        {errors.brideBirthDate && <span className="error-message">{errors.brideBirthDate}</span>}
                                                    </div>
                                                </div>

                                                {/* Signatures */}
                                                <h4 className="section-heading">{t('marriageCertificate.signatures')}</h4>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.groomSignature')}</label>
                                                        <input
                                                            type="text"
                                                            name="groomSignature"
                                                            className={`form-control ${errors.groomSignature ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.groomSignature}
                                                        />
                                                        {errors.groomSignature && <span className="error-message">{errors.groomSignature}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <DatePicker
                                                            label={t('marriageCertificate.date')}
                                                            name="groomSignatureDate"
                                                            value={formData.groomSignatureDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            required
                                                            error={errors.groomSignatureDate}
                                                        />
                                                        {errors.groomSignatureDate && <span className="error-message">{errors.groomSignatureDate}</span>}
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-md-4">
                                                        <label className="form-label">{t('marriageCertificate.brideRepSignature')}</label>
                                                        <input
                                                            type="text"
                                                            name="brideRepSignature"
                                                            className={`form-control ${errors.brideRepSignature ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.brideRepSignature}
                                                        />
                                                        {errors.brideRepSignature && <span className="error-message">{errors.brideRepSignature}</span>}
                                                    </div>
                                                    <div className="col-md-2">
                                                        <DatePicker
                                                            label={t('marriageCertificate.date')}
                                                            name="brideRepSignatureDate"
                                                            value={formData.brideRepSignatureDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            required
                                                            error={errors.brideRepSignatureDate}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                        <input
                                                            type="text"
                                                            name="brideRepLicenseId"
                                                            className={`form-control ${errors.brideRepLicenseId ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.brideRepLicenseId}
                                                        />
                                                        {errors.brideRepLicenseId && <span className="error-message">{errors.brideRepLicenseId}</span>}
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label">{t('marriageCertificate.state')}</label>
                                                        <select
                                                            name="brideRepLicenseState"
                                                            className={`form-control ${errors.brideRepLicenseState ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.brideRepLicenseState}
                                                        >
                                                            <option value="">{t('marriageCertificate.selectState')}</option>
                                                            {usStates.map(state => (
                                                                <option key={state} value={state}>{state}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Witnesses */}
                                                <h4 className="section-heading">{t('marriageCertificate.witnesses')}</h4>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.witness1Name')}</label>
                                                        <input
                                                            type="text"
                                                            name="witness1Name"
                                                            className={`form-control ${errors.witness1Name ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.witness1Name}
                                                        />
                                                        {errors.witness1Name && <span className="error-message">{errors.witness1Name}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                        <input
                                                            type="text"
                                                            name="witness1Id"
                                                            className={`form-control ${errors.witness1Id ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.witness1Id}
                                                        />
                                                        {errors.witness1Id && <span className="error-message">{errors.witness1Id}</span>}
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.witness2Name')}</label>
                                                        <input
                                                            type="text"
                                                            name="witness2Name"
                                                            className={`form-control ${errors.witness2Name ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.witness2Name}
                                                        />
                                                        {errors.witness2Name && <span className="error-message">{errors.witness2Name}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                        <input
                                                            type="text"
                                                            name="witness2Id"
                                                            className={`form-control ${errors.witness2Id ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.witness2Id}
                                                        />
                                                        {errors.witness2Id && <span className="error-message">{errors.witness2Id}</span>}
                                                    </div>
                                                </div>

                                                {/* IIC Officials */}
                                                <h4 className="section-heading">{t('marriageCertificate.iicOfficials')}</h4>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.authorizedPerson')}</label>
                                                        <input
                                                            type="text"
                                                            name="authorizedPersonName"
                                                            className="form-control"
                                                            style={{ backgroundColor: "#e9ecef" }}
                                                            required
                                                            readOnly
                                                            value={formData.authorizedPersonName}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.licenseIdLabel')}</label>
                                                        <input
                                                            type="text"
                                                            name="authorizedPersonId"
                                                            className="form-control"
                                                            style={{ backgroundColor: "#e9ecef" }}
                                                            required
                                                            readOnly
                                                            value={formData.authorizedPersonId}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.imamName')}</label>
                                                        <input
                                                            type="text"
                                                            name="imamName"
                                                            className="form-control"
                                                            style={{ backgroundColor: "#e9ecef" }}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.imamLicenseId')}</label>
                                                        <input
                                                            type="text"
                                                            name="imamLicenseId"
                                                            className="form-control"
                                                            style={{ backgroundColor: "#e9ecef" }}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>



                                                {/* Additional Information */}
                                                <h4 className="section-heading">{t('marriageCertificate.additionalInfo')}</h4>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">{t('marriageCertificate.dowryAmount')}</label>
                                                        <input
                                                            type="text"
                                                            name="dowryAmount"
                                                            className={`form-control ${errors.dowryAmount ? 'is-invalid' : ''}`}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={formData.dowryAmount}
                                                        />
                                                        {errors.dowryAmount && <span className="error-message">{errors.dowryAmount}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Date of Marriage</label>
                                                        <input
                                                            type="text"
                                                            name="nikaahDate"
                                                            className="form-control"
                                                            style={{ backgroundColor: "#e9ecef" }}
                                                            readOnly
                                                            value={formData.nikaahDate}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="btn-container">
                                                    <button type="submit" className="apply-btn">
                                                        {t('marriageCertificate.nextButton')}
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        {step === 2 && (
                                            <div className="appointment-section">
                                                <div className="row mb-4">
                                                    <div className="col-md-6 mb-3">
                                                        <DatePicker
                                                            label={t('marriageCertificate.appointmentDate')}
                                                            value={formData.appointmentDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="appointmentDate"
                                                            required
                                                            minDate={new Date().toISOString().split('T')[0]}
                                                            error={errors.appointmentDate}
                                                        />
                                                        {errors.appointmentDate && <span className="error-message">{errors.appointmentDate}</span>}
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <TimePicker
                                                            label={t('marriageCertificate.appointmentTime')}
                                                            value={formData.appointmentTime}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="appointmentTime"
                                                            required
                                                            error={errors.appointmentTime}
                                                        />
                                                        {errors.appointmentTime && <span className="error-message">{errors.appointmentTime}</span>}
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <label className="form-label">Contact Email (for confirmation)</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={formData.email}
                                                        placeholder="example@email.com"
                                                    />
                                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                                </div>

                                                <div className="mb-4">
                                                    <label className="form-label d-block mb-3">{t('marriageCertificate.appointmentLocation')}</label>

                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="appointmentLocation"
                                                            id="locationMasjid"
                                                            value="masjid"
                                                            checked={formData.appointmentLocation === 'masjid'}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="locationMasjid">
                                                            {t('marriageCertificate.masjidOption')}
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="appointmentLocation"
                                                            id="locationHome"
                                                            value="home"
                                                            checked={formData.appointmentLocation === 'home'}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="locationHome">
                                                            {t('marriageCertificate.homeOption')}
                                                        </label>
                                                    </div>
                                                </div>

                                                {formData.appointmentLocation === 'home' && (
                                                    <div className="mb-4 fade-in">
                                                        <label className="form-label">{t('marriageCertificate.homeAddressLabel')}</label>
                                                        <input
                                                            type="text"
                                                            name="homeAddress"
                                                            className={`form-control form-control-lg ${errors.homeAddress ? 'is-invalid' : ''}`}
                                                            required={formData.appointmentLocation === 'home'}
                                                            onChange={handleChange}
                                                            value={formData.homeAddress}
                                                        />
                                                        {errors.homeAddress && <span className="error-message">{errors.homeAddress}</span>}
                                                    </div>
                                                )}

                                                {/* Status Modal */}
                                                <StatusModal
                                                    show={!!status.message}
                                                    status={status}
                                                    onClose={() => setStatus({ type: '', message: '' })}
                                                />

                                                <div className="btn-container">
                                                    <button
                                                        type="button"
                                                        className="back-btn"
                                                        onClick={handleBack}
                                                    >
                                                        {t('marriageCertificate.backButton')}
                                                    </button>
                                                    <button type="submit" className="apply-btn">
                                                        {t('marriageCertificate.submitButton')}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MarriageCertificate;
