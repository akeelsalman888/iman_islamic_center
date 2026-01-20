import React, { useState, useEffect, useRef } from 'react';
import './DateTimePicker.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

export const DatePicker = ({ value, onChange, onBlur, label, required = false, minDate = null, maxDate = null, name = 'date', error = null }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value || '');
    const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
    const pickerRef = useRef(null);

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
            // Only update current month if the picker is not open or if it's the first load
            // This prevents jumping around if value changes externally while picking
            if (!showPicker) {
                setCurrentMonth(new Date(value + 'T00:00:00'));
            }
        }
    }, [value, showPicker]);

    // Handle clicking outside to close picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                if (showPicker) {
                    setShowPicker(false);
                    // Trigger onBlur when closing picker if needed
                    if (onBlur) onBlur({ target: { name, value: selectedDate } });
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker, onBlur, name, selectedDate]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Generate years range: 1900 to Current Year + 10
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 150 }, (_, i) => currentYear + 10 - i);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const handleDateClick = (day) => {
        const year = currentMonth.getFullYear();
        const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateString = `${year}-${month}-${dayStr}`;
        setSelectedDate(dateString);
        onChange({ target: { name: name, value: dateString } });
        setShowPicker(false);
        // We trigger onBlur manually here or let the parent handle it via effect?
        // Usually clicking a date finishes the interaction.
        if (onBlur) onBlur({ target: { name, value: dateString } });
    };

    const formatDisplayDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr + 'T00:00:00');
        if (isNaN(date.getTime())) return ''; // Invalid date
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isDateDisabled = (day) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const checkDate = new Date(year, month, day);

        if (minDate) {
            const min = new Date(minDate + 'T00:00:00');
            if (checkDate < min) return true;
        }

        if (maxDate) {
            const max = new Date(maxDate + 'T00:00:00');
            if (checkDate > max) return true;
        }

        return false;
    };

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value);
        setCurrentMonth(new Date(currentMonth.getFullYear(), newMonth, 1));
    };

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value);
        setCurrentMonth(new Date(newYear, currentMonth.getMonth(), 1));
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isSelected = selectedDate === dateStr;
        const isDisabled = isDateDisabled(day);

        days.push(
            <div
                key={day}
                className={`calendar-day ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && handleDateClick(day)}
            >
                {day}
            </div>
        );
    }

    return (
        <div className="datetime-picker-wrapper" ref={pickerRef}>
            {label && <label className="form-label">{label}</label>}
            <div className={`datetime-input-group`} onClick={() => setShowPicker(!showPicker)}>
                <FaCalendarAlt className="datetime-icon" />
                <input
                    type="text"
                    className={`form-control datetime-display ${error ? 'is-invalid' : ''}`}
                    value={formatDisplayDate(selectedDate)}
                    readOnly
                    placeholder="Select Date"
                    required={required}
                    onBlur={(e) => {
                        // This onBlur triggers when focus leaves the INPUT.
                        // But since it's readOnly and we use a custom picker, 
                        // we mainly rely on explicit blur handling or click-outside.
                        // However, for tab navigation, this is useful.
                    }}
                />
            </div>

            {showPicker && (
                <div className="datetime-picker-dropdown">
                    <div className="calendar-header">
                        <button
                            type="button"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                            className="calendar-nav-btn"
                        >
                            ‹
                        </button>

                        <div className="d-flex gap-2 align-items-center justify-content-center flex-grow-1">
                            <select
                                className="form-select form-select-sm p-1"
                                style={{ width: 'auto', fontWeight: 'bold', fontSize: '0.9rem' }}
                                value={currentMonth.getMonth()}
                                onChange={handleMonthChange}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                            </select>
                            <select
                                className="form-select form-select-sm p-1"
                                style={{ width: 'auto', fontWeight: 'bold', fontSize: '0.9rem' }}
                                value={currentMonth.getFullYear()}
                                onChange={handleYearChange}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                            className="calendar-nav-btn"
                        >
                            ›
                        </button>
                    </div>
                    <div className="calendar-weekdays">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="calendar-weekday">{day}</div>
                        ))}
                    </div>
                    <div className="calendar-days">
                        {days}
                    </div>
                </div>
            )}
        </div>
    );
};

export const TimePicker = ({ value, onChange, onBlur, label, required = false, name = 'time', error = null }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(value || '');
    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('00');
    const [period, setPeriod] = useState('PM');
    const pickerRef = useRef(null);

    useEffect(() => {
        if (value) {
            setSelectedTime(value);
            const [h, m] = value.split(':');
            const hourNum = parseInt(h);
            setHour(String(hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum).padStart(2, '0'));
            setMinute(m);
            setPeriod(hourNum >= 12 ? 'PM' : 'AM');
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                if (showPicker) {
                    setShowPicker(false);
                    if (onBlur) onBlur({ target: { name, value: selectedTime } });
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker, onBlur, name, selectedTime]);


    const handleTimeSelect = () => {
        let hour24 = parseInt(hour);
        if (period === 'PM' && hour24 !== 12) hour24 += 12;
        if (period === 'AM' && hour24 === 12) hour24 = 0;

        const timeString = `${String(hour24).padStart(2, '0')}:${minute}`;
        setSelectedTime(timeString);
        onChange({ target: { name: name, value: timeString } });
        setShowPicker(false);
        if (onBlur) onBlur({ target: { name, value: timeString } });
    };

    const formatDisplayTime = (timeStr) => {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':');
        const hourNum = parseInt(h);
        const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        return `${hour12}:${m} ${ampm}`;
    };

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

    return (
        <div className="datetime-picker-wrapper" ref={pickerRef}>
            {label && <label className="form-label">{label}</label>}
            <div className="datetime-input-group" onClick={() => setShowPicker(!showPicker)}>
                <FaClock className="datetime-icon" />
                <input
                    type="text"
                    className={`form-control datetime-display ${error ? 'is-invalid' : ''}`}
                    value={formatDisplayTime(selectedTime)}
                    readOnly
                    placeholder="Select Time"
                    required={required}
                />
            </div>

            {showPicker && (
                <div className="datetime-picker-dropdown time-picker">
                    <div className="time-picker-header">Select Time</div>
                    <div className="time-picker-body">
                        <div className="time-column">
                            <div className="time-column-label">Hour</div>
                            <div className="time-scroll">
                                {hours.map(h => (
                                    <div
                                        key={h}
                                        className={`time-option ${hour === h ? 'selected' : ''}`}
                                        onClick={() => setHour(h)}
                                    >
                                        {h}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="time-separator">:</div>
                        <div className="time-column">
                            <div className="time-column-label">Minute</div>
                            <div className="time-scroll">
                                {minutes.map(m => (
                                    <div
                                        key={m}
                                        className={`time-option ${minute === m ? 'selected' : ''}`}
                                        onClick={() => setMinute(m)}
                                    >
                                        {m}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="time-column">
                            <div className="time-column-label">Period</div>
                            <div className="time-scroll">
                                {['AM', 'PM'].map(p => (
                                    <div
                                        key={p}
                                        className={`time-option ${period === p ? 'selected' : ''}`}
                                        onClick={() => setPeriod(p)}
                                    >
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="time-picker-footer">
                        <button type="button" className="btn btn-primary btn-sm" onClick={handleTimeSelect}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
