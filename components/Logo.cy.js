import { mount } from "@cypress/vue";
import Logo from "./Logo.vue";

describe("Logo", () => {
  it("renders the Logo", () => {
    mount(Logo);
  });
});
