import React from 'react';

const ServiceWorkerTool: React.FC<Record<string, never>> = () => {
  const _workerActive =
    localStorage.getItem('devTools/mock-service-worker-enabled') ?? 'disabled';
  const workerActive = _workerActive === 'enabled';

  const handleToggleWorker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    localStorage.setItem(
      'devTools/mock-service-worker-enabled',
      checked ? 'enabled' : 'disabled'
    );
    window.location.reload();
  };

  return (
    <React.Fragment>
      <span style={{ marginRight: 8 }}>
        <span style={{ marginRight: 8 }}>Mock Service Worker:</span>
        {workerActive ? 'Enabled' : 'Disabled'}
      </span>
      <input
        type="checkbox"
        checked={workerActive}
        onChange={(e) => handleToggleWorker(e)}
        style={{ margin: 0 }}
      />
    </React.Fragment>
  );
};

export default React.memo(ServiceWorkerTool);
