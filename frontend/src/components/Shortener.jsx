import { useState } from 'react';
import { createShortUrl } from '../api/url';

function Shortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      const res = await createShortUrl(url);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setShortUrl(res.data.shortUrl || res.data.id || res.data.error);
    } catch (err) {
      const message = err?.response?.data?.error || 'Something went wrong';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="card">
      <h1>🔗 URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Generate Shorten Link'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result">
          <p>
            Short URL:  {' '} 
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>

          <button
            className={copied ? 'copy-btn copied' : 'copy-btn'}
            onClick={handleCopy}
            disabled={copied}
          >
            {copied ? 'Copied ✔️' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Shortener;
