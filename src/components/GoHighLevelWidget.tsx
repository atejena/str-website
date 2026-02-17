'use client';

import { useEffect } from 'react';

interface GoHighLevelWidgetProps {
  widgetId: string;
}

export default function GoHighLevelWidget({ widgetId }: GoHighLevelWidgetProps) {
  useEffect(() => {
    if (!widgetId) return;

    // Avoid injecting the script twice
    const existingScript = document.querySelector(
      'script[data-widget-id="' + widgetId + '"]'
    );
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute(
      'data-resources-url',
      'https://widgets.leadconnectorhq.com/chat-widget/loader.js'
    );
    script.setAttribute('data-widget-id', widgetId);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up on unmount
      script.remove();
    };
  }, [widgetId]);

  // Renders nothing visible — the script injects the chat widget
  return null;
}
