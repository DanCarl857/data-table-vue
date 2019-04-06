import { shallowMount } from '@vue/test-utils';
import App from '../src/App';

describe("Initial tests", () => {
    let cmp, vm;

    beforeEach(() => {
        cmp = shallowMount(App, {
            // Create a shallow instance of the component
          });
      });

    it("has the expected html structure", () => {
        expect(vm.$el).toMatchSnapshot();
    });
})