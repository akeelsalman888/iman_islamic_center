import React from 'react';
import './StatusModal.css';
import { useLanguage } from '../context/LanguageContext';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const StatusModal = ({ show, status, onClose }) => {
    const { language } = useLanguage();
    if (!show) return null;

    const isRTL = language === 'ar';

    let icon, title, buttonClass, headerClass;

    switch (status.type) {
        case 'success':
            icon = <FaCheckCircle className="status-modal-icon success" />;
            title = language === 'ar' ? 'نجاح' : 'Success';
            buttonClass = 'btn-success';
            headerClass = 'header-success';
            break;
        case 'error':
        case 'warning':
            icon = <FaTimesCircle className="status-modal-icon error" />;
            title = language === 'ar' ? 'تنبيه' : 'Error';
            buttonClass = 'btn-danger';
            headerClass = 'header-error';
            break;
        case 'info':
        default:
            icon = <FaSpinner className="status-modal-icon spin" />;
            title = language === 'ar' ? 'جاري المعالجة' : 'Processing';
            buttonClass = 'btn-primary';
            headerClass = 'header-info';
            break;
    }

    return (
        <div className="status-modal-overlay">
            <div className={`status-modal-content ${isRTL ? 'rtl' : ''}`}>
                <div className={`status-modal-header ${headerClass}`}>
                    {icon}
                    <h3>{title}</h3>
                </div>
                <div className="status-modal-body">
                    <p>{status.message}</p>
                </div>
                {status.type !== 'info' && (
                    <div className="status-modal-footer">
                        <button className={`btn ${buttonClass}`} onClick={onClose}>
                            {language === 'ar' ? 'إغلاق' : 'Close'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusModal;
