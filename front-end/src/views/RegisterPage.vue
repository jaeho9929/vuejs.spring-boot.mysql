<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="register-form">
        <div class="logo-wrapper">
          <img
            class="logo"
            src="/static/images/logo.png"
          >
          <div class="tagline">
            Open source task management tool
          </div>
        </div>
        <form @submit.prevent="submitForm">
          <div
            v-show="errorMessage.visible"
            class="alert alert-danger failed"
          >
            {{ errorMessage.message }}
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="emailAddress">Email address</label>
            <input
              id="emailAddress"
              v-model="form.emailAddress"
              type="email"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-control"
            >
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block"
          >
            Create account
          </button>
          <p class="accept-terms text-muted">
            By clicking “Create account”, you agree to our <a href="#">terms of service</a> and <a href="#">privacy policy</a>.
          </p>
          <p class="text-center text-muted">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
    <footer class="footer">
      <span class="copyright">&copy; 2018 TaskAgile.com</span>
      <ul class="footer-links list-inline float-right">
        <li class="list-inline-item">
          <a href="#">About</a>
        </li>
        <li class="list-inline-item">
          <a href="#">Terms of Service</a>
        </li>
        <li class="list-inline-item">
          <a href="#">Privacy Policy</a>
        </li>
        <li class="list-inline-item">
          <a
            href="https://github.com/taskagile/vuejs.spring-boot.mysql"
            target="_blank"
          >GitHub</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import registrationService from '@/services/registration'

export default {
  name: 'RegisterPage',
  setup() {
    const router = useRouter()
    const form  = reactive({
      username: '',
      emailAddress: '',
      password: ''
    })
    const errorMessage = reactive({
      visible: false,
      message: ''
    })

    async function submitForm() {
      try {
        await registrationService.register(form);
        router.push({name: 'LoginPage'})
        await router.isReady()
      } catch (error) {
        errorMessage.message = 'Failed to register user. Reason: ' +
        (error.message ? error.message : 'Unknown') + '.'
        errorMessage.visible = true
      }
    }

    return {
      form,
      errorMessage,
      submitForm,
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 900px;
}

.register-form {
  margin-top: 50px;
  max-width: 320px;
}

.logo-wrapper {
  margin-bottom: 40px;
}

.footer {
  width: 100%;
  line-height: 40px;
  margin-top: 50px;
}

</style>
