import { mount } from '@vue/test-utils'
import RegisterPage from '@/views/RegisterPage'
import { createVueRouter } from '@/router'

jest.mock('@/services/registration')

describe('RegisterPage.vue', () => {
  let wrapper
  let fieldUsername
  let fieldEmailAddress
  let fieldPassword
  let buttonSubmit

  beforeEach(async () => {
    const router = createVueRouter()
    router.push("/register")
    await router.isReady()
    wrapper = mount(RegisterPage, {
      global: {
        plugins: [router]
      }
    })
    fieldUsername = wrapper.find('#username')
    fieldEmailAddress = wrapper.find('#emailAddress')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('button[type="submit"')
  })

  afterAll(async () => {
    await jest.restoreAllMocks()
  })

  it('should render registration form', ()=> {
    expect(wrapper.find('.logo').attributes().src)
    .toEqual('/static/images/logo.png')
    expect(wrapper.find('.tagline').text())
    .toEqual('Open source task management tool')
    expect(fieldUsername.element.value).toEqual('')
    expect(fieldEmailAddress.element.value).toEqual('')
    expect(fieldPassword.element.value).toEqual('')
    expect(buttonSubmit.text()).toEqual('Create account')
  })

  it('should contain data model with initial values', () => {
    expect(wrapper.vm.form.username).toEqual('')
    expect(wrapper.vm.form.emailAddress).toEqual('')
    expect(wrapper.vm.form.password).toEqual('')
  })

  it('should have form inputs bound with data model', () => {
    const username = 'sunny'
    const emailAddress = 'sunny@taskagile.com'
    const password = 'VueJsRocks!'

    fieldUsername.setValue(username)
    fieldEmailAddress.setValue(emailAddress)
    fieldPassword.setValue(password)
    expect(fieldUsername.element.value).toEqual(username)
    expect(fieldEmailAddress.element.value).toEqual(emailAddress)
    expect(fieldPassword.element.value).toEqual(password)
  })

  it('should have form submit event handler `submitForm`', () => {
    const stub = jest.fn()
    wrapper.vm.submitForm = stub
    wrapper.find('form').trigger('submit')
    expect(stub).toBeCalled()
  })

  it('should register when it is a new user', async () => {
    const stub = jest.fn().mockImplementation(() => Promise.resolve(value))
    wrapper.vm.$router.push = stub
    fieldUsername.setValue('sunny')
    fieldEmailAddress.setValue('sunny@taskagile.com')
    fieldPassword.setValue('JestRocks!')
    await wrapper.vm.submitForm()
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
  })

  it('should fail it is not a new user', async () => {
    fieldUsername.setValue('ted')
    fieldEmailAddress.setValue('ted@taskagile.com')
    fieldPassword.setValue('JestRocks!')
    expect(wrapper.find('.failed').isVisible()).toBe(false)
    await wrapper.vm.submitForm()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.failed').isVisible()).toBe(true)
  })
})
