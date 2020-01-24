import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(App, {
      stubs: ["router-view"]
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
