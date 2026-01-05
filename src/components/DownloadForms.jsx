import React from "react";
import { FaFileDownload, FaFilePdf, FaFileWord } from "react-icons/fa";
import "./DownloadForms.css";

function DownloadForms() {
    const forms = [
        {
            title: "Membership Form",
            description: "Apply to become a formal member of the Iman Islamic Center community.",
            fileName: "membership.pdf",
            icon: <FaFilePdf className="pdf-icon" />,
            format: "PDF"
        },
        {
            title: "Donation Form",
            description: "Manual form for recurring donations or specific project contributions.",
            fileName: "donation.pdf",
            icon: <FaFilePdf className="pdf-icon" />,
            format: "PDF"
        },
        {
            title: "Volunteer Application",
            description: "Join our team of volunteers and help us serve the community.",
            fileName: "volunteer.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        }
    ];

    return (
        <section className="forms-section" id="forms">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Community Forms</h2>
                    <p className="section-subtitle">
                        Download and fill out these forms to participate in our community activities and programs.
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
                                    <h3 className="form-name">{form.title}</h3>
                                    <p className="form-desc">{form.description}</p>
                                    <span className="file-badge">{form.format}</span>
                                    <a
                                        href={`/forms/${form.fileName}`}
                                        download
                                        className="btn btn-download-form"
                                    >
                                        <FaFileDownload /> Download Now
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
