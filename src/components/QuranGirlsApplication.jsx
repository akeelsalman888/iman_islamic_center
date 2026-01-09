import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./QuranGirlsApplication.css";

function QuranGirlsApplication() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        studentName: "",
        grade: "",
        age: "",
        address: "",
        school: "",
        guardianName: "",
        kinship: "",
        guardianJob: "",
        workPhone: "",
        homePhone: "",
        mobile: "",
        email: "",
        guardianNameAck: "",
        signature: "",
        phoneAck: "",
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Application submitted successfully!");
        // Here you would typically send the data to your backend
    };

    return (
        <div className="quran-girls-application-page">
            <div className="container py-5">
                <div className="quran-application-card">
                    <h1 className="application-title">{t('quranGirls.title')}</h1>
                    <p className="application-subtitle">{t('quranGirls.subtitle')}</p>

                    <form onSubmit={handleSubmit}>
                        {/* Student Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.studentInfo')}</h3>

                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <label className="form-label">{t('quranGirls.studentName')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.grade')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-2 mb-3">
                                    <label className="form-label">{t('quranGirls.age')}</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-10 mb-3">
                                    <label className="form-label">{t('quranGirls.address')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranGirls.school')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Guardian Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.guardianInfo')}</h3>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label className="form-label">{t('quranGirls.guardianName')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianName"
                                        value={formData.guardianName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">{t('quranGirls.kinship')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="kinship"
                                        value={formData.kinship}
                                        onChange={handleChange}
                                        placeholder={t('quranGirls.kinshipPlaceholder')}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.guardianJob')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianJob"
                                        value={formData.guardianJob}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.contactInfo')}</h3>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.workPhone')}</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="workPhone"
                                        value={formData.workPhone}
                                        onChange={handleChange}
                                        placeholder="(402) 123-4567"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.homePhone')}</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="homePhone"
                                        value={formData.homePhone}
                                        onChange={handleChange}
                                        placeholder="(402) 123-4567"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.mobile')}</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="(402) 123-4567"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{t('quranGirls.email')}</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Program Policies */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.programPolicies')}</h3>
                            <ol className="policies-list">
                                <li>{t('quranGirls.policy1')}</li>
                                <li>{t('quranGirls.policy2')}</li>
                                <li>{t('quranGirls.policy3')}</li>
                                <li>{t('quranGirls.policy4')}</li>
                                <li>{t('quranGirls.policy5')}</li>
                                <li>{t('quranGirls.policy6')}</li>
                                <li>{t('quranGirls.policy7')}</li>
                                <li>{t('quranGirls.policy8')}</li>
                                <li>{t('quranGirls.policy9')}</li>
                            </ol>
                        </div>

                        {/* Acknowledgement */}
                        <div className="form-section">
                            <h3 className="section-title">{t('quranGirls.acknowledgement')}</h3>

                            <div className="acknowledgement-text">
                                <p><strong>{t('quranGirls.ackStatement1')}</strong></p>
                                <p>{t('quranGirls.ackStatement2')}</p>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.guardianNameAck')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianNameAck"
                                        value={formData.guardianNameAck}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.signature')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="signature"
                                        value={formData.signature}
                                        onChange={handleChange}
                                        placeholder={t('quranGirls.signaturePlaceholder')}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">{t('quranGirls.phoneAck')}</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phoneAck"
                                        value={formData.phoneAck}
                                        onChange={handleChange}
                                        placeholder="(402) 123-4567"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                    required
                                    id="agreeToTerms"
                                />
                                <label className="form-check-label" htmlFor="agreeToTerms">
                                    {t('quranGirls.agreeToTerms')}
                                </label>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary btn-submit">
                                {t('quranGirls.submitButton')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default QuranGirlsApplication;
