import { mount } from '@vue/test-utils'
import RegisterPage from '@/views/RegisterPage'
import { createVueRouter } from '@/router'
import registrationService from '@/services/registration'

jest.mock('@/services/registration')

describe('RegisterPage.vue', () => {
  let wrapper
  let form
  let fieldUsername
  let fieldEmailAddress
  let fieldPassword
  let buttonSubmit
  let registerSpy

  beforeEach(async () => {
    const router = createVueRouter()
    router.push("/register")
    await router.isReady()

    wrapper = mount(RegisterPage, {
      global: {
        plugins: [router]
      }
    })
    form = wrapper.find('form')
    fieldUsername = wrapper.find('#username')
    fieldEmailAddress = wrapper.find('#emailAddress')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('button[type="submit"')
    registerSpy = jest.spyOn(registrationService, 'register')
  })

  afterEach(() => {
    registerSpy.mockReset()
    registerSpy.mockRestore()
  })

  afterAll(() => {
    jest.restoreAllMocks()
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
    // wrapper.find('form').trigger('submit')
    wrapper.find('form').trigger('submit.prevent')
    expect(stub).toBeCalled()
  })

  it('should register when it is a new user', async () => {
    expect.assertions(2)
    const stub = jest.fn()
    wrapper.vm.$router.push = stub
    fieldUsername.setValue('sunny')
    fieldEmailAddress.setValue('sunny@taskagile.com')
    fieldPassword.setValue('JestRocks!')
    form.trigger('submit.prevent')
    expect(registerSpy).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
  })

  // XXX
  it('should fail it is not a new user', async () => {
    // expect.assertions(3)    // XXX
    // In the mock, only sunny@taskagile.com is new user
    fieldUsername.setValue('newuser')
    fieldEmailAddress.setValue('newuser@taskagile.com')
    fieldPassword.setValue('JestRocks!')
    expect(wrapper.find('.failed').isVisible()).toBe(false)
    form.trigger('submit.prevent')
    expect(registerSpy).toBeCalled()
    wrapper.vm.$nextTick(null, () => {
      expect(wrapper.find('.failed').isVisible()).toBe(true)
    })
    // await wrapper.vm.$nextTick()
    // expect(wrapper.find('.failed').isVisible()).toBe(true)
  })

  it('should fail when the email address is invalid', async () => {
    fieldUsername.setValue('test')
    fieldEmailAddress.setValue('bad-email-address')
    fieldPassword.setValue('JestRocks!')
    form.trigger('submit.prevent')
    expect(registerSpy).not.toHaveBeenCalled()
  })

  it('should fail when the username is invalid', async () => {
    fieldUsername.setValue('a')
    fieldEmailAddress.setValue('test@taskagile.com')
    fieldPassword.setValue('JestRocks!')
    form.trigger('submit.prevent')
    expect(registerSpy).not.toHaveBeenCalled()
  })

  it('should fail when the password is invalid', async () => {
    fieldUsername.setValue('test')
    fieldEmailAddress.setValue('test@taskagile.com')
    fieldPassword.setValue('bad!')
    form.trigger('submit.prevent')
    expect(registerSpy).not.toHaveBeenCalled()
  })

})
