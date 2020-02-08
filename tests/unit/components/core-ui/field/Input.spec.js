import { mount, shallowMount } from "@vue/test-utils";
import Input from "@/components/core-ui/field/Input.vue";

const id = "password";
const type = "password";
const label = "Password";
const value = "123456";
const errors = ["Please enter a password"];
const action = {
  name: "Forgot Password?",
  onClick: jest.fn()
};

describe("Input.vue", () => {
  it("TEST CASE 1: Render HTML", () => {
    const wrapper = shallowMount(Input, {
      propsData: { id, type, label, value, errors, action }
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("TEST CASE 2: Is a Vue instance", () => {
    const wrapper = mount(Input, {
      propsData: { id, type, label, value, errors, action }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  // it('change value of input', () => {
  //     const value = '111111';
  //     const mask = 'phone';
  //     const filter = 'formatPhone';
  //     const wrapper = mount(CustomInput, {
  //         localVue,
  //         propsData: { value, mask, filter }
  //     });
  //     const inputElm = wrapper.find('input');
  //     inputElm.setValue('123444444');
  //     inputElm.trigger('change');
  // })
  // it('change value of input, any filter', () => {
  //     const value = '';
  //     const mask = 'phone';
  //     const filter = 'capFirstLetter';
  //     const wrapper = mount(CustomInput, {
  //         localVue,
  //         propsData: { value, mask, filter }
  //     });
  //     const inputElm = wrapper.find('input');
  //     inputElm.setValue('123444444');
  //     inputElm.trigger('change');
  // })
});
