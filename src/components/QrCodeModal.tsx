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
    ? (() => {
        const origin = window.location.origin;
        const pathname = window.location.pathname;
        const segments = pathname.split('/').filter(Boolean);
        const repoPrefix = segments.length > 0 && segments[0].toLowerCase() === 'gfg-phcet'
          ? `/${segments[0]}`
          : '';
        return `${origin}${repoPrefix}/member/${member.slug}`;
      })()
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
        {/* Close Button */}
        <button className="qr-modal-close-btn" onClick={onClose} aria-label="Close Modal" title="Close">
          <X size={18} />
        </button>

        {/* Header */}
        <div className="qr-modal-header">
          <h3 className="qr-modal-title">{member.name}</h3>
          <p className="qr-modal-subtitle">{member.position} &bull; {member.domain}</p>
        </div>

        {/* QR Code Canvas Card */}
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
              className="qr-canvas"
              style={{
                display: loading ? 'none' : 'block',
              }}
            />
          )}
        </div>

        <p className="qr-scan-hint">
          <QrIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          <span>Scan to visit member profile</span>
        </p>

        {/* URL preview */}
        <div className="qr-url-preview">
          <span>{profileUrl}</span>
        </div>

        {/* Actions - Symmetrical Icon-Only Buttons (No Text) */}
        <div className="qr-actions-row">
          <button
            type="button"
            onClick={handleCopy}
            className={`qr-icon-action-btn copy-btn${copied ? ' copied' : ''}`}
            title={copied ? 'Link Copied to Clipboard!' : 'Copy Profile Link'}
            aria-label="Copy Link"
          >
            {copied ? <Check size={20} color="#00df82" /> : <Copy size={19} />}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="qr-icon-action-btn download-btn"
            title="Download QR Code Image"
            aria-label="Download QR Code Image"
            disabled={loading}
          >
            <Download size={19} />
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="qr-icon-action-btn share-btn"
            title="Share Profile Link"
            aria-label="Share Profile Link"
          >
            <Share2 size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
