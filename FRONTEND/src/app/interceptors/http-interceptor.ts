import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  if (accessToken) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });

    return next(clonedRequest);
  }

  return next(req);
};
