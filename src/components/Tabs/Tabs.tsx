import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { Tab } from '../../types/Tab';

type Props = {
  tabs: Tab[];
  selectedTabId: string;
  onTabSelected: (tab: Tab) => void;
};

export const Tabs: React.FC<Props> = ({
  tabs,
  selectedTabId,
  onTabSelected,
}) => {
  const clickHandler = useCallback((tab: Tab) => {
    if (selectedTabId !== tab.id) {
      onTabSelected(tab);
    }
  }, [selectedTabId]);

  const selectedTab = useMemo(
    () => (
      tabs.find((tab) => (tab.id === selectedTabId)) || tabs[0]
    ),
    [selectedTabId, tabs],
  );

  return (
    <div data-cy="TabsComponent">
      <div className="tabs is-boxed">
        <ul>
          {tabs.map((tab) => (
            <li
              className={classNames(
                {
                  'is-active': tab.id === selectedTab.id,
                },
              )}
              data-cy="Tab"
              key={tab.id}
            >
              <a
                href={`#${tab.id}`}
                data-cy="TabLink"
                onClick={() => (clickHandler(tab))}
              >
                {tab.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="block"
        data-cy="TabContent"
      >
        {selectedTab.content}
      </div>
    </div>
  );
};
