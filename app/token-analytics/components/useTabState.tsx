import { useEffect, useState } from 'react';
import { TAB_IDS } from './tab-handler';

const validTabValue = (value?: string) =>
  value && Object.values(TAB_IDS).includes(value) ? value : TAB_IDS.overview;

export default function useTabState(defaultTab?: string) {
  const [defaultValue, setDefaultValue] = useState(validTabValue(defaultTab));
  const tabChangeHandler = (tab: string) => {
    const url = new URL(window.location.href);

    url.hash = '#' + tab + '-widget';
    const top = document.getElementById(tab + '-widget')?.offsetTop;

    window.scrollTo(0, top ?? 0);
    setDefaultValue(validTabValue(tab));
  };

  useEffect(() => {
    window.addEventListener('popstate', () => {
      const url = new URL(window.location.href);
      const tab = url.searchParams.get('taTab');

      if (tab) {
        setDefaultValue(validTabValue(tab));
      }
    });
  }, []);

  return { defaultValue, tabChangeHandler };
}
