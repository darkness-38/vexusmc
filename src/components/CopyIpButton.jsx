import { useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';

const SERVER_IP = 'oyna.vexusmc.tech';

async function copyWithFallback(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const success = document.execCommand('copy');
  document.body.removeChild(textarea);
  return success;
}

export default function CopyIpButton() {
  const [status, setStatus] = useState('idle');

  const handleCopy = async () => {
    try {
      await copyWithFallback(SERVER_IP);
      setStatus('success');
      window.setTimeout(() => setStatus('idle'), 1800);
    } catch (error) {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 1800);
    }
  };

  return (
    <div className="ip-wrapper">
      <button className="btn btn-primary" onClick={handleCopy} aria-live="polite">
        {status === 'success' ? <CheckCircle2 size={18} /> : <Copy size={18} />}
        {status === 'success' ? 'Kopyalandi' : 'IP Kopyala'}
      </button>
      <span className="ip-pill">{SERVER_IP}</span>
      {status === 'error' && <small className="copy-feedback">Kopyalama basarisiz, elle kopyalayin.</small>}
    </div>
  );
}

