An example of adding dynamic `<meta>` tags to a Vue 3 application with a standard Vue/Vite application using Vue Router.

The objective is to include dynamic `<meta>` tags based on the route path, so that tags such as `description` and `og:title` are populated with values specific to the current page. These need to be included in the HTML served up by the server, as Twitter/Facebook/etc. don't run the client-side JavaScript when attempting to load these values.

For more details about the underlying problem see <https://vue-land.github.io/faq/dynamic-meta-tags.html>.

This repository contains three branches:

- [base](https://github.com/skirtles-code/vue-3-meta-tags-example/) - A branch that contains the base application, without the addition of dynamic `<meta>` tags.
- [runtime](https://github.com/skirtles-code/vue-3-meta-tags-example/tree/runtime) - A branch that uses an Express server to populate the `<meta>` tags at runtime.
- [build](https://github.com/skirtles-code/vue-3-meta-tags-example/tree/build) - A branch that creates multiple copies of `index.html` as part of the build, each with its own `<meta>` tags.

The approaches shown in the `runtime` and `build` branches are independent, illustrating two different ways to solve the same problem.

---

You are currently viewing the **build** branch.

This is just an example, intended to illustrate the idea. It is not intended to be something that can be copied verbatim into a real application.

It uses a Node script, located at `scripts/add-meta.mjs`, to create multiple copies of `index.html` as part of a production build. Each copy has its own set of `<meta>` tags. There is no attempt to update the `<meta>` tags in the client-side code.

The original `index.html` file contains a comment, `<!-- meta tags -->`, that is used as a placeholder and indicates where the script should inject the `<meta>` tags. The script code needs to understand the route paths and loads relevant data to populate the tags. This duplicates some of the logic from the client-side code, which may make this approach unsuitable for applications with lots of routes.

More importantly, this approach only works if all valid route paths are known at build time.

This branch is deployed to GitHub Pages at:

<https://skirtles-code.github.io/vue-3-meta-tags-example/>

Vite's `base` setting is set to `/vue-3-meta-tags-example/` via a command-line argument in `.github/workflows/pages.yml`. There's also a `404.html` generated as part of `add-meta.mjs`.

To run the project locally:

```bash
pnpm install
pnpm build
pnpm preview
```
