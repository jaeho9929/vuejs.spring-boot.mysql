import { mount } from '@vue/test-utils'
import RegisterPage from '@/views/RegisterPage'

describe('RegisterPage.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(RegisterPage)
    expect(wrapper.find('.logo').attributes('src'))
    .toEqual('/static/images/logo.png')
    expect(wrapper.find('.tagline').text())
    .toEqual('Open source task management tool')
    expect(wrapper.find('#username').text())
    .toEqual('')
    expect(wrapper.find('#emailAddress').text())
    .toEqual('')
    expect(wrapper.find('#password').text())
    .toEqual('')
    expect(wrapper.find('button[type="submit"]').text())
    .toEqual('Create account')
  })
})
