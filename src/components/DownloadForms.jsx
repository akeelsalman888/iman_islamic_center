import React from "react";
import { FaFileDownload, FaFilePdf, FaFileWord } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import "./DownloadForms.css";

function DownloadForms() {
    const { t } = useLanguage();

    const forms = [
        {
            titleKey: "downloadForms.constitutionTitle",
            descKey: "downloadForms.constitutionDesc",
            fileName: "Constitution and bylaws.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        },
        {
            titleKey: "downloadForms.commitmentTitle",
            descKey: "downloadForms.commitmentDesc",
            fileName: "Islamic_Center_Monthly_Commitment_Form.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        },
        {
            titleKey: "downloadForms.elcTitle",
            descKey: "downloadForms.elcDesc",
            fileName: "ELC Member work form.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        },
        {
            titleKey: "downloadForms.boardTitle",
            descKey: "downloadForms.boardDesc",
            fileName: "board of directors member work form.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        }
    ];

    return (
        <section className="forms-section" id="forms">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">{t('downloadForms.title')}</h2>
                    <p className="section-subtitle">
                        {t('downloadForms.subtitle')}
                    </p>
                </div>

                <div className="row g-4">
                    {forms.map((form, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="form-download-card">
                                <div className="card-icon">
                                    {form.icon}
                                </div>
                                <div className="card-body pl-0">
                                    <h3 className="form-name">{t(form.titleKey)}</h3>
                                    <p className="form-desc">{t(form.descKey)}</p>
                                    <span className="file-badge">{form.format}</span>
                                    <a
                                        href={`/forms/${form.fileName}`}
                                        download
                                        className="btn btn-download-form"
                                    >
                                        <FaFileDownload /> {t('downloadForms.download')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default DownloadForms;
