import { mount } from "@vue/test-utils";
import LoginComponent from "@/components/Login.vue";

describe("LoginComponent", () => {
  it("should match the snapshot", () => {
    const wrapper = mount(LoginComponent);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should update the data properties on input change", async () => {
    const wrapper = mount(LoginComponent);

    await wrapper.setData({ username: "testuser", password: "testpassword" });

    expect(wrapper.vm.username).toBe("testuser");
    expect(wrapper.vm.password).toBe("testpassword");
  });

  it("should call the login method on form submission with valid credentials", async () => {
    const wrapper = mount(LoginComponent);

    await wrapper.setData({ username: "usuario", password: "contraseña" });

    const spy = jest.spyOn(console, "log");

    await wrapper.find("form").trigger("submit.prevent");

    expect(spy).toHaveBeenCalledWith("Credenciales válidas");

    expect(localStorage.getItem("pkComercio")).toBe("123456");

    expect(window.location.href).toBe("/about");

    spy.mockRestore();
  });

  it("should display an alert with invalid credentials on form submission", async () => {
    const wrapper = mount(LoginComponent);

    await wrapper.setData({
      username: "invaliduser",
      password: "invalidpassword",
    });

    const spy = jest.spyOn(window, "alert").mockImplementation(() => {
      return;
    });

    await wrapper.find("form").trigger("submit.prevent");

    expect(spy).toHaveBeenCalledWith(
      "Credenciales incorrectas. Intenta de nuevo"
    );

    spy.mockRestore();
  });
});
