import { mount } from "@vue/test-utils";
import DetailsCard from "@/components/DetailsCard.vue";

describe("MyComponent", () => {
  it("renders correctly", async () => {
    const wrapper = mount(DetailsCard);

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find("#token").exists()).toBe(true);
  });

  it("submits the form and shows card data", async () => {
    const wrapper = mount(DetailsCard);

    await wrapper.setData({
      token: "mockedToken",
    });

    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.find("#cardHolderName").exists()).toBe(true);
    expect(wrapper.find("#cardNumber").exists()).toBe(true);
    expect(wrapper.find("#expirationDate").exists()).toBe(true);
    expect(wrapper.find("#securityCode").exists()).toBe(true);
  });

  it("handles errors and shows error modal", async () => {
    const wrapper = mount(DetailsCard);

    await wrapper.setData({
      token: "mockedToken",
    });

    jest.spyOn(wrapper.vm, "fetchCardData").mockImplementation(() => {
      throw new Error("Error fetching card data");
    });

    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.find("#modal").exists()).toBe(true);
  });
});
