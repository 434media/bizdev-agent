'use client';

import { useState } from 'react';
import styles from './Home.module.css';

interface FormData {
  company_name: string;
  company_url: string;
  worker_name: string;
  worker_email: string;
  additional_info: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    company_name: '',
    company_url: '',
    worker_name: '',
    worker_email: '',
    additional_info: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [coldEmail, setColdEmail] = useState<string>('');
  const [extraInfo, setExtraInfo] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_name.trim() || !formData.company_url.trim()) {
      alert('Please fill in all required fields (Company Name and Company URL)');
      return;
    }
    setIsLoading(true);
    setColdEmail('');
    setExtraInfo('');
    try {
      const response = await fetch('http://localhost:8000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setColdEmail(result.message || '');
      setExtraInfo('No extra information available.');
      setFormData({
        company_name: '',
        company_url: '',
        worker_name: '',
        worker_email: '',
        additional_info: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setColdEmail('Error generating response.');
      setExtraInfo('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SpeedLead</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.inputGroup} style={{flex: 1, marginRight: '1rem'}}>
            <label htmlFor="company_name" className={styles.label}>
              Company Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
              placeholder="e.g., Acme Corporation"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup} style={{flex: 1}}>
            <label htmlFor="company_url" className={styles.label}>
              Company URL <span className={styles.required}>*</span>
            </label>
            <input
              type="url"
              id="company_url"
              name="company_url"
              value={formData.company_url}
              onChange={handleInputChange}
              placeholder="https://www.example.com"
              className={styles.input}
              required
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup} style={{flex: 1, marginRight: '1rem'}}>
            <label htmlFor="worker_name" className={styles.label}>
              Worker Name
            </label>
            <input
              type="text"
              id="worker_name"
              name="worker_name"
              value={formData.worker_name}
              onChange={handleInputChange}
              placeholder="e.g., John Doe"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup} style={{flex: 1}}>
            <label htmlFor="worker_email" className={styles.label}>
              Worker Email
            </label>
            <input
              type="email"
              id="worker_email"
              name="worker_email"
              value={formData.worker_email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup} style={{flex: 2, marginRight: '1rem'}}>
            <label htmlFor="additional_info" className={styles.label}>
              Additional Info
            </label>
            <textarea
              id="additional_info"
              name="additional_info"
              value={formData.additional_info}
              onChange={handleInputChange}
              placeholder="industry, notes, etc."
              className={styles.textarea}
              rows={2}
            />
          </div>
          <div className={styles.inputGroup} style={{display: 'flex', alignItems: 'flex-end', flex: 1}}>
            <button
              type="submit"
              className={styles.button}
              disabled={isLoading}
              style={{width: '100%'}}>
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </form>
      <div className={styles.outputSection}>
        <div className={styles.outputBox}>
          <div className={styles.outputLabel}>Cold Email</div>
          <div className={styles.outputContent}>{coldEmail}</div>
        </div>
        <div className={styles.outputBox}>
          <div className={styles.outputLabel}>Extra Information</div>
          <div className={styles.outputContent}>{extraInfo}</div>
        </div>
      </div>
    </div>
  );
}
