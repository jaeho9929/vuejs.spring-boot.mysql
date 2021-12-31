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
            v-show="errorMessage"
            class="alert alert-danger failed"
          >
            {{ errorMessage }}
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              class="form-control"
            >
            <div
              v-if="v$.username.$dirty"
              class="field-error"
            >
              <div
                v-if="v$.username.required.$invalid"
                class="error"
              >
                Username is required
              </div>
              <div
                v-if="v$.username.alphaNum.$invalid"
                class="error"
              >
                Username can only contain letters and numbers
              </div>
              <div
                v-if="v$.username.minLength.$invalid"
                class="error"
              >
                Username must have at least {{ v$.username.minLength.$params.min }} letters.
              </div>
              <div
                v-if="v$.username.maxLength.$invalid"
                class="error"
              >
                Username is too long. It can contains maximum {{ v$.username.maxLength.$params.max }} letters.
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="emailAddress">Email address</label>
            <input
              id="emailAddress"
              v-model="form.emailAddress"
              type="email"
              class="form-control"
            >
            <div
              v-if="v$.emailAddress.$dirty"
              class="field-error"
            >
              <div
                v-if="v$.emailAddress.required.$invalid"
                class="error"
              >
                Email address is required
              </div>
              <div
                v-if="v$.emailAddress.email.$invalid"
                class="error"
              >
                This is not a valid email address
              </div>
              <div
                v-if="v$.emailAddress.maxLength.$invalid"
                class="error"
              >
                Email address is too long. It can contains maximum {{ v$.emailAddress.maxLength.$params.max }} letters.
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-control"
            >
            <div
              v-if="v$.password.$dirty"
              class="field-error"
            >
              <div
                v-if="v$.password.required.$invalid"
                class="error"
              >
                Password is required
              </div>
              <div
                v-if="v$.password.minLength.$invalid"
                class="error"
              >
                Password is too short. It can contains at least {{ v$.password.minLength.$params.min }} letters.
              </div>
              <div
                v-if="v$.password.maxLength.$invalid"
                class="error"
              >
                Password is too long. It can contains maximum {{ v$.password.maxLength.$params.max }} letters.
              </div>
            </div>
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
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, alphaNum } from '@vuelidate/validators'
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
    const errorMessage = ref('')
    const rules = {
      username: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50),
        alphaNum
      },
      emailAddress: {
        required,
        email,
        maxLength: maxLength(100)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
      }
    }

    const v$ = useVuelidate(rules, form)

    async function submitForm() {
      v$.value.$touch()
      if (v$.value.$invalid) {
        return
      }

      try {
        await registrationService.register(form);
        router.push({name: 'LoginPage'})
        await router.isReady()
      } catch (error) {
        errorMessage.value = 'Failed to register user. Reason: ' +
        (error.message ? error.message : 'Unknown') + '.'
      }
    }

    return {
      form,
      v$,
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
