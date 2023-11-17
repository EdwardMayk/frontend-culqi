import { mount } from "@vue/test-utils";
import ViewToken from "@/components/ViewToken.vue";

describe("ViewTokenComponent", () => {
  it("renders correctly", async () => {
    const wrapper = mount(ViewToken);

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find("#cardHolderName").exists()).toBe(true);
  });

  it("submits the form and shows the modal", async () => {
    const wrapper = mount(ViewToken);

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find("#cardHolderName").exists()).toBe(true);

    await wrapper.find("#cardHolderName").setValue("Test User");
    await wrapper.find("#cardNumber").setValue("4111111111111111");
    await wrapper.find("#expirationDate").setValue("12/22");
    await wrapper.find("#securityCode").setValue("123");

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.find("#modal").exists()).toBe(true);
  });
});
