import { shallowMount } from '@vue/test-utils'
import LoginPage from '@/views/LoginPage'

describe('LoginPage.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(LoginPage)
    expect(wrapper.find('h1').text())
    .toEqual('TaskAgile')
  })
})
