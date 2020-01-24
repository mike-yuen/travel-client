import { mount, shallowMount } from "@vue/test-utils";
import Button from "@/components/core-ui/button/Button.vue";

const type = "button";
const onClickMock = jest.fn();

describe("Input.vue", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("TEST CASE 1: Render HTML", () => {
    const wrapper = shallowMount(Button, {
      propsData: { type },
      slots: { default: "Content of the Button" }
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("TEST CASE 2: Is a Vue instance", () => {
    const wrapper = shallowMount(Button, {
      propsData: { type },
      slots: { default: "Content of the Button" }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("TEST CASE 3: onClick is emitted", async () => {
    const wrapper = mount(Button, {
      propsData: { type },
      slots: { default: "Content of the Button" }
    });
    wrapper.vm.$emit("onClick");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().onClick).toBeTruthy();
  });
  it("TEST CASE 4: onClick is worked", async () => {
    const wrapper = mount(Button, {
      propsData: { type },
      slots: { default: "Content of the Button" }
    });
    wrapper.vm.$on("onClick", onClickMock);
    await wrapper.vm.$nextTick();
    wrapper.find("button").trigger("click");
    expect(onClickMock).toHaveBeenCalled();
  });
});
