An example of adding dynamic `<meta>` tags to a Vue 3 application with a standard Vue/Vite application using Vue Router.

The objective is to include dynamic `<meta>` tags based on the route path, so that tags such as `description` and `og:title` are populated with values specific to the current page. These need to be included in the HTML served up by the server, as Twitter/Facebook/etc. don't run the client-side JavaScript when attempting to load these values.

For more details about the underlying problem see <https://vue-land.github.io/faq/dynamic-meta-tags.html>.

This repository contains three branches:

- [base](https://github.com/skirtles-code/vue-3-meta-tags-example/) - A branch that contains the base application, without the addition of dynamic `<meta>` tags.
- [runtime](https://github.com/skirtles-code/vue-3-meta-tags-example/tree/runtime) - A branch that uses an Express server to populate the `<meta>` tags at runtime.
- [build](https://github.com/skirtles-code/vue-3-meta-tags-example/tree/build) - A branch that creates multiple copies of `index.html` as part of the build, each with its own `<meta>` tags.

The approaches shown in the `runtime` and `build` branches are independent, illustrating two different ways to solve the same problem.

---

You are currently viewing the **runtime** branch.

This is just an example, intended to illustrate the idea. It is not intended to be something that can be copied verbatim into a real application.

It uses Express to add the `<meta>` tags to `index.html` in production. It doesn't do full Vue SSR, it just adds the `<meta>` tags. There is no attempt to update the `<meta>` tags in the client-side code.

The `index.html` file contains a comment, `<!-- meta tags -->`, that is used as a placeholder and indicates where the Express code should inject the `<meta>` tags. The Express code needs to understand the route paths and loads relevant data to populate the tags. The duplicates some of the logic from the client-side code, which may make this approach unsuitable for applications with lots of routes.

While the implementation shown here uses Express, the same idea could be implemented using just about any backend server that allows for the dynamic generation of HTML. As Express is based on Node, it does potentially allow the server to share JavaScript code with the client, but it hasn't been implemented that way here.

To run the project locally:

```bash
pnpm install
pnpm build
pnpm start
```
