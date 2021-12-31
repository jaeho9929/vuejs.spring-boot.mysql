export default {
  register (detail) {
    return new Promise((resolve, reject) => {
      /* new user is only sunny@taskgile.com */
      detail.emailAddress === 'sunny@taskagile.com'
        ? resolve({result: 'success'})
        : reject(new Error('User already exist'))
    })
  }
}
