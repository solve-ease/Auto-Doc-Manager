export const checkToken = async () => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return
  }

  try {
    const response = await fetch('http://localhost:5000/auth/check-token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      return data.user
    } else if (response.status === 403) {
      // Token is expired, try to refresh it
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        return
      }

      const refreshResponse = await fetch('http://localhost:5000/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshToken })
      })

      if (refreshResponse.ok) {
        const data = await refreshResponse.json()
        localStorage.setItem('accessToken', data.accessToken)
        return data.user
      } else {
        return null
      }
    }
  } catch (error) {
    console.error('Error checking token:', error)
    return null
  }
}
