import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

// jsdom does not implement native dialog APIs. Mirror their open state and close event;
// actual Escape handling, focus trapping, and layout are also checked in the browser.
HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
  this.querySelector<HTMLButtonElement>('button')?.focus();
};
HTMLDialogElement.prototype.close = function () {
  if (!this.open) return;
  this.open = false;
  this.dispatchEvent(new Event('close'));
};
