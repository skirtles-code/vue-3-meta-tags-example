An example of adding dynamic `<meta>` tags to a Vue 3 application with a standard Vue/Vite application using Vue Router.

The objective is to include dynamic `<meta>` tags based on the route path, so that tags such as `description` and `og:title` are populated with values specific to the current page. These need to be included in the HTML served up by the server, as Twitter/Facebook/etc. don't run the client-side JavaScript when attempting to load these values.

For more details about the underlying problem see <https://vue-land.github.io/faq/dynamic-meta-tags.html>.

This repository contains three branches:

- [base](https://github.com/skirtles-code/vue-3-meta-tags-example/) - A branch that contains the base application, without the addition of dynamic `<meta>` tags.
- [runtime](https://github.com/skirtles-code/vue-3-meta-tags-example/tree/runtime) - A branch that uses an Express server to populate the `<meta>` tags at runtime.
- [build](https://github.com/skirtles-code/vue-3-meta-tags-example/tree/build) - A branch that creates multiple copies of `index.html` as part of the build, each with its own `<meta>` tags.

The approaches shown in the `runtime` and `build` branches are independent, illustrating two different ways to solve the same problem.

---

You are currently viewing the **base** branch.

You probably want to run one of the other two branches, as this branch does not add any dynamic `<meta>` tags.
