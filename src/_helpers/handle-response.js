import { authenticationService } from '../_services';

export function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([400, 401, 403].indexOf(response.status) !== -1) {
        authenticationService.logout();
      }

      const error = data.message || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export function handleInternalResponse(response) {
  return response.text().then(text => {
    let data = text && JSON.parse(text);
    if (!response.ok) {
      if ([400, 401, 403].indexOf(response.status) !== -1) {
        return Promise.reject(data.message);
      }
    }
    return Promise.resolve(data.message);
  });
}