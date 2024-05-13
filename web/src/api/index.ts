import ky from "ky";

export const baseurl = import.meta.env.VITE_BASE_URL


const request = ky.create({
  prefixUrl: baseurl,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
}).extend({
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      }
    ],
    beforeError: [
      error => {
        if (error.response.status === 401) {
          location.href = "/"
        }
        return error
      }
    ]
  }
})

export default request