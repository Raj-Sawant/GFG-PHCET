import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Download, Share2, QrCode as QrIcon } from 'lucide-react';
import type { Member } from '../types/member';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
}

export default function QrCodeModal({ isOpen, onClose, member }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/member/${member.slug}`
    : `https://gfg-phcet.edu/member/${member.slug}`;

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(profileUrl, {
      width: 360,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code:', err));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, profileUrl, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${member.slug}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${member.name} - GFG PHCET`,
          text: `Check out ${member.name}'s profile on GFG PHCET Student Chapter!`,
          url: profileUrl,
        });
      } catch (err) {
        console.error('Share cancelled or failed', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="qr-modal-backdrop" onClick={onClose}>
      <div className="qr-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="qr-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="qr-modal-header">
          <div className="qr-avatar-badge">
            <img
              src={member.avatar}
              alt={member.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00b386&color=fff&size=100`;
              }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 className="qr-modal-title">{member.name}</h3>
            <p className="qr-modal-subtitle">{member.position} • {member.domain}</p>
          </div>
        </div>

        {/* QR Code Canvas */}
        <div className="qr-code-box">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt={`QR code for ${member.name}`} className="qr-code-image" />
          ) : (
            <div style={{ padding: '3rem', color: '#64748b' }}>Generating QR...</div>
          )}
        </div>

        <p className="qr-scan-hint">
          <QrIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          Scan to visit this member's page directly
        </p>

        {/* Actions */}
        <div className="qr-actions-row">
          <button onClick={handleCopy} className="btn-secondary qr-action-btn" title="Copy URL">
            {copied ? <Check size={15} color="#00b386" /> : <Copy size={15} />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>

          <button onClick={handleDownload} className="btn-secondary qr-action-btn" title="Download QR image">
            <Download size={15} />
            <span>Download</span>
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button onClick={handleNativeShare} className="btn-primary qr-action-btn" title="Share profile">
              <Share2 size={15} />
              <span>Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
