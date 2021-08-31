import Script from 'next/script';

if (typeof window !== 'undefined') window.dataLayer = window.dataLayer || [];

/**
 * Dispatch an event with GTM
 *
 * @param {boolean} [action=false] - Action name
 * @param {any} [payload={}] - Action data
 */
function gtmEvent(action = false, payload = {}): void {
  if (typeof window !== 'undefined' && action) {
    window.dataLayer.push({
      event: action,
      payload
    });
  }
}

/**
 * GTM code snippet in head
 */
export const GtmScript = () => {
  return (
    <Script
      id="gtm-container"
      /* <!-- Google Tag Manager --> */
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`
      }}
      /* <!-- End Google Tag Manager --> */
    />
  );
};

/**
 * GTM code snippet in body
 */
export const GtmNoScript = () => {
  return (
    <noscript>
      {/* <!-- Google Tag Manager (noscript) --> */}
      <iframe
        title="gtm-container"
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
      {/* <!-- End Google Tag Manager (noscript) --> */}
    </noscript>
  );
};

export default { gtmEvent, GtmScript, GtmNoScript };
