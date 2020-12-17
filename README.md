# Author's Notes

I'm writing this Readme to point out some things about this challenge ;)

Install dependencies with:
```bash
yarn
# or
yarn install
```

To start it:
```bash
yarn start
```

To run all unit tests:
```bash
yarn test
```

## Tooling

### CRA Template

I used [cra-template-typekit](https://github.com/rrebase/cra-template-typekit) for the CRA template, this is because it already comes with typescript preloaded and other useful tools as well.
### State Management

For state management I used `redux` with `@reduxjs/toolkit` which remeoves a bunch of boilerplate code when using redux within the app.
I was thinkin about using `mobx` but I had some undesired side-effects before using `mobx` for some reason (specially when using observable `arrays` and `objects` of `mobx`) and **consistency is key** =D

### Styling

For stylization I used the `@emotion` toolset, which comes with a bunch of easy-to-use tools.
The one I used more was `@emotion/styled` which mimics the `styled-components` API.

Using a styled component leaves the "template part" of the React Component more clean for visualization, as you can see:
```tsx
// features/controls/Controls.tsx
export const Controls: React.FC = () => {
  return (
    <Container>
      <Logo src={logoImg} />
      <CardContainer>
        <WorldSizePanel />
      </CardContainer>
      <CardContainer>
        <WorldStats />
      </CardContainer>
    </Container>
  );
};
```
So you can focus on understanding the structure of the Component and not be frightened about all the `classNames`. The name of the styled component should also give a hint of what is the meaning of that particular component.

I was eager to use `bulma` as it is very easy to use and useful, but I ended up thinking about this decision much later on the project and so I decided to stick to base CSS knowledge instead.

## Testing

For testing I used `ava` instead of `jest`, I will comment about this decision later.
There are three files containing tests:

- [`utils/islandCounter.test.ts`](./src/utils/islandCounter.test.ts) -> to test Island Counter alg found on the same dir ([`utils/islandCounter.ts`](./src/utils/islandCounter.ts))
- [`store/store.test.ts`](./src/store/store.test.ts) -> to test world.reducer dispatched actions, and find if it's working properly 
- [`features/world/WorldCanvas.test.tsx`](./src/features/world/WorldCanvas.test.ts) -> to test WorldCanvas component, and test re-render behaviours using a mocked store

At the end of the `yarn test` command, it should give out a result like this:

```bash
✔ utils › islandCounter.ts › initial island count to be 2
✔ utils › islandCounter.ts › adding a new tile on the middle should give only a single island
✔ utils › islandCounter.ts › island count should be zero after tiles within X=2 got pruned
✔ store › store.ts › should throw error when a out-of-bounds coord is provided
✔ store › store.ts › test SWITCH_TYPE action
✔ store › store.ts › test UPDATE_WORLD_PROPS action
✔ features › world › WorldCanvas.tsx › test WorldCanvas should render all items
✔ features › world › WorldCanvas.tsx › test WorldCanvas render result after worldSize is reduced
─

7 tests passed
1 known failure
```

The "1 known failure" is due to a issue mentioned above in (issues found on tests)[#Issues-found-when-writing-tests]

### Issues found when writing tests

I decided to used `ava` as a test runner instead of the default `jest`, this is because I was more used to `ava`.
Unfortunately I have problems that I only found out about them later. The problem is I was not being able to import imgs when importing modules (`jest` runner with CRA already does that). And so I got a lot of time to find out the solution.
If the webpack was already configured in the project beforehand this would be easy to solve, but CRA doesn't allow me to unless I `yarn eject`, and the time was little.
So for this I used the simple solution of:

```ts 
// assets/images.ts

let DirtTexture: any;
let WaterTexture: any;
let GrassTexture: any;

if (process?.env?.NODE_ENV === "test") {
  // This is necessary because in AVA tests it can't require imgs, so we mock them
  DirtTexture = "dirt";
  WaterTexture = "water";
  GrassTexture = "grass";
} else {
  DirtTexture = require("./dirt_texture.jpeg");
  WaterTexture = require("./water_texture.png");
  GrassTexture = require("./grass_texture.jpg");
}

const Images = { DirtTexture, WaterTexture, GrassTexture };
export default Images;
```

and then on AVA config on `package.json`, I counfigured a NODE_ENV var:

```json
// package.json
{
  "ava": {
    /// ...
    "environmentVariables": {
      "NODE_ENV": "test"
    },
  }
}
```

That allowed me to proceed!

Later I found a problem happening when I rendered `<WorldCanvas/>` [within the test file WorldCanvas.test.tsx](./src/features/world/WorldCanvas.test.tsx)
on the second test. The problem is that is was giving me duplicate `data-testid`'s for some elements, despite this not being the case on the live version of the app.
Because of this I marked the test as a failing test (Using `ava`'s `test.failing(...)`), and this should give a "Known failure" on the test results

## Things that I planned to do but I was unable do

I had a fun idea where you could control a character that would spawn in the first tile that you set to "Dirt" or "Grass". And then you could control him with the arrow keys of your keyboard.
Maybe also adding a "Star" as an objective would be nice as well.

I'm still planning to do it, just for fun, even though the challenge is over =D