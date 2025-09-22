import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const progressGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const test1Started = localStorage.getItem('test1Started');
  const progress = JSON.parse(localStorage.getItem('testProgress') || '{}');
  const currentUrl = state.url;

  if (!test1Started) {
    return router.createUrlTree(['/home']);
  }

  if (currentUrl.includes('test2') && !progress.test1Completed) {
    return router.createUrlTree(['/test1']);
  }

  if (currentUrl.includes('test3') && !progress.test2Completed) {
    return router.createUrlTree(['/test2']);
  }

  if (currentUrl.includes('finish') && !progress.test3Completed) {
    return router.createUrlTree(['/test3']);
  }

  if (currentUrl.includes('test1') && progress.test1Completed && progress.test2Completed && progress.test3Completed) {
    return router.createUrlTree(['/finish']);
  }

  if (currentUrl.includes('test2') && progress.test1Completed && progress.test2Completed && progress.test3Completed) {
    return router.createUrlTree(['/finish']);
  }

  if (currentUrl.includes('test3') && progress.test1Completed && progress.test2Completed && progress.test3Completed) {
    return router.createUrlTree(['/finish']);
  }

  return true;
};
