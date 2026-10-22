import { Fragment } from 'react';
export function TypeRibbon() {
  return (
    <div className="type-ribbon" aria-hidden="true">
      <div>
        {Array.from({ length: 4 }, (_, i) => (
          <Fragment key={i}>
            CREATIVE THINKING <span>✳</span> THOUGHTFUL DEVELOPMENT <span>✳</span>{' '}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
