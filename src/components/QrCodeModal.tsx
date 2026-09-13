import { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, Download, Share2, QrCode as QrIcon } from 'lucide-react';
import type { Member } from '../types/member';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
}

export default function QrCodeModal({ isOpen, onClose, member }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrError, setQrError] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/member/${member.slug}`
    : `https://gfg-phcet.vercel.app/member/${member.slug}`;

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setQrError('');
    setQrDataUrl('');

    // Escape key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Use canvas to render QR code
    const renderQR = async () => {
      try {
        const QRCode = (await import('qrcode')).default;
        const canvas = canvasRef.current;
        if (canvas) {
          await QRCode.toCanvas(canvas, profileUrl, {
            width: 240,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#ffffff',
            },
            errorCorrectionLevel: 'H',
          });
          setQrDataUrl(canvas.toDataURL('image/png'));
        } else {
          // Fallback to dataURL if canvas ref not ready
          const url = await QRCode.toDataURL(profileUrl, {
            width: 240,
            margin: 2,
            color: { dark: '#000000', light: '#ffffff' },
            errorCorrectionLevel: 'H',
          });
          setQrDataUrl(url);
        }
        setLoading(false);
      } catch (err) {
        console.error('QR generation failed:', err);
        setQrError('Failed to generate QR code. Please copy the link below.');
        setLoading(false);
      }
    };

    renderQR();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, profileUrl, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text
      const el = document.createElement('textarea');
      el.value = profileUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const dataUrl = qrDataUrl || (canvasRef.current?.toDataURL('image/png') ?? '');
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${member.slug}-gfg-phcet-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await (navigator as Navigator & { share: (data: object) => Promise<void> }).share({
          title: `${member.name} — GFG PHCET`,
          text: `Check out ${member.name}'s profile on GFG PHCET Student Chapter!`,
          url: profileUrl,
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="qr-modal-backdrop" onClick={onClose}>
      <div className="qr-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="qr-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Header */}
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

        {/* QR Code - canvas for reliable browser rendering */}
        <div className="qr-code-box">
          {loading && (
            <div className="qr-loading">
              <div className="qr-spinner" />
              <span>Generating QR...</span>
            </div>
          )}
          {qrError ? (
            <div style={{ padding: '1.5rem', color: '#e1306c', fontSize: '0.82rem', textAlign: 'center' }}>
              {qrError}
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              style={{
                display: loading ? 'none' : 'block',
                borderRadius: '8px',
                width: 240,
                height: 240,
              }}
            />
          )}
        </div>

        <p className="qr-scan-hint">
          <QrIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          Scan to visit this member's page
        </p>

        {/* URL preview */}
        <div className="qr-url-preview">
          <span>{profileUrl}</span>
        </div>

        {/* Actions */}
        <div className="qr-actions-row">
          <button onClick={handleCopy} className="btn-secondary qr-action-btn" title="Copy URL">
            {copied ? <Check size={15} color="#00b386" /> : <Copy size={15} />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          <button onClick={handleDownload} className="btn-secondary qr-action-btn" title="Download QR" disabled={loading}>
            <Download size={15} />
            <span>Download</span>
          </button>

          <button onClick={handleNativeShare} className="btn-primary qr-action-btn" title="Share profile">
            <Share2 size={15} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
