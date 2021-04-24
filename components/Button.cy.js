import { mount } from "@cypress/vue";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders the Button", () => {
    mount(Button);
  });
});
